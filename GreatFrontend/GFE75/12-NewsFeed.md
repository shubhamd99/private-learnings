# System Design: News Feed (Frontend Interview)

> Walk through this order in an interview:
> Requirements → Architecture → Data Models → APIs → Components → Optimizations → Accessibility

---

## 1. Requirements

**Core features:**

- Browse posts from friends
- Like / react to posts
- Create new posts (text + images)
- Infinite scroll (no "next page" button — content loads as you scroll down)

**Out of scope (unless asked):** comments, sharing, notifications

**Platform:** Web. Mobile responsive is a bonus.

---

## 2. Architecture

### What is the Client Store?

A client store is an in-memory data store that lives in the browser (not the server).
It holds all the data your app has fetched so far — posts, user info, etc.
Think of it like a local cache/database in the browser.
Libraries: Redux, Zustand, Relay.

### Data flow:

```
Server          — sends raw data (posts, users)
  ↓
Controller      — fetches data from server, handles API calls
  ↓
Client Store    — holds all fetched data in memory (browser-side cache)
  ↓
Feed UI         — reads from the store and renders the list of posts
  ↓
Post / Composer — individual post card OR the box where you write a new post
```

### What is the Composer?

The Composer is the text box at the top of the feed where users write and submit new posts.
Like the "What's on your mind?" box on Facebook.

### Rendering Strategy

**SSR (Server-Side Rendering):**

- The server builds the full HTML page and sends it to the browser
- The browser shows content immediately — fast first paint
- Good for SEO (search engines can read the content)

**CSR (Client-Side Rendering):**

- The browser gets a blank HTML shell, then JS fetches data and builds the page
- Slower first load but fast after that

**Hydration:**

- After SSR sends the HTML, the browser attaches JS event listeners to it
- The page goes from "looks interactive" to "actually interactive"

---

### Above the Fold vs Below the Fold

**Above the fold** = everything visible on screen without scrolling (the first ~600-800px).
**Below the fold** = content the user hasn't scrolled to yet.

```
┌──────────────────────────────────┐  ← top of screen
│  NavBar                          │  ← above the fold
│  FeedComposer ("What's on...")   │  ← above the fold
│  Post #1  (text + image)         │  ← above the fold  ← SSR this
│  Post #2  (partial)              │  ← above the fold  ← SSR this
├──────────────────────────────────┤  ← fold (screen bottom)
│  Post #3                         │  ← below the fold  ← skeleton / CSR
│  Post #4                         │  ← below the fold  ← skeleton / CSR
│  Post #5 ...                     │
│  [sentinel div]  ← triggers load │
└──────────────────────────────────┘
```

---

### Where to use SSR, CSR, and Skeletons

| Part of the page                | Strategy          | Why                                                    |
| ------------------------------- | ----------------- | ------------------------------------------------------ |
| NavBar                          | SSR               | Always visible, no data needed                         |
| FeedComposer                    | SSR (empty shell) | Appears immediately; data (user avatar) hydrated after |
| Post #1 and #2 (above the fold) | SSR               | Critical for LCP — user sees content instantly         |
| Posts below the fold            | CSR + Skeleton    | Not visible yet, fetch while user reads above          |
| Infinite scroll batches         | CSR               | Just fetch more JSON, append to DOM                    |
| Reaction picker / Emoji picker  | CSR (lazy loaded) | Heavy JS, only load on user interaction                |

**Rule of thumb:**

- SSR = anything the user sees within the first ~800px without scrolling
- CSR = anything below the fold, dynamic, or interaction-driven
- Skeleton = placeholder shown during CSR loading to prevent layout shift

---

### Skeleton Placement — When and Where

Show a skeleton (grey animated placeholder) when content is **loading but not yet available**:

```
┌──────────────────────┐
│  ░░░  ░░░░░░░░░░     │  ← user avatar + name (loading)
│  ░░░░░░░░░░░░░░░░░   │  ← post text (loading)
│  ░░░░░░░░░░░░░░░░░   │
│  ████████████████    │  ← image placeholder block
└──────────────────────┘
```

**When to show a skeleton:**

1. Initial page load — if SSR is not used (e.g., logged-in feed behind auth wall)
2. When fetching the next batch during infinite scroll (show at the bottom)
3. When navigating back to the feed and cache is stale (re-fetching)

**When NOT to show a skeleton:**

- SSR content — it's already there, no loading state needed
- Optimistic updates (like button) — update immediately, no skeleton

---

### Full Rendering Flow (Timeline)

