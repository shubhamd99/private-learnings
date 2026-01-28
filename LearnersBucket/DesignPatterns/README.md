## 📘 Design Patterns in JavaScript

A collection of popular Design Patterns implemented in JavaScript with simple, easy-to-understand examples and explanations.

## What are Design Patterns?

Design Patterns are reusable solutions to common software design problems.
They are not code, but templates / best practices for solving recurring problems in software design.

## Types of Design Patterns

There are 3 main categories:

### Creational Patterns (Object Creation)

Deal with how objects are created.

Examples:

- Singleton
- Factory Method
- Abstract Factory
- Builder
- Prototype

### Structural Patterns (Object Structure)

Deal with how classes and objects are composed.

Examples:

- Adapter
- Decorator
- Facade
- Proxy
- Composite
- Bridge
- Flyweight

### Behavioral Patterns (Object Interaction)

Deal with how objects communicate and behave.

Examples:

- Command
- Observer
- Strategy
- Visitor
- Iterator
- State
- Mediator
- Memento
- Chain of Responsibility
- Template Method
- Interpreter

## List of Design Patterns

### Singleton (Creational)

Ensures only one instance of a class exists and provides a global access point to it.
Frontend example: Redux store, global config, API client, or Logger service in React where only one instance should exist.
Why: Prevents duplicated global state and ensures consistent shared behavior.

### Observer (Behavioral)

Defines a one-to many dependency so when one object changes, all dependents update automatically.
Frontend example: React state updates, Redux subscriptions, DOM events.
Why: Enables reactive UI updates without tight coupling.

### Circuit Breaker (Behavioral / Resilience)

Stops calling a failing service to prevent cascading failures.
Frontend example: API wrapper that temporarily blocks failing backend calls.
Why: Improves app stability and user experience during outages.

### Proxy (Structural)

Acts as a wrapper controlling access to another object.
Frontend example: Vue reactivity, lazy image loading, API request proxies.
Why: Adds control, validation, or performance optimizations transparently.

### Builder (Creational)

Constructs complex objects step-by-step.
Frontend example: Building complex API request configs, chart configs, or multi-step form configuration objects.
Why: Avoids huge constructors and improves object creation readability.

### Prototype (Creational)

Creates new objects by cloning existing ones.
Frontend example: Duplicating UI templates or editor blocks.
Why: Faster and simpler than rebuilding complex objects from scratch.

### Iterator (Behavioral)

Provides a uniform way to traverse collections.
Frontend example: Iterating React children, paginated lists.
Why: Decouples traversal logic from collection structure.

### Round Robin (Behavioral / Scheduling)

Distributes requests evenly across resources.
Frontend example: Switching between multiple API endpoints or sockets.
Why: Balances load and improves reliability.

### Object Pool (Creational)

Reuses objects instead of creating/destroying them.
Frontend example: Reusing DOM nodes in virtual lists or canvas objects.
Why: Reduces memory allocation and garbage collection pressure.

### Chain of Responsibility (Behavioral)

Passes requests through a chain of handlers.
Frontend example: Redux middleware, Axios interceptors.
Why: Makes request pipelines extensible and loosely coupled.

### Visitor (Behavioral)

Adds new operations to object structures without modifying them.
Frontend example: Babel AST traversal, React Fiber traversal.
Why: Keeps object models clean while allowing many processing passes

### Composite (Structural)

Represents part-whole hierarchies as tree structures.
Frontend example: React component tree, DOM tree.
Why: Allows treating single components and groups uniformly.

### Mediator (Behavioral)

Centralizes communication between components.
Frontend example: Form controller, modal manager, event bus.
Why: Prevents components from becoming tightly coupled to each other.

### Memento (Behavioral)

Captures and restores object state.
Frontend example: Undo/redo snapshots, form drafts.
Why: Enables safe rollback without exposing internal state.

### State (Behavioral)

Changes object behavior when its internal state changes.
Frontend example: Loading/success/error UI states, auth flows.
Why: Replaces large if/else state machines with clean state objects.

### Strategy (Behavioral)

Selects an algorithm at runtime.
Frontend example: Payment methods, sorting, validation, barcode parsers.
Why: Eliminates complex conditional logic and improves extensibility.

### Template Method (Behavioral)

Defines algorithm skeleton while allowing step overrides.
Frontend example: Base API calls, base form submit pipelines.
Why: Enforces structure while allowing controlled customization.

### Adapter (Structural)

Converts incompatible interfaces.
Frontend example: Adapting backend API responses or 3rd party SDKs.
Why: Decouples UI from backend or vendor API changes.

### Bridge (Structural)

Separates abstraction from implementation.
Frontend example: React Native, chart renderer systems, storage abstraction.
Why: Prevents class explosion and allows independent evolution of both sides.

### Decorator (Structural)

Adds behavior dynamically by wrapping objects.
Frontend example: Fetch/Axios middleware, logging, retry, caching layers.
Why: Composes features without modifying existing code.

### Flyweight (Structural)

Shares heavy immutable data across many objects.
Frontend example: Virtual lists, map markers, chat message styles.
Why: Dramatically reduces memory usage and improves performance.

### Facade (Structural)

Provides a simple interface to a complex subsystem.
Frontend example: API service layer hiding auth, cache, retry, logging.
Why: Makes complex systems easy and safe to use.

### Factory (Creational)

Creates objects without exposing creation logic.
Frontend example: Creating components, strategies, handlers based on config.
Why: Centralizes creation logic and simplifies extension.
