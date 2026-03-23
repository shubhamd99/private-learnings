# Front-end System Design: Video Streaming Application (Netflix/YouTube)

Designing a video streaming platform involves balancing complex media delivery with a high-performance, seamless UI. This guide covers the essential components, architecture, and optimizations required.

## 1. Requirements

### Functional Requirements
*   **Browsing/Discovery**: A homepage with recommended videos and categories.
*   **Billboard**: An autoplaying featured video at the top of the discovery page.
*   **Playback**: Dedicated watch page with a robust player.
*   **Quality Control**: Adaptive bitrate (ABR) supporting multiple resolutions.
*   **Player Controls**: Play/pause, seek/scrub, volume, playback rate, subtitles, and audio track selection.

### Non-Functional Requirements
*   **Low Latency**: Fast video startup (TTI) and minimal buffering.
*   **Smooth Experience**: Avoid stuttering on slow connections.
*   **Device Support**: Responsive design for Desktop, Tablet, and Mobile.
*   **Accessibility**: Full keyboard support and screen reader compatibility.

---

## 2. High-Level Architecture

### Rendering Strategy
| Page | Rendering Type | Logic |
| :--- | :--- | :--- |
| **Video Title/Detail** | SSR | For SEO rankings and search previews. |
| **Browse/Discover** | Hybrid (SSR + Hydration) | SSR the "above the fold" content (billboard) for immediate engagement. |
| **Watch Page** | CSR | Minimizes SSR overhead; injects metadata via `<script>` tags for fast hydration. |

### Component Hierarchy
1.  **Client Store (Zustand/Redux)**: 
    *   Caches recommendation lists to avoid refetching on "Back" navigation.
    *   Normalizes video metadata (ID, title, box-art, duration).
2.  **Discover Page**:
    *   `BillboardPlayer`: Optimized autoplay component.
    *   `VideoRow`: Horizontal list with lazy-loaded thumbnails.
3.  **Watch Page**:
    *   `CustomPlayer`: Top-level controller managing the `<video>` element and UI sync.
    *   `ControlBar`: Seekbar, volume, and quality settings.

---

## 3. Video Playback Deep Dive

### Basic vs. Advanced Playback
*   **Basic (`<video src="file.mp4">`)**: Progressive download. Simple but lacks adaptive quality; requires downloading the whole file for seeking.
*   **Advanced (Media Source API)**: Uses segmented files (chunks). The browser fetches small segments (e.g., 5-10s) and appends them to a `SourceBuffer`.

### Streaming Protocols
*   **DASH (Dynamic Adaptive Streaming over HTTP)**: XML-based (`.mpd`), industry standard, highly compatible.
*   **HLS (HTTP Live Streaming)**: M3U8-based (`.m3u8`), developed by Apple. Required for iOS/Safari.
*   **Manifest Files**: Act as a roadmap, listing segment URLs for various quality levels (bitrates).

### Adaptive Bitrate (ABR) Logic
The player monitors:
1.  **Network Bandwidth**: Throughput of recent segment downloads.
2.  **Buffer Health**: How many seconds of video are currently buffered.
3.  **Device Performance**: Dropped frames or CPU load.
*   *Algorithm*: Automatically switches to a lower quality manifest if bandwidth drops to prevent stalling.

---

## 4. State Management (The Reducer Pattern)

To keep the custom UI in sync with the native `<video>` element, use a **unidirectional flow** (Flux/Redux):

```javascript
// Example Player State
{
    status: 'playing', // loading, paused, ended
    currentTime: 120,
    duration: 3600,
    buffered: [{start: 0, end: 300}],
    quality: '1080p',
    subtitle: 'English',
    volume: 0.8
}
```
**Why?** Native media keys (keyboard play/pause) or browser controls can affect state external to React. A central store ensures the UI always reflects reality.

---

## 5. Performance Optimizations

### Video Startup Time
*   **Separation of Lifecycles**: Initialize the video engine *before* the UI components are fully mounted.
*   **Prefetching**: Fetch the manifest file and first 3 segments as soon as a user hovers over a thumbnail.
*   **Pre-warming**: For the billboard, use `<link rel="preload">` for the video poster image and manifest.

### Buffering & Network
*   **CDN Usage**: Serve segments from edge locations (S3/Cloudfront) to minimize latency.
*   **Audio/Video Separation**: Stream audio and video as separate tracks. This allows language switching without re-downloading the video stream.
*   **Lazy Loading**: Only load thumbnails and video metadata for rows visible in the viewport.

### Memory Management
*   **Buffer Pruning**: Flush segments far behind the playhead from memory to avoid browser crashes on long-lived pages.
*   **Background Tabs**: Pause video/audio or downgrade bitrate if the tab is not in focus (YouTube does this).

---

## 6. Accessibility (a11y) & UX

### Subtitles & Closed Captions
*   **Format**: Use **WebVTT** (`.vtt`) via the native `<track>` element.
*   **Styling**: Support font-size and color customization for better readability.
*   **Inclusive CC**: Include sound cues (e.g., `[Dramatic Music]`) for deaf/hard-of-hearing users.

### Interactive UX
*   **Scrubbing**: Display thumbnail sprites when hovering over the seekbar for precise navigation.
*   **Keyboard Shortcuts**:
    *   `Space`: Play/Pause
    *   `Left/Right`: Seek +/- 5s
    *   `F`: Toggle Fullscreen
    *   `M`: Mute

### Internationalization (i18n)
*   **Localized Metadata**: Titles and descriptions fetched based on user locale.
*   **Dubbing Support**: Ability to switch audio tracks dynamically via manifest representations.

---

## 7. Bonus: Seekbar Thumbnails
*   **YouTube Approach**: A single large sprite sheet image containing tiny frames. The UI shifts the `background-position` based on the seek time.
*   **Netflix Approach**: Includes low-res frame metadata directly in the streaming data.

---
*Note: This design leverages React + Zustand for modern performance, focusing on modularity and high-quality user engagement.*
