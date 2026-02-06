# 📚 Data Structures Guide (JavaScript)

## Main Categories of Data Structures

### Primitive Data Structures

These are the basic built-in data types provided by the programming language. They store single values and are used as building blocks for complex structures.

Examples:

- Number
- String
- Boolean
- Null
- Undefined
- Char (in other languages)

Characteristics:

- Store only one value
- Simple and fixed size
- Directly supported by CPU / language
- Fast operations

Real-world use:

- Counters, flags, IDs, values, status variables

### Non-Primitive (Composite) Data Structures

These are complex data structures built using primitive data types. They can store multiple values and represent relationships between data.

Examples:

- Array
- Object
- Stack
- Queue
- LinkedList
- Tree
- Graph
- Heap
- Trie
- Set
- Map

Characteristics:

- Store multiple values
- Can represent complex data relationships
- Can be linear or non-linear
- Can be static or dynamic

Real-world use:

- Databases, UI trees, file systems, social networks, caches

## Another Very Important Classification

### Linear Data Structures

Data elements are arranged sequentially one after another.

Examples:

- Array
- LinkedList
- Stack
- Queue
- Deque

### Non-Linear Data Structures

Data elements are arranged in hierarchical or graph form, not sequentially.

Examples:

- Tree
- Graph
- Heap
- Trie

## Another Classification (Concept vs Implementation)

### Abstract Data Types (ADT)

An Abstract Data Type (ADT) describes WHAT a data structure does, not HOW it is implemented.
It only defines:
What operations are allowed
What behavior is expected
Not the internal storage

Examples:

- Stack
- Queue
- Deque
  -List
- Set
- Map

### Concrete Data Structures

Defines how data is stored in memory.

Examples:

- Array
- LinkedList
- Hash Table
- Tree Nodes

## Stack

A linear data structure that follows LIFO (Last In First Out) principle. All operations happen from one end called the top. Main operations are push, pop, peek, and isEmpty.

- Search: O(n)
- Insert (push): O(1)
- Delete (pop): O(1)
- Space: O(n)
- Use cases: Undo/redo, call stack, expression evaluation, backtracking.

## Queue

A linear data structure that follows FIFO (First In First Out) principle. Elements are inserted from the rear and removed from the front using enqueue and dequeue.

- Search: O(n)
- Insert (enqueue): O(1)
- Delete (dequeue): O(1)
- Space: O(n)
- Use cases: Scheduling, BFS, task queues, print queues

## Object (Hash Map / Dictionary)

A key-value based data structure optimized for fast lookup, insert, and delete. Internally implemented using hash tables.

- Search: O(1) avg, O(n) worst
- Insert: O(1) avg
- Delete: O(1) avg
- Space: O(n)
- Use cases: Caching, lookup tables, frequency counting, memoization.

## List (Array)

A dynamic array that stores elements in contiguous memory and allows random access using index.

- Search: O(n) (unsorted), O(log n) if sorted
- Insert: O(n)
- Delete: O(n)
- Access: O(1)
- Space: O(n)
- Use cases: UI lists, tables, stacks, buffers.

## Singly Linked List

A linear data structure made of nodes, where each node contains value and next pointer. Memory is not contiguous.

- Search: O(n)
- Insert: O(1) (if at head)
- Delete: O(1) (if node known)
- Space: O(n)
- Use cases: Playlists, memory-efficient inserts/deletes.

## Stack using Linked List

Stack implemented on top of linked list.

- Search: O(n)
- Push: O(1)
- Pop: O(1)
- Space: O(n)
- Use cases: Large undo stacks, call stacks.

## Queue using Linked List

Queue implemented using head and tail pointers.

- Search: O(n)
- Enqueue: O(1)
- Dequeue: O(1)
- Space: O(n)
- Use cases: Job queues, BFS traversal.

## Doubly Linked List

Each node has next and prev pointers.

- Search: O(n)
- Insert: O(1) (if node known)
- Delete: O(1) (if node known)
- Space: O(n)
- Use cases: Browser history, LRU cache, undo/redo.

## Deque (Double Ended Queue)

Insertion and deletion at both ends.

- Search: O(n)
- Insert/Delete front/back: O(1)
- Space: O(n)
- Use cases: Sliding window, task scheduling.

## Deque using Doubly Linked List

- Efficient deque implementation.
- Search: O(n)
- Insert/Delete both ends: O(1)
- Space: O(n)
- Use cases: Schedulers, caches.

## Circular Linked List

Last node points to first node.

- Search: O(n)
- Insert: O(1)
- Delete: O(1) (if node known)
- Space: O(n)
- Use cases: Round-robin scheduling, infinite loops.

## Priority Queue (Heap)

Elements removed based on priority.

- Search: O(n)
- Insert: O(log n)
- Delete (extract): O(log n)
- Peek: O(1)
- Space: O(n)
- Use cases: Dijkstra, scheduling, event systems.

## Circular Doubly Linked List

Doubly linked list with circular links.

- Search: O(n)
- Insert/Delete: O(1)
- Space: O(n)
- Use cases: Carousel UI, round-robin navigation.

## Tree (Binary Tree General)

Hierarchical structure with parent-child nodes.

- Search: O(n) (O(log n) if balanced)
- Insert/Delete: O(n) (O(log n) if balanced)
- Space: O(n)
- Use cases: DOM tree, file systems.

## Heap

Complete binary tree with heap property.

- Search: O(n)
- Insert: O(log n)
- Delete: O(log n)
- Peek: O(1)
- Space: O(n)
- Use cases: Priority queue, top-K problems.

## Trie (Prefix Tree)

Tree optimized for string search.

- Search: O(L) where L = word length
- Insert: O(L)
- Delete: O(L)
- Space: O(total characters)
- Use cases: Autocomplete, dictionary, search engines.

## Graph (Adjacency List)

Collection of vertices and edges.

- Search/Traversal: O(V + E)
- Insert: O(1)
- Delete: O(V)
- Space: O(V + E)
- Use cases: Maps, social networks, dependency graphs.

## AVL Tree (Self-Balancing BST)

Balanced binary search tree.

- Search: O(log n)
- Insert: O(log n)
- Delete: O(log n)
- Space: O(n)
- Use cases: Databases, in-memory sorted indexes.
