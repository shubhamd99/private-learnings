// Treap data structure is a Cartesian tree in which each key is given a (randomly chosen) numeric priority
// described by Raimund Seidel and Cecilia R. Aragon in 1989.

// A Treap data structure is a Balanced Binary Search Tree, which combines the best of both the heaps
// and binary search trees
// but not guaranteed to have height as O(Log n).

// It store two values.
// A key (Ordered according to the BST property).
// And a randomly chosen numeric priority (A random value ordered according to max-heap property).

// The structure of the tree is determined by the requirement that it be heap-ordered:
// that is, the priority number for any non-leaf node must be greater than
// or equal to the priority of its children.

// List of operations performed on treap.
// insertNode(key):- Adds a new node with random priority.
// deleteNode(key):- Removes a node with the given key.
// searchNode(key):- Returns true if key is present in the treap, false otherwise.
// printTreap:- Prints the node in the BST order.

// We will need to helper functions in-order to implement a treap rotateLeft, rotateRight
// which reverses the parent-child relation.

// Base structure

// Generates a random number
// This function generates a random integer between two numbers
const getRandom = (max, min = 1) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

class Node {
  constructor(data) {
    this.data = data;
    this.priority = getRandom(100);
    // this.left = null;
    // this.right = null;
    this.left = this.right = null;
  }
}

class Treap {
  constructor() {
    // To store the root
    this.root = null;
  }

  rotateLeft(root) {
    const R = root.right;
    const X = root.right.left;

    // rotate
    R.left = root;
    root.right = X;

    // set new root
    return R;
  }

  rotateRight(root) {
    const L = root.left;
    const Y = root.left.right;

    // rotate
    L.right = root;
    root.left = Y;

    // set new root
    return L;
  }

  // Recursive function to insert a given key with a priority into Treap
  // To insert a key in the treap, create a new node with random priority
  // add it at the leaf position using the BST property to determine its initial position
  // then if the new node is not the root and has greater priority value than the parent then perform the tree rotation
  // to reverse its position with the parent.
  insertNode(data) {
    const insertNodeHelper = (root, data) => {
      if (root === null) {
        return new Node(data);
      }

      // BST insert
      if (data < root.data) {
        root.left = insertNodeHelper(root.left, data);

        // Heap fix
        if (root.left.priority > root.priority) {
          root = this.rotateRight(root);
        }
      } else {
        root.right = insertNodeHelper(root.right, data);

        // Heap fix
        if (root.right.priority > root.priority) {
          root = this.rotateLeft(root);
        }
      }

      return root;
    };

    this.root = insertNodeHelper(this.root, data);
  }

  // Recursive function to delete a key from the given Treap
  // To remove a node with given key from the treap we have to check for the following conditions.
  // If the node has only single child then remove the node and replace its position with its child
  // If the node is the leaf then remove it.
  // In case node has two child, swap its position in the tree with its immediate successor in the sorted order
  // Swapping may disrupt the heap-order priority, so we need to perform additional rotations to restore the property
  deleteNode(key) {
    const deleteNodeHelper = (root, key) => {
      if (root === null) {
        return null;
      }

      if (key < root.data) {
        root.left = deleteNodeHelper(root.left, key);
      } else if (key > root.data) {
        root.right = deleteNodeHelper(root.right, key);
      } else {
        // Node found

        // Case 1: Leaf
        if (!root.left && !root.right) {
          return null;
        }

        // Case 2: Two children
        if (root.left && root.right) {
          if (root.left.priority < root.right.priority) {
            root = this.rotateLeft(root);
            root.left = deleteNodeHelper(root.left, key);
          } else {
            root = this.rotateRight(root);
            root.right = deleteNodeHelper(root.right, key);
          }
        }
        // Case 3: One child
        else {
          root = root.left ? root.left : root.right;
        }
      }

      return root;
    };

    this.root = deleteNodeHelper(this.root, key);
  }

  // To search a key, we can use the standard search operation of BST, ignoring the priority.
  searchNode(key) {
    const search = (root) => {
      if (!root) return false;
      if (root.data === key) return true;
      return key < root.data ? search(root.left) : search(root.right);
    };

    return search(this.root);
  }

  printTreap() {
    const print = (root) => {
      if (!root) return;
      print(root.right);
      console.log(`${root.data}(${root.priority})`);
      print(root.left);
    };

    print(this.root);
  }
}

const arr = [5, 2, 1, 4, 9, 8, 10];
const treap = new Treap();

for (let val of arr) {
  treap.insertNode(val);
}

treap.printTreap();

console.log(" ");
console.log(treap.searchNode(8)); // true
console.log(" ");

treap.deleteNode(1);
treap.printTreap();

// Output:
// 10(32)
// 9(78)
// 8(89)
// 5(9)
// 4(34)
// 2(31)
// 1(92)

// true

// 10(32)
// 9(78)
// 8(89)
// 5(9)
// 4(34)
// 2(31)
