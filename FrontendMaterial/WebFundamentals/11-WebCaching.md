# Web Caching & Offline Strategies

Web caching is the process of storing copies of web resources (HTML, CSS, JS, images) closer to the end-user to reduce latency, save bandwidth, and improve performance.

---

## 1. Types of Caching

- **Browser Caching**: Resources stored locally on the user's device.
- **Proxy Caching**: Intermediary servers (Forward/Reverse Proxies) that store content for multiple users.
- **Server-Side Caching**: Storing content on the origin server or via **CDNs** (geo-distributed servers).

## 2. Key HTTP Headers & Concepts

- **Cache-Control**: The primary header to define caching policies.
  - `public`: Cacheable by any cache (browser, CDN, etc.).
  - `private`: Intended for a single user (browser only).
  - `max-age`: How long (in seconds) the resource is fresh.
  - `no-cache`: Must revalidate with the server before using the cached copy.
  - `no-store`: Do not cache at all.
- **ETag (Entity Tag)**: A unique identifier for a version of a resource. Used for validation.
- **Last-Modified**: Timestamp of the last change.
- **Expires**: Absolute date/time when a resource becomes stale.
- **Vary**: Tells the cache which request headers (e.g., `Accept-Encoding`) to consider when serving cached content.

---

## 3. Caching in Unreliable Networks

In networks with high latency, low bandwidth, or intermittent connectivity, caching provides:

- **Improved Load Times**: Avoids expensive network round-trips.
- **Reduced Bandwidth**: Saves data costs for users in metered regions.
- **Offline Functionality**: Enables apps to work without an internet connection (via Service Workers).

---

## 4. Service Worker Caching Strategies

Service workers allow for programmatic control over the cache. Common strategies include:

### A. Cache-First (Offline-First)

- **Flow**: Check Cache -> If found, return -> Else, fetch from Network & cache it.
- **Use Case**: Static assets (images, fonts, styles) that rarely change.

### B. Network-First (Online-First)

- **Flow**: Try Network -> If successful, return & update Cache -> If fails, Fallback to Cache.
- **Use Case**: Frequently updated content (news, social feeds) where freshness is critical.

### C. Stale-While-Revalidate

- **Flow**: Return Cache immediately -> Fetch from Network in background -> Update Cache for next time.
- **Use Case**: Content that should be fast but needs periodic updates (blog posts, avatars).

### D. Cache Falling Back to Network

- **Flow**: Check Cache -> If missing, fetch from Network.
- **Difference from Cache-First**: Usually doesn't update the cache automatically during the fetch unless configured.

---

## 5. Implementation & Best Practices

- **Versioning**: Use hashed filenames (e.g., `style.a1b2c3.css`) to "bust" the cache when updates occur.
- **Cache invalidation**: Use `purge` requests for CDNs or update Service Worker versions to clear old caches.
- **CDNs**: Use Edge servers to serve content geographically closer to users.
- **Workbox**: Use Google's Workbox library to simplify Service Worker logic.

## 6. Troubleshooting

- **Cache Misses**: Check `Cache-Control` headers and ensure `Vary` headers aren't causing unnecessary fragmentation.
- **Stale Content**: Ensure proper versioning or `max-age` settings.
- **DevTools**: Use the **Network** tab (to check Hit/Miss status) and **Application** tab (to inspect Cache Storage).

---

## 7. Case Study Summary

- **Mobile-First App**: Used **Cache-First** for assets and **Background Sync** to allow users to post updates while offline.
- **News Website**: Used **Network-First** for articles to ensure breaking news is always live, with cache as a fallback.
- **E-Commerce**: Used **Stale-While-Revalidate** for product listings to balance speed and inventory accuracy.
