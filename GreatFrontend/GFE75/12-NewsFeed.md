# System Design: News Feed Application (Frontend)

This document is a simplified, high-yield summary of designing a News Feed frontend, optimized for quick review before system design interviews. It covers core requirements, architecture, data modeling, pagination tradeoffs, and advanced frontend optimizations.

---

## 1. Requirements & Scope

- **Core Features**: Browse friends' posts, like/react to posts, create new posts. (Comments/sharing are secondary).
- **Content Types**: Text and images.
- **UX Target**: Infinite scrolling feed.
- **Platform**: Web (mobile responsiveness is nice-to-have).

## 2. High-Level Architecture

- **Component Flow**:
  - **Server** -> **Controller** -> **Client Store** -> **Feed UI** -> **Post Component** / **Composer**.
- **Rendering Strategy (Hybrid)**:
  - Typical Single Page Apps use Client-Side Rendering (CSR), while static content uses Server-Side Rendering (SSR).
  - **Best Both Worlds (Facebook's approach)**: **SSR** for the fast initial page load (SEO friendly, fast First Paint), followed by **Hydration** to attach event listeners. Subsequent infinite scrolling uses **CSR**.

## 3. Data Model & State Management

- **Feed**: List of Post IDs, pagination metadata.
- **Post**: `id`, `created_time`, `content`, `reactions`, `image_url`.
- **User**: `id`, `name`, `profile_photo_url`.
- **Advanced concept: Normalized Store**
  - Treats the frontend store like a relational database with foreign keys (e.g., Relay, Redux).
  - **Pros**: Reduces duplicated data (e.g., downloading same user profile avatar string 10 times for 10 posts). If a user changes their name, updating the single user entity instantly updates all their posts in the UI.
  - **Cons/Verdict for Interviews**: Overkill for simple feeds where updates are rare, but highly relevant for massive apps like Facebook/Twitter.

## 4. API & Pagination (Critical Interview Topic)

Fetching posts usually dictates a deep discussion on pagination methods. **Cursor-based is heavily preferred for news feeds.**

### Option A: Offset-based Pagination

- **How it works**: Request a `page` or `offset` (e.g., give me 10 posts starting from offset 20). Backed by SQL `OFFSET X LIMIT Y`.
- **Pros**: Allows direct page jumping, easy to implement.
- **Cons**:
  1. **Inaccurate windowing (Duplicate/Missed posts)**: User fetches Page 1. While reading, 5 new posts are added. When user fetches Page 2, the offset has shifted, making them see Page 1 posts again.
  2. **Performance decay**: Poor efficiency on massive tables as database must scan `OFFSET + LIMIT` rows before discarding previous ones.

### Option B: Cursor-based Pagination (✅ The Winner)

- **How it works**: Passes an identifier of the last fetched item (e.g., `id`, timestamp) as a pointer. SQL: `WHERE id < cursor LIMIT 10`.
- **Pros**: Faster on large datasets. Impervious to newly added rows (no duplicate post bugs) since window is relative to a specific record.
- **Cons**: Cannot skip pages (must request sequentially).

## 5. System Optimizations & Deep Dives

### A. The Feed List (Infinite Scrolling & Rendering)

- **Triggering Fetches**: Instead of scroll event listeners, use the native **Intersection Observer API** to detect when a hidden bottom marker approaches the viewport, pre-fetching data _before_ the user hits the bottom.
- **Virtualized Lists (DOM Windowing)**:
  - **Problem**: Infinite scrolling rapidly inflates the DOM size, destroying browser memory and slowing React reconciliation.
  - **Solution**: Replace off-screen posts with empty `div` elements of fixed heights to preserve scroll position. (Used by Twitter/Facebook).
- **Loading UI**: Use Shimmer/Skeleton loaders instead of spinners to minimize perceived layout shift.
- **Stale Feeds & Scroll Re-mounting**: Cache feed list and scroll position locally. If the user navigates away and back, fetch from cache instantly. If data is hours old, force-refresh the feed.

### B. Feed Post Optimizations

- **Data-Driven Dependencies (GraphQL `@match/@module`)**:
  - Feeds support 50+ formats (videos, polls, images). Loading all JS components upfront balloons the JS bundle.
  - Only load rendering code _with_ the specific data response. If a post is an image, the server safely instructs the client to download `ImageComponent.js`.
- **Mentions & Hashtags Parsing Strategy**:
  - _HTML strings_ (XSS risk) and _custom syntaxes_ (brittle) are suboptimal.
  - **Solution (Draft.js/Lexical)**: Store content as an Abstract Syntax Tree (AST) JSON structure, splitting plain text and entities (`type: 'MENTION', id: 1234`).
- **Media Optimization**:
  - Deliver responsive widths via `<img srcset>`.
  - Prefer modern formats (WebP).
  - Serve image placeholders on slow connections, pre-fetch off-screen images on fast connections.
- **Tier 3 / Lazy Loading Interactions**: Heavy UI elements like Reaction Picker Popovers and Ellipsis Modal menus should only be downloaded 'On Demand' (hover/click).
- **Optimistic Updates**: Immediately add a 'Like' on the UI before the server confirms. Revert with an error notification if the network call fails.
- **International Timestamps**: Send raw timestamps from the server and format on the client via `Intl.RelativeTimeFormat()` to support multilingual users without bloating server logic. Set an interval to refresh relative text (e.g., "1 min ago" -> "5 mins ago").
- **Icons**: Use **Inlined SVGs** to avoid extra network requests and flickering font-loading text.

### C. Live Updates & Comments

- **WebSockets for Live Engagement**: Use WebSockets to push live reaction counts and comments to the client.
- **Resource Management (Performance constraints)**:
  1. Only subscribe to WebSocket rooms for posts currently _visible_ in the viewport.
  2. **Throttle/Debounce** live updates for viral posts (celebrities) to prevent client overload (DDoS-ing the browser).

### D. The Composer

- Avoid naive `contenteditable=true` elements. Use robust packages like Meta's **Lexical** or **Draft.js** for safe WYSIWYG rich text state management.
- Lazy load optional add-ons: emoji picker, GIF keyboard, and image uploader scripts.

### E. General Frontend Performance (Facebook 3-Tier JS Load)

- **Tier 1**: Basic CSS/HTML skeleton to render above-the-fold content immediately.
- **Tier 2**: JS needed for the initial interactivity of visible UI.
- **Tier 3**: JS for logging, live WebSocket subscriptions, and off-screen interactions.

---

_Perfect for scanning right before tackling a frontend system design module!_
