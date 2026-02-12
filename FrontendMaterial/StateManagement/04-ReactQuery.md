# React Query (TanStack Query)

React Query is a powerful data synchronization library for React and Next.js designed to simplify fetching, caching, and updating server state. While not a global state management library like Redux or Zustand, it handles the complexities of network-related state efficiently.

---

## 🚀 Key Features

- **Declarative Data Fetching:** Simplifies code using hooks like `useQuery` and `useMutation`.
- **Automatic Caching:** Results are stored in an internal cache; subsequent requests serve cached data first (Stale-While-Revalidate).
- **Background Synchronization:** Automatically refetches data when the window is focused, the network reconnects, or at specified intervals.
- **Pagination & Infinite Scrolling:** Built-in support for managing complex list loading patterns.
- **Optimistic Updates:** Instantly updates the UI before the server responds, rolling back on failure for a snappier experience.
- **Query Invalidation:** Automatically marks data as "stale" after mutations to trigger background updates.

---

## 🛠️ Setup

### Installation

```bash
npm install @tanstack/react-query@latest
```

### Configuration

Wrap your application in the `QueryClientProvider` at the entry point.

```javascript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourAppComponent />
    </QueryClientProvider>
  );
}
```

---

## 🔍 Data Fetching: `useQuery`

To fetch data, you need a unique **queryKey** (cache identifier) and a **queryFn** (the function that returns a promise).

### Basic Implementation

```javascript
import { useQuery } from "@tanstack/react-query";

const fetchTodo = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const TodoComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todo"],
    queryFn: fetchTodo,
    staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
  });

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
};
```

---

## ✍️ Mutations: `useMutation`

Used for creating, updating, or deleting data. Mutations typically involve **Query Invalidation** to ensure the UI stays in sync with the server.

```javascript
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo) =>
      fetch("/api/todos", { method: "POST", body: JSON.stringify(newTodo) }),
    onSuccess: () => {
      // Invalidate the 'todos' query to trigger a background refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
```

---

## ✨ Optimistic Updates

Optimistic updates allow the UI to reflect changes immediately, assuming the server request will succeed.

```javascript
useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ["todos"] }); // Stop outgoing fetches
    const previousTodos = queryClient.getQueryData(["todos"]); // Snapshot old data

    // Optimistically update the cache
    queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);

    return { previousTodos }; // Return context for rollback
  },
  onError: (err, newTodo, context) => {
    // Roll back to previous state if mutation fails
    queryClient.setQueryData(["todos"], context.previousTodos);
  },
  onSettled: () => {
    // Always refetch to ensure synchronization
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});
```

---

## 🔢 Pagination

### 1. Offset-based Pagination

Handled using standard `useQuery` by including the page number in the `queryKey`.

```javascript
const { data, isFetching } = useQuery({
  queryKey: ["todos", page],
  queryFn: () => fetchTodos(page),
  keepPreviousData: true, // Shows old data while fetching the new page
});
```

### 2. Cursor-based (Infinite Scroll)

Handled via `useInfiniteQuery`, which manages `pageParam` and cumulative data pages.

```javascript
import { useInfiniteQuery } from "@tanstack/react-query";

const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["todos"],
  queryFn: ({ pageParam = 0 }) => fetchTodos(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
});
```

---

## ⚙️ Background Options

React Query allows granular control over how and when data should update:

- `refetchIntervalInBackground`: Continuously fetch in the background (ms).
- `retry`: Number of retry attempts on failure.
- `refetchOnWindowFocus`: Refetch when user returns to the tab.
- `refetchOnMount`: Refetch when the component mounts if data is stale.
