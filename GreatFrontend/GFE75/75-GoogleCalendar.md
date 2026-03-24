# Frontend System Design: Google Calendar

Designing a highly interactive, performant, and reliable calendar application like Google Calendar.

---

## 📅 1. Requirements

### Functional Requirements

- **View Events:** Supports Day, Week, and Month views.
- **Create/Edit Events:** CRUD operations for individual and recurring events.
- **Conflict Detection:** Identifies overlapping events during creation or updates.
- **Conflict Resolution:** Provides options to reschedule or adjust event times.
- **Shared Calendars:** Ability to view and manage multiple users/group calendars.

### Non-Functional Requirements

- **Performance:** Low latency (<50ms TTI), smooth interactions during view switching.
- **Offline Support:** Basic viewing and drafting capabilities without an active internet connection.
- **Real-time Sync:** Changes made on one device should reflect on others almost instantly.
- **Accessibility:** Full keyboard navigation, screen reader support (ARIA), and high contrast modes.
- **Observability:** Logging for performance bottlenecks and critical failures (e.g., event sync errors).

---

## 🏗️ 2. High-Level Architecture

Following **Feature-Sliced Design (FSD)** and **Atomic Design** principles.

### Architecture Components

- **View (UI Layer):**
  - **Atoms:** Buttons, Tooltips, Avatars.
  - **Molecules:** DayCell, EventCard, TimeIndicator.
  - **Organisms:** CalendarGrid, EventModal, SidebarNav.
  - **Templates/Pages:** DashboardLayout, SettingsPage.
- **Controller (Logic Layer - Custom Hooks & Actions):**
  - `useCalendarEvents`: Handles data fetching and normalization.
  - `useConflictDetector`: Encapsulates the overlap detection logic.
- **Model (State Layer - Modular Zustand):**
  - `eventStore`: Holds normalized event objects indexed by ID and Date.
  - `viewStore`: Manages current active view, date range, and filters.

### Rendering Strategy: **Hybrid Approach**

- **SSR (Server-Side Rendering) / RSC (React Server Components):**
  - Used for the initial page load to ensure fast First Contentful Paint (FCP).
  - Fetches fundamental user metadata and the current day's events.
- **CSR (Client-Side Rendering):**
  - Used for subsequent transitions between views (Day ↔ Week ↔ Month) to ensure a "fluid" feel without full-page reloads.
  - All heavy interaction logic (drag-and-drop, modals, search) is client-side.
- **Static Generation (SSG):**
  - Suitable for public shared calendar links to maximize cacheability and SEO.

---

## 📡 3. API Design

Protocol: **REST** (for basic CRUD) with **WebSockets** (for real-time sync).

- `GET /events?start_date=...&end_date=...` - Fetches events for a range (supports pagination/limit).
- `POST /events` - Creates a new event.
- `PUT /events/:id` - Updates an existing event.
- `DELETE /events/:id` - Deletes an event.
- `GET /events/conflicts` - Checks for overlaps for a given time/attendees list.
- `PUT /events/conflicts/resolve` - Specific endpoint for batch rescheduling.

---

## 🧠 4. Conflict Detection Algorithm

The key is to minimize comparisons by sorting the dataset.

1. **Sort:** Sort all events for the day/selected range by `startTime` (ASC).
2. **Iterate:** Compare `currentEvent.endTime` with `nextEvent.startTime`.
3. **Flag:** If `endTime > startTime`, a conflict exists.
4. **Group:** Recursively group events that overlap to display them side-by-side in the UI.

```javascript
/**
 * Detects overlapping groups of events for grid layout positioning.
 */
function detectConflicts(events) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.start) - new Date(b.start),
  );
  const groups = [];

  sorted.forEach((event) => {
    let addedToGroup = false;
    for (const group of groups) {
      // If the current event overlaps with any event in the group
      if (group.some((e) => new Date(event.start) < new Date(e.end))) {
        group.push(event);
        addedToGroup = true;
        break;
      }
    }
    if (!addedToGroup) groups.push([event]);
  });
  return groups;
}
```

---

## 🛠️ 5. Client Data Model & State Management

### Modular Zustand Store

User rule: "Actions must be separated from state".

```typescript
interface EventState {
  events: Record<string, CalendarEvent>; // Normalized by eventId
  isLoading: boolean;
}

const useEventStore = create<EventState>((set) => ({
  events: {},
  isLoading: false,
}));

// Actions (Outside the Store)
export const eventActions = {
  addEvent: (event: CalendarEvent) =>
    useEventStore.setState((state) => ({
      events: { ...state.events, [event.id]: event },
    })),
  fetchEvents: async (range: DateRange) => {
    // ... logic with fetch and transformers
  },
};
```

### Data Shaping (Transformers)

Zero business logic in UI. API responses are passed through a `transformer` to ensure the UI only receives display-ready data (e.g., pre-calculated duration, localized time strings).

---

## ⚡ 6. Performance & Optimizations

- **Virtualization:** For long scrollable lists or dense months with 100+ events.
- **Debouncing:** Search input and frequent drag-and-drop updates.
- **Indexed Lookup:** `eventsByDate` map for O(1) retrieval when rendering a specific day cell.
- **WebP Assets:** Standardize images/icons.
- **State Persistence:** Use `persist` middleware in Zustand with IndexedDB (localForage) for offline support.
- **Lazy Loading:** Dynamically import the Event Modal or heavy settings components.

---

## 🛸 7. Edge Cases

- **Concurrent Edits:** Handled via **Optimistic Updates** on the client and **Etag/Version** headers on the server to detect "mid-air collisions".
- **Time Zones:** Store everything in **UTC** on the server; convert to browser's `Intl.DateTimeFormat` on the fly.
- **Large Attendee Lists:** Implement windowing/pagination for the "Search Attendees" dropdown.
- **Network Flakiness:** Implement a sync queue (Service Worker) that retries failed mutations once back online.

---

## ♿ 8. Accessibility & I18n

- **Keyboard:** `Tab` for navigation, `Enter/Space` for opening modals, `Esc` to close.
- **ARIA:** `aria-live` for toasts, `aria-roledescription="event-card"` for clarity.
- **I18n:** Support for RTL (Right-to-Left) layouts and local date formats (DD/MM/YYYY vs MM/DD/YYYY).

---
