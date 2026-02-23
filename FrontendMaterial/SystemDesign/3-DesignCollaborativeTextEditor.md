# Design a Collaborative Text Editor (Frontend Focus)

This guide covers the frontend system design for a real-time collaborative text editor like Google Docs or Microsoft Word. Unlike traditional frontend applications, the main focus here lies in **state management**, **handling concurrency**, and **conflict resolution**.

## Core Concepts & Challenges

1. **Text Editor Basics**: A basic text editor models text as a linear data structure (e.g., an array). Characters can be inserted or deleted dynamically.
2. **Collaboration Challenges**:
   - **Resolving Conflicts**: Ensuring that when multiple users edit the exact same part of a document, a consistent final state is reached.
   - **Real-Time Coordination**: Providing a seamless, immediate experience where client updates reflect locally without delay.
   - **Synchronization**: Keeping the shared document synchronized and ensuring all connected clients eventually view the exact same content.
3. **Concurrency Issues**:
   - _Non-Commutative Operations_: In a collaborative environment, the order of deletions matters (e.g., $a - b \neq b - a$).
   - _Idempotency Missing_: If two users delete the same word simultaneously, the system might delete the word _and_ the word next to it if not handled properly.

---

## Approaches to Conflict Resolution

To build real-time collaborative web applications, two prominent algorithms are used: **Operational Transformation (OT)** and **Conflict-Free Replicated Data Types (CRDT)**.

### 1. Operational Transformation (OT)

OT transforms an incoming operation based on the history of previous operations to ensure all clients converge to the same state, even if events arrive out of order.

- **Used By**: Google Docs (Jupiter algorithm), CKEditor5.
- **Consistency Model (CCI)**:
  - **Convergence**: All document replicas eventually reach an identical state.
  - **Causality Preservation**: Operations strictly follow their execution order.
  - **Maintaining Intention**: The final applied effect matches the creator's intention.
- **Pros**: Keeps the core text data structures simple.
- **Cons**: Extremely difficult and time-consuming to implement correctly because it must account for a vast matrix of simultaneous state transformations.

### 2. Conflict-Free Replicated Data Types (CRDT)

Rather than using complex algorithmic transformations to resolve conflicts, CRDT researchers changed the **underlying data structure**. By building mathematical properties into the data itself, operations are guaranteed to resolve cleanly.

- **Mathematical Properties**: Commutative ($ab = ba$), Associative ($(ab)c = a(bc)$), and Idempotent ($a*a = a$).
- **Types of CRDTs**:
  - _State-based (CvRDT)_: Sends the entire state to peers to merge. Very inefficient for large documents.
  - _Operation-based (CmRDT)_: Sends only individual operations. Much better for network efficiency.

#### Key Mechanics of Operation-Based CRDTs

To make CRDTs work for text editors, three design pillars are required:

1. **Globally Unique Characters**: Every character is an object containing a `char` value, a `siteID` (unique identifier for the user), a `site-counter` (incremented ID per operation), and a `deleted` flag.
2. **Globally Ordered Characters (Fractional Indices)**: Standard array indices shift when text is inserted, breaking remote references. CRDTs use **fractional indices** (e.g., inserting between index 0 and 1 assigns the new character an index of 0.5) to keep ordering stable.
3. **Tombstones for Deletion**: Instead of removing characters from the data structure, they are marked with a `deleted: true` flag. The renderer just skips them. This ensures historical references remain intact.

---

## OT vs. CRDT Comparison

| Feature                       | Operational Transformation (OT)                    | Conflict-Free Replicated Data Types (CRDT)                |
| :---------------------------- | :------------------------------------------------- | :-------------------------------------------------------- |
| **Conflict Resolution**       | Transformed actively via algorithm.                | Handled automatically by data structure design.           |
| **Architecture**              | Requires a central server coordinating operations. | Decentralized; can easily work peer-to-peer.              |
| **Implementation Complexity** | High algorithm complexity.                         | High data-structure complexity, low algorithm complexity. |
| **Convergence**               | Slower (requires round-trip coordination).         | Rapid and decentralized.                                  |

---

## Technical Optimizations & Edge Cases

Whether using a central server or peer-to-peer configuration, several practical frontend scenarios must be handled:

### 1. Handling Disconnections

If a user goes offline and comes back, the system uses **Version Vectors**. A Version Vector maps how many total edits each user has made. Upon reconnecting, the client compares its local version vector to the server's vector and downloads only the missing delta updates.

### 2. Handling Latency (Out-of-Order Events)

What occurs if a user receives a remote `DELETE` operation before receiving the `INSERT` operation for that same character?

- **Solution**: Implement a **Deletion Buffer**. If a delete request arrives for an unknown character, push it to a buffer. After every insert operation, evaluate the buffer to see if any deferred deletions can now be applied.

### 3. Performance Bottlenecks

Representing a massive document as a single, massive 1D Array of objects causes severe performance issues in JavaScript (splicing and sorting takes $O(N \log N)$ or $O(N)$).

- **Optimization**: Convert the linear CRDT array into a **Two-Dimensional Array ($M \times N$)**, where $M$ represents the lines in the editor and $N$ represents the characters per line. This limits sorting/splicing boundaries strictly to the affected row, changing overhead from $O(N)$ to bounded row sizes.

---

## JavaScript CRDT Implementation

Below is a core reference implementation of an Operation-Based CRDT structure in JavaScript.

