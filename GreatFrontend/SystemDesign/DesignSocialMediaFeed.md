# System Design: Social Media Feed (React Native / Mobile)

**Core idea:** Feed items are fetched with cursor-based pagination and cached in MMKV. FlashList virtualizes the list. Likes and comments are applied optimistically. New-post banners are pushed via SSE without a full refetch.

```mermaid
graph TD
    OPEN[App opens] -->|MMKV hit| RENDER[Render cached feed instantly]
    RENDER --> REFRESH[Background refresh — fetch since latestCursor]
    REFRESH -->|new posts| BANNER[Show "X new posts" banner]
    BANNER -->|user taps| PREPEND[Prepend new posts, scroll to top]

    SCROLL[User scrolls near bottom] --> LOAD[Fetch next page — cursor pagination]
    LOAD -->|posts + nextCursor| APPEND[Append to feed, save nextCursor]

    PULL[Pull to refresh] --> LATEST[Fetch latest since top post id]
    LATEST --> MERGE[Merge new posts at top]

    LIKE[User taps like] --> OPT[Optimistic update — toggle like in store]
    OPT --> API_LIKE[POST /posts/:id/like]
    API_LIKE -->|fail| REVERT[Revert like in store + show toast]

    SSE[SSE event: new_posts_available] --> BANNER
    SSE[SSE event: like_count_updated] --> PATCH[Patch post in store — no full refetch]
```

---

## 1. Requirements (R)

### Functional

- **Home feed:** Ranked list of posts from followed users and suggested content.
- **Infinite scroll:** Load more posts as the user scrolls down — never a full page reload.
- **Pull to refresh:** Fetch posts newer than the top of the current feed.
- **Like / Unlike:** Toggle with instant feedback; count updates in real time.
- **Post media:** Images and videos in posts — lazy loaded, never block scroll.
- **New posts banner:** Non-intrusive banner when new posts arrive while the user is reading.
- **Offline read:** Previously loaded feed is readable with no connection.
- **Comments count / share count:** Shown on each post card; updated on navigate-back.

### Non-functional

- **Feed renders instantly on open:** Serve from cache, refresh in background.
- **Smooth scroll at 60 fps:** No dropped frames on mid-range Android.
- **Images never cause jank:** Prefetch and decode off the main thread.
- **No duplicate posts:** Same post never appears twice regardless of how pages overlap.

---

## 2. Architecture (A)

| Component                   | What it does                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| **Feed Store (Zustand)**    | In-memory ordered list of post IDs + post map. Components read from here, never from MMKV |
| **MMKV Cache**              | Persists post data and cursors across restarts. Seeded into Zustand on app open           |
| **Pagination Manager**      | Tracks `nextCursor`, `latestCursor`, `hasMore`, and `isFetching` per feed                 |
| **SSE Client**              | Persistent connection for server-push events (new posts available, like counts)           |
| **Image Prefetch Queue**    | Prefetches images for the next page while user reads the current page                     |
| **Optimistic Update Layer** | Applies like/bookmark instantly; reverts on API failure                                   |
| **Impression Tracker**      | Debounced batch — reports post view events for the feed ranking algorithm                 |

---

## 3. Data Model (D)

### Post (in-memory + MMKV)

```json
{
  "id": "post_abc123",
  "authorId": "usr_456",
  "text": "Check out this view!",
  "mediaItems": [
    {
      "type": "image",
      "url": "https://cdn.example.com/posts/abc123_1.jpg",
      "width": 1080,
      "height": 1350
    }
  ],
  "likeCount": 142,
  "commentCount": 18,
  "likedByMe": false,
  "createdAt": 1714000000000
}
```

- `mediaItems` includes `width`/`height` — client computes aspect ratio before image loads, preventing layout shift.
- `likedByMe` is patched locally on optimistic update and reconciled on next fetch.

### MMKV keys

| Key                  | Value                                                      |
| -------------------- | ---------------------------------------------------------- |
| `feed_posts`         | JSON array of posts (latest ~50), sorted by feed order     |
| `feed_next_cursor`   | Opaque cursor for fetching the next (older) page           |
| `feed_latest_cursor` | Cursor/timestamp of newest post — used for pull-to-refresh |
| `feed_last_synced`   | Unix ms — used to decide if cache is stale on open         |

---

## 4. API (I)