```
0ms   → Browser receives SSR HTML
        → NavBar, Composer, Post #1, Post #2 painted immediately (LCP done)

~100ms → JS bundle loads → Hydration
        → Click handlers attached to above-the-fold posts
        → FeedComposer becomes interactive

~200ms → Browser starts CSR for below-the-fold content
        → Show skeleton cards for Post #3, #4, #5
        → Fetch /feed?cursor=... in background

~400ms → CSR data arrives → replace skeletons with real Post #3, #4, #5

[User scrolls down]
        → Intersection Observer fires when sentinel is visible
        → Show skeleton at bottom
        → Fetch next page → replace skeletons
```

**Best approach for News Feed:**
| Phase | Strategy | Why |
|---|---|---|
| First page load (above fold) | SSR | Fast first paint, LCP, SEO friendly |
| Attach click handlers | Hydration | Make the server HTML actually interactive |
| Below-fold content | CSR + Skeleton | Not visible yet, load in background |
| Infinite scroll loads | CSR | Append more posts without full re-render |
| Heavy UI (emoji, GIF picker) | CSR lazy | Only download when user needs it |

> This is Facebook's approach — SSR for speed, CSR for everything after.

---

## 3. Data Models

What data do we need to store? Keep it flat and simple:

```
Feed:    { postIds: [1, 2, 3], nextCursor: "abc123" }
           ↑ just a list of IDs, not the full post objects

Post:    { id, created_time, content, image_url, reactions }
           ↑ the actual post content

User:    { id, name, profile_photo_url }
           ↑ author info — stored separately, referenced by userId
```

**Why store Feed as just a list of IDs?**
Instead of duplicating the full post object everywhere, we store IDs and look up the actual data from the store. Cleaner, no duplication.

**Normalized Store (mention as an advanced concept):**

- "Normalized" means storing each entity once, referenced by ID — like a relational database
- Example: 10 posts all by the same user — instead of storing the user's name/photo 10 times inside each post, store the user once and have each post reference `userId: 5`
- Benefit: if the user changes their profile photo, it updates everywhere instantly
- Libraries: Redux (with normalizr), Relay

---

## 4. API Endpoints

These are the HTTP requests the frontend makes to the server:

```
GET  /feed?cursor=xyz&limit=10     — load the next batch of posts
POST /posts                        — submit a new post
POST /posts/:id/reactions          — like a post
DELETE /posts/:id/reactions        — unlike a post
GET  /posts/:id                    — load a single post (for shared links)
```

### Pagination — how do we load posts in chunks?

**Option A: Offset-based (❌ avoid for feeds)**

```
GET /feed?page=2&limit=10
SQL: SELECT * FROM posts OFFSET 20 LIMIT 10
```

Problem: You load page 1. While you're reading, 5 new posts are added at the top.
Now page 2's offset has shifted — you'll see posts from page 1 again. Duplicates.

**Option B: Cursor-based (✅ use this)**

```
GET /feed?cursor=postId_xyz&limit=10
SQL: SELECT * FROM posts WHERE id < cursor LIMIT 10
```

- Cursor = the ID (or timestamp) of the last post you fetched
- "Give me 10 posts older than this post ID"
- New posts added at the top don't affect your window at all — it's anchored to a specific post
- Downside: can't jump to page 5, must go sequentially (fine for infinite scroll)

---

## 5. Component Breakdown

Break the UI into small reusable components:

```
<App>
  └── <FeedComposer />          — the "What's on your mind?" box at the top
  └── <FeedList />              — the scrollable container that holds all posts
        └── <FeedPost />        — a single post card
              └── <PostHeader />      — user avatar, name, timestamp
              └── <PostContent />     — the text and/or image
              └── <ReactionBar />     — like button + reaction counts
```

Each component only does one thing. This makes them easy to test and reuse.

---

## 6. Feed Optimizations

### Infinite Scroll — Intersection Observer API

Instead of listening to scroll events (expensive), use the **Intersection Observer API**.

**How it works:**

- Place an invisible `<div>` (called a "sentinel") at the very bottom of the feed
- The Intersection Observer watches this div
- When the sentinel enters the user's viewport (visible on screen) → fetch the next page
- This way we pre-fetch before the user actually hits the bottom

**Why not scroll events?**
Scroll events fire hundreds of times per second — very expensive. Intersection Observer fires only when the element enters/leaves the screen.

```js
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) fetchNextPage(); // visible → load more
});
observer.observe(sentinelRef.current); // watch the bottom div
```

### Virtualized List (DOM Windowing)

**Problem:** If you scroll through 500 posts, all 500 exist in the DOM — the browser slows down and uses lots of memory.

**Solution:** Only render the posts currently visible on screen.

- Posts that scroll off screen are replaced with an empty `<div>` of the same height
- This tricks the browser into keeping the correct scroll position without actually rendering the content
- Libraries: `react-window`, `react-virtual`

### Skeleton / Shimmer Loaders

- While posts are loading, show a grey animated placeholder in the shape of a post
- Much better than a spinner — users see the layout isn't shifting, feels faster
- Reduces CLS (Cumulative Layout Shift — when content jumps around as it loads)

