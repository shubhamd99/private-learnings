# Infinite Scroll

Minimal infinite scroll list using React Native `FlatList` and a public REST API.

## How it works

```
mount → fetchPage(1)
         ↓
         data = [...page1]
                    ↓
         user scrolls near end
                    ↓
         onEndReached → fetchPage(2)
                    ↓
         data = [...page1, ...page2]
                    ↓
         repeat until hasMore = false
```

## Key FlatList props

| Prop | Purpose |
|---|---|
| `onEndReached` | callback fired when the user nears the end of the list |
| `onEndReachedThreshold` | `0.5` = fire when 50% of off-screen content remains |
| `ListFooterComponent` | renders a spinner while loading, "No more" when done |
| `keyExtractor` | stable key per item prevents unnecessary re-renders |

## State

| Variable | Purpose |
|---|---|
| `data` | accumulated list — pages are appended, never replaced |
| `page` | tracks which page to fetch next |
| `loading` | prevents duplicate fetches while one is in-flight |
| `hasMore` | set to `false` when API returns fewer items than `PAGE_SIZE` |

## API

Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com) — no auth needed.

```
GET https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10
```

## Interview mental model

Three guards in `onEndReached`:
1. `loading` — don't double-fetch
2. `!hasMore` — stop at the last page
3. API returns `< PAGE_SIZE` items → set `hasMore = false`