```
GET  /feed?cursor=<nextCursor>&limit=15      → { posts[], nextCursor, latestCursor }
GET  /feed?since=<latestCursor>&limit=20     → { posts[] } — pull-to-refresh / SSE trigger
POST /posts/:id/like                         → { likeCount }
DELETE /posts/:id/like                       → { likeCount }
GET  /posts/:id/comments?cursor=&limit=20    → { comments[], nextCursor }
POST /posts/:id/comments                     → { comment }
GET  /feed/sse                               → SSE stream — events: new_posts_available, like_updated
```

**Cursor vs Offset pagination:**

|                 | Cursor                               | Offset                                     |
| --------------- | ------------------------------------ | ------------------------------------------ |
| Consistency     | Stable — new posts don't shift pages | Drifts — a new post shifts every page by 1 |
| Performance     | O(1) DB seek by indexed cursor       | O(offset) DB scan — slow at deep pages     |
| Deep pagination | Works                                | Gets slow past page 100+                   |
| Jump-to-page    | Not possible                         | Easy                                       |

Use cursor for feeds. Offset is fine only for admin tables where jumping to page 50 matters.

---

## 5. Deep Dives (O)

### Normalized Store — allIds + byId

Store posts as a map, not an array. An array means patching one post's like count recreates the whole array → every `PostCard` re-renders.

```typescript
// Store shape
type FeedStore = {
  allIds: string[];              // ordered feed sequence
  byId: Record<string, Post>;   // O(1) lookup by id
};

// Surgical patch — only the one changed post gets a new reference
patchPost: (id, patch) =>
  set((s) => ({ byId: { ...s.byId, [id]: { ...s.byId[id], ...patch } } })),
```

```tsx
// FlashList gets only IDs — list never re-renders on like count change
<FlashList
  data={allIds}
  renderItem={({ item: id }) => <PostCard postId={id} />}
/>;

// Each card subscribes to only its own slice
const post = useFeedStore((s) => s.byId[postId]); // re-renders this card only
```

**Relational extension** — comments live in their own map, not nested inside posts. Avoids cloning the entire post tree when a comment is added:

```typescript
type FeedStore = {
  allIds: string[];
  byId: Record<string, Post>;
  commentsByPostId: Record<string, Comment[]>; // separate relation
};
```

This mirrors how a relational DB separates tables — posts and comments are independent entities joined by `postId`, not embedded documents.

### FlashList — 60 fps on Mid-Range Android

Use **FlashList** (Shopify) over FlatList. It recycles views by item type — a video card view is never recycled as a text card, eliminating layout thrash.

```tsx
<FlashList
  data={postIds} // only IDs — post data read inside item via store
  estimatedItemSize={420} // tune to real average; wrong value causes scroll jumps
  keyExtractor={(id) => id}
  getItemType={(id) => {
    const post = FeedStore.get(id);
    if (post.mediaItems[0]?.type === "video") return "video";
    if (post.mediaItems.length > 0) return "image";
    return "text";
  }}
  renderItem={({ item: id }) => <PostCard postId={id} />}
  onEndReached={loadNextPage}
  onEndReachedThreshold={0.4} // start fetching when 40% from bottom
  ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
  onViewableItemsChanged={onViewableChanged} // impression tracking
  viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
/>
```

- Pass only `postId` in `data`, not the full post object — prevents the entire list re-rendering when one post's like count changes.
- Each `PostCard` subscribes to its own slice: `useFeedStore((s) => s.posts[postId])`.

### Cursor Pagination — Never Miss or Duplicate a Post

```
loadNextPage:
  if hasMore is false or already fetching → return
  fetch GET /feed?cursor=nextCursor&limit=15
  dedup: filter out posts already in store   ← guards against page overlap
  append to store, save newCursor to MMKV
  if posts returned < 15 → set hasMore = false
```

The cursor is the `id` of the last post returned — server does `WHERE id < :cursor LIMIT 15`, a single index seek regardless of scroll depth.

### Pull to Refresh — Fetch Only What's New

```
pullToRefresh:
  fetch GET /feed?since=latestCursor&limit=20
  if no posts → done
  prepend to store, update latestCursor = posts[0].id
  if posts returned = 20 → show "20+ new posts" banner instead of prepending all
```

Fetches only the delta since the current top post — not a full refetch.

### New Posts Banner via SSE

Avoid polling. Keep one SSE connection open per app session:

