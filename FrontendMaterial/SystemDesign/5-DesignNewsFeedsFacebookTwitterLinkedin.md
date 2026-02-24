# Frontend System Design: News Feed (Twitter, Quora, LinkedIn)

## Requirements

- **Support different post types:** Text, image, video.
- **Design the post creator/composer:** The interface for generating new posts.
- **Optimization:** Cater to mobile devices, varied network speeds, accessibility standards, and internationalization (i18n).

## Architecture & Tech Stack

- **Framework:** React / Next.js (for Server-Side Rendering & SEO).
- **State Management:** Zustand (for global application state) + Normalization.
- **Data Fetching/Caching:** React-Query (for server state, caching, and optimistic updates).

---

## 1. News or Post Feed (Timeline)

The core challenge is efficiently fetching, caching, and rendering a never-ending list of posts.

### Pagination Strategies

- **Offset-based Pagination:** Uses `page` and `limit` to fetch rows.
  - _Cons:_ Susceptible to duplicate data if new posts are added to the top of the feed while scrolling, as the database index shifts. Not recommended for feeds.
- **Cursor-based Pagination:** Uses a unique identifier (`cursor`, like a timestamp or ID) targeting a specific record, fetching elements `before` or `after` it.
  - _Pros:_ Immune to data shifting. It is the industry standard for feeds (used by Facebook, Twitter, Slack).

### State Management & Normalization

- **Normalization:** Vital to avoid data duplication and ensure fast updates (O(1) lookups).
- Large nested JSON payloads should be flattened. Instead of nested arrays, use the `byIds` and `allIds` pattern. Doing this makes caching and updating individual entities significantly easier.

#### Example: Normalized State (`byIds` and `allIds`)

Here is how you can efficiently flatten and store heterogeneous relational data (posts, comments, users):

```javascript
const state = {
  // Posts collection
  posts: {
    byId: {
      post_1: {
        id: "post_1",
        author: "user_1",
        content: "Hello System Design!",
        comments: ["comment_1", "comment_2"],
      },
      post_2: {
        id: "post_2",
        author: "user_2",
        content: "React is awesome!",
        comments: [],
      },
    },
    allIds: ["post_1", "post_2"], // Represents the display order on the feed timeline
  },

  // Comments collection
  comments: {
    byId: {
      comment_1: { id: "comment_1", author: "user_3", text: "Great post!" },
      comment_2: {
        id: "comment_2",
        author: "user_4",
        text: "Thanks for sharing.",
      },
    },
    allIds: ["comment_1", "comment_2"],
  },

  // Users collection
  users: {
    byId: {
      user_1: { id: "user_1", name: "Alice" },
      user_2: { id: "user_2", name: "Bob" },
      user_3: { id: "user_3", name: "Charlie" },
      user_4: { id: "user_4", name: "Dave" },
    },
    allIds: ["user_1", "user_2", "user_3", "user_4"],
  },
};
```

_When a specific comment gets liked, you instantly update `state.comments.byId["comment_1"].likes` without needing to recursively traverse arrays!_

### Loading the List (Infinite Scrolling)

- **Intersection Observer API:** The modern, performant standard to detect when the user has reached the bottom of the feed. It alerts your code when a dummy "end-of-feed" element intersects with the viewport, triggering the next cursor API call.
- **Scroll Event Listener:** Older approach using mathematics on `getBoundingClientRect()` and window height. Requires heavy debouncing.

### Rendering the List

- **Server-Side Rendering (SSR):** Generates HTML boilerplate on the server. Vital for improving SEO (on individual post pages) and metrics like Time to First Byte (TTFB) and First Contentful Paint (FCP).
- **Client-Side Hydration:** HTML is loaded first, followed by JS chunks that attach event listeners (hydration) making the page interactive.
- **On-Demand JS Evaluation (Tiered Bundles):** Break JS into smaller chunks. Don't send Video Player or Lightbox logic unless the loaded timeline specifically contains a video or photo. Evaluate modules dynamically to save parsing time.

---

## 2. General Feed Optimizations

- **Virtualized Lists (Windowing):** Rendering thousands of DOM nodes crushes browser memory and reconciliation performance. Virtualization ensures only the posts (e.g., 5-10) currently visible in the user's viewport are fully rendered. Off-screen elements are replaced with empty divs matching their exact calculated heights to maintain the scrollbar's integrity.
- **Atomic CSS:** Generating single-purpose CSS classes (like Tailwind) minimizes stylesheet bloating. As app complexity grows, Atomic CSS grows logarithmically compared to traditional CSS scaling linearly.
- **Dynamic Fetch Limits:** Modify data chunk sizes based on the viewport/device (e.g., fetch 5 posts for mobile viewports vs. 10 for desktops) to cater to likely network constraints.
- **Responsive Media:** Serve modern image formats (WebP) alongside the `srcset` attribute to seamlessly deliver appropriately sized assets to different DPI screens. Use Service Workers to cache resources and allow offline viewing (PWA).

---

## 3. Post Creator / Composer

Building a rich interface to simultaneously support text, images, videos, mentions, and hashtags.

### The Text Editor

- **Rich Text Editors**: A standard `<textarea>` or `<input>` is insufficient. Instead, an element is set with the `contenteditable="true"` attribute, which provides WYSWIG functionality allowing precise text formatting, mentions, and media embedding inline.
- **Libraries used by Tech Giants**:
  - **Facebook** used to use **Draft.js** previously, but they have now moved to using **Lexical** (a modern, open-source text editor created by Meta). Lexical seamlessly handles hashtags, @ mentions (creating active links), and drag-and-drop media.
  - **Twitter** currently uses **Draft.js** for their post composer, along with a comprehensive suite of `aria-*` attributes (accessibility) to declare the interface as a reliable textbox to screen readers.
- **Security Check (XSS)**: It's vital to avoid storing the raw HTML output of these editors in the database, to prevent script injection or cross-site scripting attacks. Both Draft.js and Lexical circumvent this by storing structural data in a normalized **JSON Abstract Syntax Tree (AST)** format (e.g. denoting a block as `{ type: 'MENTION', content: 'username' }`) and securely converting it back to a UI on render.

### Optimistic Updates

Instead of waiting for a slow network to confirm a post or a "like" interaction to show physically:

1. **Instantly update the local state** (e.g., mimicking addition to the `allIds` array). The UI immediately looks successful to the user.
2. Fire the asynchronous network request to the backend.
3. If the request fails, catch the error, roll the UI back to the earlier cached snapshot, and alert the user with a dismissable toast.

### Date and Time Formatting

- Time should always be stored in raw UTC variants across network bounds.
- Use the widely supported browser native `Intl.DateTimeFormat()` configured to the user's locale setting to translate timestamps to localized strings (e.g., standardizing i18n support effectively).