### Caching Feed State

- When a user clicks on a post and comes back, restore the feed from memory instantly
- Don't re-fetch everything from scratch on every navigation
- If cached data is too old (hours) → force a fresh fetch

---

## 7. Post Optimizations

### Optimistic Updates (for the Like button)

**Problem:** If you wait for the server to confirm a Like, there's a noticeable delay.

**Solution:**

1. User clicks Like → immediately update the count in the UI (don't wait)
2. Send the API request in the background
3. If it succeeds → great, nothing to change
4. If it fails → revert the UI back and show an error message

This makes the app feel instant.

### Timestamps

- **Never** format timestamps on the server (e.g. "5 mins ago")
- Each user is in a different timezone and speaks a different language
- Server sends the raw UTC timestamp: `"2024-01-15T10:30:00Z"`
- Browser formats it using the built-in `Intl.RelativeTimeFormat()` API → `"5 mins ago"`
- Set a timer to re-format periodically so `"1 min ago"` becomes `"5 mins ago"` automatically

### Images

- `<img srcset>` — serve a small image on mobile, large image on desktop (same image, different sizes)
- Use **WebP** format — 25-35% smaller than JPEG/PNG, same visual quality
- Show a blurred placeholder while the image loads on slow connections
- Pre-load images that are just below the viewport so they're ready when the user scrolls to them

### Icons

- Use **inline SVGs** instead of icon fonts or separate image files
- No extra network request, no flash of missing icons while fonts load

### Lazy Loading Heavy UI

- The reaction picker popup, emoji keyboard, GIF picker — these are large JS files
- Don't load them on page load — users may never use them
- Download their JS only when the user clicks/hovers to open them (on demand)

### Data-Driven JS Bundles

**Problem:** A feed supports 50+ post types — videos, polls, images, articles, events...
Loading the JS component for every post type upfront = massive bundle size.

**Solution:** Load the rendering code together with the data.

- When the server sends a video post, it also tells the browser: "you'll need `VideoComponent.js`"
- When it sends an image post: "you'll need `ImageComponent.js`"
- The browser only downloads what it actually needs for the posts in the current feed
- This is what Facebook's GraphQL `@match/@module` directives do

### Rich Text / Mentions / Hashtags

**Problem:** If you store post content as an HTML string like `"Hello <b>@John</b>"` — that's an XSS risk. A malicious user could inject a `<script>` tag.

**What is an AST (Abstract Syntax Tree)?**
An AST is just a structured JSON representation of content — instead of storing raw HTML text, you break the content into typed pieces (nodes). Each node says what kind of thing it is (`text`, `mention`, `hashtag`) and what its value is. No HTML tags involved — so nothing can be injected.

**Solution:** Store content as an **AST** — a JSON structure that describes the content without using raw HTML:

```json
[
  { "type": "text", "value": "Hello " },
  { "type": "mention", "userId": 123, "value": "@John" },
  { "type": "text", "value": " check this out" }
]
```

The renderer reads this JSON and builds the UI safely — no raw HTML, no XSS risk.
Libraries: **Lexical** (built by Meta), **Draft.js**

---

## 8. The Composer (Post Creation Box)

The composer is the "What's on your mind?" box where users type and submit posts.

**Never use raw `contenteditable="true"`:**

- `contenteditable` is a built-in browser attribute that makes any div editable
- But it behaves inconsistently across browsers
- Hard to manage state (where is the cursor? what's selected?)
- Security issues — hard to sanitize user input

**Use a rich text library instead:**

- **Lexical** (Meta/Facebook) or **Draft.js** — they handle all the hard parts
- Internally store the content as an AST (safe, structured)
- Handle mentions, hashtags, formatting out of the box

**Lazy load composer add-ons:**

- Emoji picker, GIF keyboard, image uploader are large JS files
- Don't load them when the page loads — load only when the user opens the composer or clicks those buttons

---

## 9. Live Updates (Real-Time)

**What is a WebSocket?**
A WebSocket is a persistent two-way connection between browser and server.
Unlike HTTP (you ask → server responds → connection closes), a WebSocket stays open.
The server can push data to the browser at any time without the browser asking.

**For the News Feed:**

- Use WebSockets to push live like counts and new comments to users currently viewing a post
- Subscribe to a "room" per post (e.g. `post_room_123`) to receive updates for that post
- Only subscribe to rooms for posts **currently visible** in the viewport — unsubscribe when they scroll away (saves memory and server connections)
- For viral posts (celebrities) with thousands of reactions per second → **throttle** the updates — don't re-render on every single reaction, batch them every 2-3 seconds

---

## 10. Error Handling

- **Feed fails to load** → show "Something went wrong. Retry?" button — don't leave a blank screen
- **Like fails** → revert the optimistic update + show an error toast notification
- **Post creation fails** → keep the draft in the composer, don't clear the text the user typed
- **User goes offline** → detect with `navigator.onLine` / `online` browser event → show a banner "You're offline" → pause fetching → resume when back online

---

## 11. Accessibility

Accessibility = making the app usable for people using screen readers, keyboard only, etc.

- All images need `alt` text describing the image content
- Like button: `aria-label="Like"` (screen reader reads "Like") + `aria-pressed={isLiked}` (tells screen reader if it's toggled on/off)
- Feed list should use `<ul>` (unordered list) with `<li>` (list item) for each post — semantically correct
  - **Why semantic HTML?** Browsers and assistive tools understand meaning from tags, not just visuals. `<ul>/<li>` tells screen readers "this is a list of N items" so they can say "List, 10 items" and let users jump between items with arrow keys — a `<div>` gives them nothing.
  - **How it helps:** Screen readers (NVDA, VoiceOver) announce list count automatically. Keyboard users can navigate post-to-post. Search engines understand grouped content. No extra JS or ARIA needed — the browser handles it for free.
- Keyboard navigable — users should be able to Tab through posts and use Enter/Space to like
- `aria-live="polite"` on the feed — tells screen readers to announce when new posts load in

---

## 12. Performance Metrics

These are the numbers you use to measure if the app is fast:

| Metric                              | What it measures                                    | Good target        |
| ----------------------------------- | --------------------------------------------------- | ------------------ |
| **LCP** (Largest Contentful Paint)  | How fast the main content appears on screen         | < 2.5 seconds      |
| **INP** (Interaction to Next Paint) | How fast the page responds when you click something | < 200ms            |
| **CLS** (Cumulative Layout Shift)   | How much the layout jumps around as things load     | < 0.1              |
| **TTI** (Time to Interactive)       | When the page is fully usable (all JS loaded)       | As low as possible |

---

## 13. JS Loading Strategy (Facebook 3-Tier)

Load only what's needed, when it's needed:

| Tier       | What loads                                         | When                                      |
| ---------- | -------------------------------------------------- | ----------------------------------------- |
| **Tier 1** | CSS + HTML skeleton                                | Immediately — show above-the-fold content |
| **Tier 2** | JS to make the visible UI interactive              | Right after first paint                   |
| **Tier 3** | Analytics, WebSockets, off-screen JS, emoji picker | After the page is fully usable            |

---

## Quick Cheat Sheet

| Question                        | Answer                                                                                                                                                                                                                                                                 |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What pagination to use?         | Cursor-based — offset causes duplicate posts when new content is added                                                                                                                                                                                                 |
| How to trigger infinite scroll? | Intersection Observer watching a sentinel div at the bottom                                                                                                                                                                                                            |
| 500 posts slow the page?        | Virtualized list — only render posts in the viewport                                                                                                                                                                                                                   |
| Like button feels laggy?        | Optimistic update — update UI immediately, revert if server fails                                                                                                                                                                                                      |
| Timestamps for all timezones?   | Server sends UTC, client formats with `Intl.RelativeTimeFormat`                                                                                                                                                                                                        |
| Store post text safely?         | AST JSON structure — not raw HTML strings (XSS risk)                                                                                                                                                                                                                   |
| Make first load fast?           | SSR for initial HTML, hydration for interactivity, CSR for scroll                                                                                                                                                                                                      |
| Live reaction counts?           | WebSockets, throttled for viral posts                                                                                                                                                                                                                                  |
| Too many JS components upfront? | Data-driven bundles — server tells client which component JS to fetch. e.g. server sends a video post → browser downloads only `VideoComponent.js`. Server sends an image post → downloads only `ImageComponent.js`. Never loads all 50+ components upfront.           |
| Composer rich text?             | Lexical or Draft.js — never raw `contenteditable`                                                                                                                                                                                                                      |
| Feed fails to load?             | Retry button — never show a blank screen                                                                                                                                                                                                                               |
| Offline user?                   | Detect with `navigator.onLine`, show banner, pause fetching                                                                                                                                                                                                            |
| Accessibility on like button?   | `aria-label="Like"` — screen readers read this aloud so blind users know what the button does. `aria-pressed={isLiked}` — tells screen readers if the button is currently toggled on (liked) or off (not liked), like a checkbox state.                                |
| What is the Client Store?       | In-memory browser-side cache holding all fetched data. Redux = general purpose state manager. Relay = Facebook's GraphQL client that also handles normalized caching, fetching, and pagination automatically — built specifically for data-heavy apps like news feeds. |
| What is the Composer?           | The text box where users write and submit new posts                                                                                                                                                                                                                    |
| What is Hydration?              | Attaching JS event listeners to server-rendered HTML                                                                                                                                                                                                                   |