```
on "new_posts_available" → show banner "X new posts"   // don't auto-scroll, user may be mid-read
on "like_updated"        → patchPost(postId, likeCount) // surgical update, no refetch
on error                 → reconnect after 5s backoff
```

Tapping the banner triggers `pullToRefresh()` and scrolls to the top.

### Optimistic Like — Instant Feedback with Safe Rollback

```typescript
async function toggleLike(postId: string) {
  const post = FeedStore.get(postId);
  const wasLiked = post.likedByMe;

  // 1. Optimistic update
  FeedStore.patchPost(postId, {
    likedByMe: !wasLiked,
    likeCount: wasLiked ? post.likeCount - 1 : post.likeCount + 1,
  });

  try {
    const { likeCount } = await (wasLiked
      ? api.delete(`/posts/${postId}/like`)
      : api.post(`/posts/${postId}/like`));

    // Reconcile with server's authoritative count
    FeedStore.patchPost(postId, { likeCount });
  } catch {
    // Revert optimistic update on failure
    FeedStore.patchPost(postId, {
      likedByMe: wasLiked,
      likeCount: post.likeCount,
    });
    Toast.show("Couldn't update like. Try again.");
  }
}
```

### Image Lazy Loading + Prefetch

Never block scroll waiting for images. Use `FastImage` (react-native-fast-image) for memory-efficient caching and priority hints:

```typescript
// Inside PostCard
<FastImage
  source={{ uri: media.url, priority: FastImage.priority.normal }}
  style={{ width: "100%", aspectRatio: media.width / media.height }} // no layout shift
  resizeMode={FastImage.resizeMode.cover}
/>

// Prefetch next page's images while user reads current page
function prefetchNextPage(posts: Post[]) {
  const urls = posts.flatMap((p) => p.mediaItems.map((m) => ({ uri: m.url })));
  FastImage.preload(urls); // downloads to disk cache; renders instantly when scrolled to
}
```

Prefetch is triggered when `onEndReachedThreshold` fires — same time as the next-page API call, so images and data arrive together.

Three sources of image jank and how each is prevented:

| Source       | Problem                                                                 | Fix                                                                             |
| ------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Network      | Image file not downloaded yet                                           | `FastImage.preload` — download while user reads current page                    |
| Decode       | JPEG→bitmap conversion is CPU-heavy (~30–80ms on mid-range Android)     | FastImage (Fresco/SDWebImage) decodes on a background thread, not the UI thread |
| Layout shift | List doesn't know item height until image loads → scroll position jumps | `width`/`height` in API response → `aspectRatio` set before image arrives       |

### Impression Tracking (for Feed Ranking)

Batch impression events — never fire one network call per post view:

```
onViewableItemsChanged → push visible postIds into buffer
debounce 3s → POST /feed/impressions { postIds[], sessionId }
on AppState → background → flush immediately (avoid data loss on app switch)
```

`viewabilityConfig: { itemVisiblePercentThreshold: 50 }` — only count a post as seen when 50% is on screen.

### Stale Cache Strategy — Fast Open, Fresh Data

```
initFeed:
  load posts from MMKV → render instantly (no spinner)
  if last_synced > 5 min ago → pullToRefresh (replace feed)
  else                       → fetchLatestQuietly (only update banner count)
```

User never sees a blank screen. The 5-min TTL means a quick background switch won't trigger a disruptive full reload.

---

## 6. Real Tools to Know

| Tool                       | Best for                                     | Notes                                                               |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------- |
| **FlashList (Shopify)**    | High-performance lists in React Native       | Drop-in FlatList replacement; fixes blank cells and layout thrash   |
| **FastImage**              | Image caching and priority loading           | Memory-efficient; supports priority hints for above-the-fold images |
| **React Query / TanStack** | Server state, pagination, background refresh | `useInfiniteQuery` handles cursor pagination cleanly out of the box |
| **Zustand**                | Lightweight in-memory feed store             | Selector subscriptions prevent over-rendering on like count changes |
| **MMKV**                   | Persist feed cache across restarts           | 10× faster than AsyncStorage; synchronous reads                     |
| **Firebase / Pusher**      | SSE / real-time push alternative             | Use if you want managed infra rather than a raw SSE endpoint        |

**Feed ranking:** On the server side, feeds are typically ranked by a score combining recency + engagement rate + author affinity. The client never re-ranks — it renders server order exactly, which is why cursor pagination (sort-key based) is correct while offset pagination would break on a re-rank.