```javascript
// Utility function to generate a unique random ID for each character and site (user)
const uuidv1 = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

// Represents a single character in the editor
function Char(index, char, siteID, id = uuidv1()) {
  this.id = id; // Globally unique identifier for this specific character
  this.index = index; // Fractional index representing the character's position
  this.char = char; // The actual string character or value
  this.siteID = siteID; // The unique ID of the user (site) who created this character
  this.deleted = false; // Tombstone flag: true if character is deleted (so it won't be rendered)
}

// The main Collaborative Replicated Data Type structure for a text editor
function CRDT() {
  this.siteID = uuidv1(); // Generate a unique session/user ID for this client

  // Initialize with Begin-Of-File (bof) and End-Of-File (eof) markers
  // These anchors give us fixed starting boundaries (0 and 10000) to insert characters between
  this.chars = [
    new Char(0, "bof", this.siteID),
    new Char(10000, "eof", this.siteID),
  ];
  this.count = 100;

  // Crucial Algorithm: Fractional Indexing
  // Rather than integer indices (1, 2, 3) which require shifting all elements on insert,
  // we pick a fraction between the boundaries so all prior indices can stay stable!
  this.generateIndex = function (indexStart, indexEnd) {
    let diff = indexEnd - indexStart;
    let index;
    // Scale the gap logically to ensure we don't hit precision issues immediately
    if (diff <= 10) {
      index = indexStart + diff / 100;
    } else if (diff <= 1000) {
      index = Math.round(indexStart + diff / 10);
    } else if (diff <= 5000) {
      index = Math.round(indexStart + diff / 100);
    } else {
      index = Math.round(indexStart + diff / 1000);
    }
    return index;
  };

  // Called when the local user types a character
  this.insert = function (indexStart, indexEnd, char, id) {
    // 1. Calculate a stable fractional index for the new character
    let index = this.generateIndex(indexStart, indexEnd);

    // 2. Wrap it in a globally unique payload
    let charObj =
      id !== undefined
        ? new Char(index, char, this.siteID, id)
        : new Char(index, char, this.siteID);

    // 3. Add to our local array state
    this.chars.push(charObj);

    // 4. Always maintain the array ordered by index
    this.chars.sort(function (a, b) {
      return a.index - b.index;
    });

    // Note: In a real app, you would NOW broadcast this `charObj` to all peers over WebSockets!
    return charObj;
  };

  // Called when we receive an 'INSERT' event across the network from another peer
  this.remoteInsert = function (char) {
    // 1. Reconstruct the exact character payload from the remote peer
    const charCopy = new Char(char.index, char.char, char.siteID, char.id);

    this.chars.push(charCopy);

    // 2. Sort the array
    // Conflict Resolution: If two users inserted at the exact same fractional index simultaneously,
    // we use their unique `siteID` as an arbitrary but consistent tie-breaker!
    // This ensures both clients view the exact same final result.
    this.chars.sort(function (a, b) {
      if (a.index == b.index) {
        return a.siteID > b.siteID ? 1 : -1;
      } else {
        return a.index - b.index;
      }
    });
  };

  // Local/Remote Delete Operation
  // Notice we don't splice/remove the item from the array!
  this.delete = function (id) {
    let char = this.chars.find((e) => e.id === id);

    if (char !== undefined) {
      // 1. "Tombstone" the text so it loses visibility but keeps its ordering spot intact.
      char.deleted = true;
    }
  };

  // Turn the underlying object structure back into a standard string for the UI
  this.render = function () {
    // Iterate over characters and skip rendering markers or deleted tombstones
    return this.chars.reduce((accumulator, current) => {
      // Ignore boundary markers
      if (current.char === "bof" || current.char === "eof") return accumulator;
      // Skip deleted characters
      return `${accumulator}${current.deleted ? "" : current.char}`;
    }, "");
  };
}

// =======================
// Example Usage & Output
// =======================
const crdt = new CRDT();

// Pseudo-simulation: User typing "hello" linearly
const charH = crdt.insert(0, 10000, "h"); // Between BOF and EOF
const charE = crdt.insert(charH.index, 10000, "e"); // After 'h'
const charL1 = crdt.insert(charE.index, 10000, "l");
const charL2 = crdt.insert(charL1.index, 10000, "l");
const charO = crdt.insert(charL2.index, 10000, "o");

console.log("Render Document 1: ", crdt.render());
// Output: "hello"

// Pseudo-simulation: Local user hits "backspace" on the 'e' character
crdt.delete(charE.id);

console.log("Render Document 2: ", crdt.render());
// Output: "hllo"
```

---

## Resources & Implementations

**Implementations to Explore:**

- [CRDT Tech Implementations](https://crdt.tech/implementations)
- [Yjs (CRDT for Web)](https://github.com/yjs/yjs)
- [Automerge](https://automerge.org/)
- [Real-Time Collaborative Editor in React](http://www.mit.edu/~6.005/sp10/projects/rtce/project.html)

**Further Reading:**

- [Conclave: Decentralized CRDT editing](https://conclave-team.github.io/conclave-site/)
- [Wikipedia: Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation)
- [Wikipedia: Conflict-free replicated data type](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)
- [Google Jupiter Algorithm Paper](https://anrg.usc.edu/www/papers/JUPITER.pdf)
- [CKEditor: Lessons learned from real-time collaboration](https://ckeditor.com/blog/lessons-learned-from-creating-a-rich-text-editor-with-real-time-collaboration/)
