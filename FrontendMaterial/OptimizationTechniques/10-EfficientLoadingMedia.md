# Efficient Loading of Media

Optimizing media files (images, videos, GIFs, SVGs) is crucial for delivering smooth user experiences, improving Core Web Vitals (LCP, CLS, FID), reducing bandwidth usage, and boosting SEO rankings.

## 1. Images

Images often take up the most bandwidth. Optimizing them involves choosing the right format, sizing, and loading strategy.

### Formats

| Format   | Best Use Case        | Pros                                                 | Cons                             |
| :------- | :------------------- | :--------------------------------------------------- | :------------------------------- |
| **JPEG** | Photos               | Good compression, widely supported                   | Lossy, no transparency           |
| **PNG**  | Icons, Logos         | Lossless, transparency                               | Larger file sizes                |
| **WebP** | Modern Web Apps      | Excellent compression (lossy/lossless), transparency | Older browser support (rare now) |
| **AVIF** | Next-Gen Performance | Best compression                                     | Growing support                  |
| **SVG**  | Icons, Illustrations | Infinite scaling, lightweight                        | Complex images can be heavy      |

### Optimization Techniques

- **Compression Tools**:
  - **TinyPNG**: JPEG/PNG compression.
  - **Squoosh**: Web-based WebP/AVIF generation.
  - **ImageOptim**: Batch compression (Mac).
- **Responsive Images**:
  - Use `srcset` for different screen resolutions.
  - Use `<picture>` for format switching (e.g., serving AVIF with JPEG fallback).
- **Lazy Loading**: Add `loading="lazy"` to defer off-screen images.
- **CDNs**: Use Image CDNs like **Cloudinary**, **Imgix**, or **Cloudflare Images** for on-the-fly optimization.
- **Placeholders**: Use **LQIP** (Low-Quality Image Placeholders) or **Blurhash** to prevent layout shifts.

## 2. Videos

Videos are heavy and can block rendering. Choice of hosting and format is key.

### Hosting Strategy

- **Third-Party (YouTube/Vimeo)**: Best for long content. Offloads bandwidth and handles adaptive streaming.
- **Self-Hosted**: Use for short, looping background videos. Requires manual optimization.

### Formats

- **MP4 (H.264)**: Widely supported fallback.
- **WebM**: Better compression for Chrome/Firefox.
- **AV1**: Best efficiency, future-proof.

### Optimization Techniques

- **Adaptive Streaming**: Use **HLS** or **DASH** to serve quality based on network speed.
- **Lazy Loading**: Use `preload="none"` or `IntersectionObserver` to load video only when visible.
- **Poster Images**: Always add `poster="thumbnail.jpg"` to improve perceived load speed.
- **Muted Autoplay**: For background videos, use `<video autoplay muted loop playsinline>`.

## 3. GIFs vs. Efficient Animations

GIFs are inefficient (large size, no compression). Avoid them when possible.

### Better Alternatives

- **Animated WebP / APNG**: Significantly smaller than GIFs with better quality.
- **CSS Animations**: Lightweight and GPU-accelerated for simple movements.
- **JavaScript Libraries**:
  - **GSAP (GreenSock)**: High-performance complex animations.
  - **Anime.js**: Lightweight JS animation library.
- **Lottie (JSON)**:
  - Uses **BodyMovin** (After Effects plugin) to export animations as JSON.
  - Rendered via `lottie-web`.
  - Vector-based, tiny file size, infinite scaling.

## 4. Background Media

Backgrounds can cause reflows and high memory usage if not handled well.

- **CSS Optimization**:
  - `background-size: cover` and `background-position: center`.
  - Avoid `background-attachment: fixed` on mobile (causes repaints).
  - Use `image-set()` to serve different resolutions based on Device Pixel Ratio (DPR).
- **Lazy Backgrounds**: Use JS to add a class (e.g., `.loaded`) that applies the background image only when needed.
- **Video Placeholders**: Show a static image first, then swap in the video when loaded.
- **Performance Hint**: Use `will-change: transform, opacity` sparingly to hint browser about upcoming animations.

## 5. Caching & CDNs

Network performance is just as important as file size.

- **CDNs**: Distribute content globally (e.g., **Cloudflare**, **Fastly**, **Akamai**) to reduce latency.
- **Cache Headers**:
  - `Cache-Control: max-age=31536000, immutable` for static assets.
  - `ETag`: Validates if a file has changed.
- **Service Workers**:
  - Cache essential media for offline access (PWA).
  - Serve from cache first to boost load speeds on repeat visits.

## 6. PWA Optimizations

- **Preload**: `<link rel="preload">` for critical above-the-fold media.
- **Background Sync**: Upload large media when the user is back online.
