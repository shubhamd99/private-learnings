# Carousel

A simple React Native carousel built with `FlatList`, horizontal paging, pagination dots, and optional autoplay.

<p>
  <img src="preview/01.png" width="300" alt="Carousel preview" />
</p>

## Features

- Uses `FlatList` with `horizontal` and `pagingEnabled` for native swipe behavior.
- Tracks the visible slide with `onMomentumScrollEnd`.
- Supports autoplay with configurable `interval`.
- Uses `scrollToOffset` for programmatic slide changes.
- Renders lightweight pagination dots based on the active index.
- Keeps slide data separate in `data/slides.js`.

## Component Structure

```txt
App.js
  └── Carousel
        ├── FlatList
        │     └── CarouselItem
        └── PaginationDots
```

## Usage

```jsx
import Carousel from "./components/Carousel";
import { slides } from "./data/slides";

export default function App() {
  return <Carousel data={slides} autoPlay interval={2000} />;
}
```

## Props

| Prop       | Type      | Default | Description                                      |
| ---------- | --------- | ------- | ------------------------------------------------ |
| `data`     | `Array`   | -       | Slides to render. Each item should have an `id`. |
| `autoPlay` | `boolean` | `true`  | Enables automatic slide movement.                |
| `interval` | `number`  | `2000`  | Delay between autoplay transitions in ms.        |

## How It Works

```txt
User swipes OR autoplay timer fires
        |
        v
FlatList moves to the next page
        |
        v
contentOffset.x / screenWidth gives current index
        |
        v
activeIndex updates
        |
        v
PaginationDots highlights the active dot
```

## Machine Coding Cheat Sheet

### 1. Create fixed-width pages

Each carousel item should match the screen width so `pagingEnabled` snaps one full item at a time.

```jsx
const { width } = Dimensions.get("window");

<View style={{ width }}>
  <Text>{item.title}</Text>
</View>;
```

### 2. Use FlatList for swipe + performance

```jsx
<FlatList
  data={data}
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => <CarouselItem item={item} />}
  keyExtractor={(item) => item.id}
/>
```

### 3. Track active index after scroll ends

Use `onMomentumScrollEnd` instead of `onScroll` when you only need the final snapped page.

```jsx
function handleScroll(event) {
  const index = Math.round(event.nativeEvent.contentOffset.x / width);
  setActiveIndex(index);
}
```

### 4. Move slides programmatically

Keep a list ref and scroll by `index * width`.

```jsx
const listRef = useRef(null);

function goToIndex(index) {
  listRef.current?.scrollToOffset({
    offset: index * width,
    animated: true,
  });

  setActiveIndex(index);
}
```

### 5. Add autoplay carefully

Clear the timer on cleanup and stop autoplay when there is only one slide.

```jsx
useEffect(() => {
  if (!autoPlay || data.length <= 1) return;

  const timer = setInterval(() => {
    const nextIndex = activeIndex === data.length - 1 ? 0 : activeIndex + 1;
    goToIndex(nextIndex);
  }, interval);

  return () => clearInterval(timer);
}, [activeIndex, autoPlay, data.length, interval]);
```

### 6. Render pagination dots

```jsx
{
  Array.from({ length: total }).map((_, index) => (
    <View
      key={index}
      style={[styles.dot, activeIndex === index && styles.activeDot]}
    />
  ));
}
```

## Common Interview Follow-ups

| Follow-up              | What to mention                                               |
| ---------------------- | ------------------------------------------------------------- |
| Infinite carousel      | Duplicate boundary items or reset offset after reaching ends. |
| Pause on user swipe    | Track drag events and restart autoplay after interaction.     |
| Dynamic item width     | Pass `itemWidth` as a prop and use it in offset calculations. |
| Images instead of text | Replace the colored card with `ImageBackground` or `Image`.   |
| Better animations      | Use `Animated` or Reanimated for dot scaling and transforms.  |
| Orientation changes    | Listen for dimension changes and recalculate offsets.         |

## Edge Cases

- Empty `data`: render nothing or an empty state.
- Single slide: disable autoplay and optionally hide dots.
- Missing unique `id`: use a stable key to avoid list rerender issues.
- Fast swipes: derive the index from `contentOffset.x` and clamp it within bounds.
- Timer leaks: always clear intervals in `useEffect` cleanup.
