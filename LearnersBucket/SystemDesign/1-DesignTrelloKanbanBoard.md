# System Design: Kanban Board (Trello/Jira)

## 1. Requirements & Scope

**Core Features:** CRUD tasks, categorize by status (To-Do, In-Progress, In-Review, Done).

**Hierarchy:** Support for Epics, Stories, Tasks, and Sub-tasks.

**Real-time:** Updates must reflect across all users instantly.

**Offline Mode:** Users must be able to move cards and edit data without an internet connection, with automatic syncing upon reconnection.

## 2. Architecture & Rendering

**Pattern:** Single Page Application (SPA) using Client-Side Rendering (CSR).

**Why CSR?** Essential for offline capabilities. All logic for rendering and updating resides in the browser, allowing the UI to remain functional without a server.

**Tech Stack:** React (View), Node.js (Backend), MongoDB (Flexible schema for task nesting).

## 3. Data Modeling & State Management

### State Strategy

**Normalized State:** Store tasks in an object (byIds) rather than a nested tree. This allows O(1) updates and lookups.

**Persistence:** Use Zustand or Redux with middleware to persist the state to localStorage or IndexedDB for offline recovery.

### Schema Example

```javascript
{
  byIds: {
    "task-123": {
      id: "task-123",
      type: "story",
      status: "in-progress",
      child_tasks: ["sub-1", "sub-2"],
      assigned_to: "user-45"
    }
  },
  allIds: ["task-123"]
}
```

## 4. Real-time & Offline Synchronization

This is the "Staff Level" complexity of the problem.

### Real-time Communication

**Primary:** WebSockets for bi-directional, low-latency updates.

**Fallback:** Long Polling for older environments or unstable connections.

### The Offline Workflow

**Optimistic Updates:** Update the local UI immediately. Queue the API request in an "Outbox" (local storage).

**Conflict Resolution:** Use a "Last Write Wins" strategy or timestamps to resolve version mismatches.

**Idempotency:** Use client-generated UUIDs. If a retry request reaches the server twice due to a network glitch, the server recognizes the UUID and avoids duplicate creation.

### ID Mapping

**Problem:** The client generates a temp ID; the server generates a permanent DB ID.

**Solution:** Maintain a Map(TempID -> ServerID). This avoids deep-updating all relational references in the local state.

### Handling Attachments

**Separate Queue:** Don't let large image uploads block small text-based state syncs.

**Local Backup:** Cache a local copy of the file immediately so the user can see it even if the upload hasn't finished.

## 5. Performance & Optimization

**Windowing/Virtualization:** If a column has 1,000+ cards, render only those in the viewport to maintain 60 FPS.

**Code Splitting:** Lazy load the "Task Detail Modal" code until a user actually clicks a card.

**CDN:** Serve static assets and attachments via a Content Delivery Network.

## 6. Accessibility (A11y) & i18n

**Keyboard Navigation:** Essential for Kanban (Arrows to move cards, Enter to open).

**Screen Readers:** Use ARIA labels to announce "Card moved from To-Do to Done."

**i18n:** Use libraries like react-i18next for multi-language support and RTL (Right-to-Left) layouts.
