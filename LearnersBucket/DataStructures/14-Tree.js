// A Tree is a non-sequential data structure that is extremely
// helpful in storing data that needs to be found easily.

// Tree Definition
// A tree is an abstract model to represent data stored in a hierarchy.
// A very common day to day example is a family tree, a chart showing the organization hierarchy.

// A tree consists of nodes(data) with parent-child relationships.
//  Each node consists of a parent (except for the top or root node) and each node can have zero or two children.

// Each element of the tree is called a node, the top node of the tree is called root
// as it does not contains any parent.

// There are internal and external nodes present in a tree.
// A node that has at least one child is called an internal node.
// A node that has zero children is called an external node or a leaf.

// The hierarchy of the tree is represented by level.
// The root element is at the 0 levels, his children are at level 1 and so on.

// A node in the tree may have an ancestor and descendants.
// Ancestors of the node are parents, grandparents or the top-level nodes.
// Descendants of the node are children, grandchildren or the low-level nodes.

// A tree can also have a subtree which in itself is a complete tree but present inside another parent tree.

// The depth of any node consists of the number of ancestors and
// the height of the tree is the maximum depth of the ancestors from the 0th level or root.

// Difference between Binary Tree and Binary Search Tree

// Binary Tree
// A node in the tree can have at most two children, one on the left and one on the right.
// This way of structuring data helps us to form a tree and using this we can write efficient algorithms
// to insert, search and delete values. This is called a binary tree.

// Binary Search Tree
// A binary search tree is a binary tree that stores the data in a sorted sequence.
// It only allows us to store nodes with lesser values on the left and
// the nodes with a bigger value on the right
// A binary search tree is always a binary tree but vice versa cannot be always true.

// Following is the list of operations performed on a binary search tree.
// insert(key):- Inserts a new data in the tree.
// search(key):- Returns true if the data is found, false otherwise.
// min:- Returns the MIN value of the tree.
// max:- Returns the MAX value of the tree.
// remove(key):- Removes the data with given key.

// Each node will store its value and reference to its left and right child just like a doubly linked list.

// Node
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// BST
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Inserting a node in tree.
  // - If there is no root element then add to the root.
  // - Check if the value is less than the root and left node is empty then add it to the left
  // else recursively call the same function to descend one level and check again and add it and so on.
  // - Check if the value is greater than the root and the right node is empty then add it
  // else descend one level recursively and check again and keep doing till the element is added at the right spot.
  // - Now using this helper function we can insert a node in the BST.
  insertNode(node, newNode) {
    // If new value is less than the current
    if (newNode.key < node.key) {
      //If left is empty
      if (node.left === null) {
        node.left = newNode;
      } else {
        // Check for descendants
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        // If right is empty
        node.right = newNode;
      } else {
        // Check for descendants
        this.insertNode(node.right, newNode);
      }
    }
  }

  insert(key) {
    let newNode = new Node(key);
    // If no root then add at root
    if (this.root == null) {
      this.root = newNode;
    } else {
      // Find the appropriate place to insert the new node
      this.insertNode(this.root, newNode);
    }
  }

  // A key that needs to be searched can be present at any node
  // So to check if it is present in the tree or not we need to check each node of the tree.
  // For this, we will recursively call the same search function which will check for both the left and right child
  // and return true if the key is present, false otherwise.
  search(key, node = this.root) {
    // If no element then return false
    if (node === null) {
      return false;
    }

    // Else recursively check if the key is present at any descendants
    if (key < node.key) {
      // Check the left descendants
      return this.search(key, node.left);
    } else if (key > node.key) {
      // Check the right descendants
      return this.search(key, node.right);
    } else {
      return true;
    }
  }

  // As the lesser value are stored on the left,
  // To find the MIN value we will need to return the data of the left most descendant.
  min(node = this.root) {
    if (node) {
      // Return the left most descendant's value
      while (node && node.left !== null) {
        node = node.left;
      }

      return node.key;
    }
    return null;
  }

  // As the greater value are stored on the right,
  // To find the MAX value we will need to return the data of the right most descendant.
  max(node = this.root) {
    if (node) {
      // Return the right most descendant's value
      while (node && node.right !== null) {
        node = node.right;
      }

      return node.key;
    }
    return null;
  }

  // Remove a key from the BST.
  // This is one of the most complex method because we have to handle multiple cases while removing a node.
  // To handle such complex scenarios we will use a helper function which helps to manage this effectively.
  // This helper function will return the node which we will need to assign to the ancestors and at last to the root.
  removeNode(node, key) {
    if (node === null) {
      return null;
    }

    // Recursively find the node with given key
    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // When a node is found with the given key
      // There are three different cases which need to be handled
      // .....
      // Node is leaf or with no child
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // Node with one child
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Node with two child
      // When deleting a node with two children, you must replace it with either:
      // Inorder Successor = smallest value in right subtree
      // OR
      // Inorder Predecessor = largest value in left subtree
      // Both Works
      let aux = this.min(node.right);
      node.key = aux.key;
      node.right = removeNode(node.right, aux.key);
      return node;
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
}

const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);

tree.remove(18);
console.log(tree.min());
console.log(tree.max());
console.log(tree.search(18));

// 3
// 25
// false

// When deleting a BST node with two children, we can replace it with either the inorder successor
// (min of right subtree) or inorder predecessor (max of left subtree).
// Both preserve the BST property because the replacement value lies between the left and right subtrees.

// Remove - 50:
//     50
//    /  \
//  30    70
//       /  \
//     60    80

// Option 1: Use Right Subtree (Successor)
// min(70 subtree) = 60

//     60
//    /  \
//  30    70
//          \
//          80

// Option 2: Replace 50 with 30 (Predecessor)
// 30
//   \
//    70
//   /  \
// 60    80

// Access - O(N)
// Search - OLog(N)
// Insert - OLog(N)
// Space - O(N)
