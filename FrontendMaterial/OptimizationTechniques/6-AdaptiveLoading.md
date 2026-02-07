# Adaptive Loading

Adaptive Loading is a pattern for delivering web experiences that cater to a user's specific constraints, such as network speed and device capabilities. Instead of a "one-size-fits-all" approach, adaptive loading ensures that users on low-end devices or slow networks receive a usable experience while those on high-end devices get an enhanced experience.

## Why Adaptive Loading?

- **Device & Network Diversity**: Users access the web from a wide range of devices (high-end vs low-end) and network conditions (4G vs slow 2G).
- **Performance**: Improving performance for users in developing countries or with limited resources.
- **User Experience**: Prevents the application from becoming unusable on slow connections by downgrading non-essential features (e.g., video quality).

## Core Strategies

Key techniques for implementing adaptive loading include:

1.  **Media Optimization**: Serve low-quality images/videos on slower networks.
2.  **Computational Load**: Avoid heavy client-side computations and animations on low-end devices.
3.  **Lazy Loading**: Load scripts and resources only when needed or upon user interaction.
4.  **Data Saver**: Respect user's data-saver preferences (e.g., serve AMP pages).
5.  **Predictive Preloading**: Preload resources based on likely user navigation.
6.  **Third-Party Scripts**: Block non-essential third-party scripts on lower-end devices.

## Implementing in React

Google provides a suite of hooks and utilities to facilitate adaptive loading in React applications. These hooks typically leverage browser APIs like `navigator.connection`.

### Key Hooks

- `useNetworkStatus()`: Adapts based on effective network type (4g, 3g, 2g, slow-2g).
- `useSaveData()`: Adapts based on the user's Data Saver preferences.
- `useHardwareConcurrency()`: Adapts based on available CPU cores.
- `useMemoryStatus()`: Adapts based on device memory (RAM).

> **Note**: These features rely on browser APIs primarily supported in Chromium-based browsers (Chrome, Edge).

### Examples

#### 1. Conditional Rendering based on Network Status

Using `useNetworkStatus` to serve different media qualities.

```jsx
import React from "react";
import { useNetworkStatus } from "react-adaptive-hooks/network";

const AdaptiveComponent = () => {
  const { effectiveConnectionType } = useNetworkStatus();

  let media;
  switch (effectiveConnectionType) {
    case "slow-2g":
      media = <img src="low-res.jpg" alt="low resolution" />;
      break;
    case "2g":
      media = <img src="medium-res.jpg" alt="medium resolution" />;
      break;
    case "3g":
      media = <img src="high-res.jpg" alt="high resolution" />;
      break;
    case "4g":
    default:
      media = <video muted controls src="video.mp4" />;
      break;
  }

  return <div>{media}</div>;
};

export default AdaptiveComponent;
```

#### 2. Code Splitting & Component Loading

Combine adaptive hooks with `React.lazy` and `Suspense` to load lighter components for slower networks.

```jsx
import React, { Suspense, lazy } from "react";
import { useNetworkStatus } from "react-adaptive-hooks/network";

// Lazy load components
const Full = lazy(() => import(/* webpackChunkName: "full" */ "./Full.js"));
const AMP = lazy(() => import(/* webpackChunkName: "light" */ "./AMP.js"));

const AdaptiveComponent = () => {
  const { effectiveConnectionType } = useNetworkStatus();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Serve AMP version for non-4G networks */}
        {effectiveConnectionType === "4g" ? <Full /> : <AMP />}
      </Suspense>
    </div>
  );
};

export default AdaptiveComponent;
```

#### 3. Conditional Imports

Dynamically importing modules based on network connection type to reduce bundle size for slower connections.

```jsx
import React, { Suspense } from "react";

const AdaptiveComponent = React.lazy(() => {
  const effectiveType = navigator.connection
    ? navigator.connection.effectiveType
    : null;

  switch (effectiveType) {
    case "3g":
      return import(/* webpackChunkName: "light" */ "./AMP.js");
    case "4g":
    default:
      return import(/* webpackChunkName: "full" */ "./Full.js");
  }
});

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <AdaptiveComponent />
      </Suspense>
    </div>
  );
};

export default App;
```

## Real-World Examples

- **Twitter**: Provides a data-saver option that serves AMP pages and optimizing resources.
- **eBay**: Disables image zooming on devices with slower network connections.
- **Tinder**: Serves a single image instead of a carousel on slower networks (Tinder Lite).

## Resources

- [GoogleChromeLabs/react-adaptive-hooks](https://github.com/GoogleChromeLabs/react-adaptive-hooks)
