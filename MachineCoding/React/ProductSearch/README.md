# Product Search Page (Machine Coding Round)

This is a clean, dependency-free React implementation for a 75-minute machine coding interview. 

## Key Interview Signals Demonstrated

1. **State Structure:**
   - Clear separation of *Data State* (products, loading, error) and *Filter State* (search, category, page).
2. **Proper Debouncing (No `useEffect` mistakes):**
   - The search input is controlled natively by `searchTerm`.
   - A custom `useDebounce` hook derives a delayed `debouncedSearch` value.
   - The fetch API `useEffect` only listens to `debouncedSearch`, preventing network spam while typing.
3. **Pagination & Filter Reset:**
   - A dedicated `useEffect` resets `page` back to 1 whenever a filter (`debouncedSearch` or `category`) changes. This prevents the user from being stranded on an empty "Page 3" after filtering.
4. **Race Condition Prevention:**
   - The fetch `useEffect` uses an `isMounted` boolean flag to prevent setting state on unmounted components and to ignore stale network responses.
5. **Clean UI/CSS:**
   - Minimalist, flex/grid-based CSS designed to be easily memorized and written rapidly. 

## File Structure
- `App.js` - Main component handling state and side effects.
- `hooks/useDebounce.js` - Reusable debounce hook.
- `mock/mockApi.js` - Simulates a backend with latency, filtering, and pagination logic.
- `styles.css` - Responsive layout.
