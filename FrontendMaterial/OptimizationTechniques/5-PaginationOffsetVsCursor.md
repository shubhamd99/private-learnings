# Pagination: Offset-based vs. Cursor-based

Pagination is a technique to lazy-load data in batches, ensuring web applications remain performant and scalable by reducing the amount of data transferred and rendered at once.

## 1. Offset-based Pagination

This is the traditional method where we specify a `page` number and a `limit` per page. The database "skips" (offsets) a certain number of records and returns the next set.

- **Example URL**: `api.example.com/items?page=3&limit=20` (Skips first 40 items).
- **Metadata Returned**: Total records, current page, total pages.

### Advantages:

- **Direct Access**: Users can jump to any specific page.
- **Predictability**: Users know exactly how many records and pages exist.
- **Use Case**: Best for blogs, e-commerce, and static datasets (e.g., PDF viewers).

### Disadvantages:

- **Data Inconsistency**: If new records are added while a user navigates, they might see the same item twice on different pages (data shifting).
- **Performance**: As the offset increases (e.g., page 10,000), the database gets slower because it still has to scan all skipped records.

---

## 2. Cursor-based Pagination

Instead of a page number, we use a unique identifier (a "cursor") from the last fetched record to point to the next set of data.

- **Example URL**: `api.example.com/items?cursor=dXNlcjpVMEc5&limit=10`
- **Metadata Returned**: `next_cursor` or `has_more`.

### Advantages:

- **Consistency**: Prevents duplicate items even if new records are added (it fetchs only records _after_ the cursor).
- **Performance**: Highly efficient for massive datasets since the database jumps directly to the record ID.
- **Use Case**: Best for infinite scrolls, social media feeds (Twitter/Instagram), and real-time chat history.

### Disadvantages:

- **No Jumping**: Users cannot jump to a specific page or middle of the list.
- **No Total Count**: Usually doesn't provide the total number of pages/records.
- **Freshness**: To see new records added _after_ the initial load, the user usually needs to "Pull to Refresh" or restart the feed.

---

## Summary Comparison

| Feature            | Offset-based Pagination     | Cursor-based Pagination        |
| :----------------- | :-------------------------- | :----------------------------- |
| **Navigation**     | Skip to any page            | Sequential only                |
| **Performance**    | Smalls with large offsets   | Consistently high              |
| **Data Integrity** | Prone to duplicates/skips   | Highly consistent              |
| **Total Count**    | Usually provided            | Usually hidden                 |
| **Implementation** | Simpler (Limit/Offset)      | More complex (Unique pointers) |
| **Best For**       | Static content (E-commerce) | Dynamic content (Social Feeds) |
