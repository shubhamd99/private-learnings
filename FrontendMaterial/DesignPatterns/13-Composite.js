// The Composite design pattern is a structural pattern that allows you to compose objects into tree structures
// to represent part-whole hierarchies.

// This pattern enables clients to treat individual objects and compositions of objects uniformly

// Real-Life Use Cases
// UI Frameworks (The most common use)
// Think of a web page or a mobile app.
// Leaf: A Button, a Text Label, or an Image.
// Composite: A "Panel" or "Div" that contains Buttons and Labels.
// When the browser wants to "Draw" the screen, it just tells the top-level container to .render().
// That container then tells all its children (buttons, images, or other sub-panels) to .render().

// The key components of this pattern are:

// Component: Declares the interface for objects in the composition.
// It can include default behaviour for the interface common to all classes.

// Leaf: Represents leaf objects in the composition. A leaf cannot have any children.

// Composite: Represents an object that has children.
// It defines behaviours for components having children and implements child-related operations.

// Client: Manipulates objects in the composition through the component interface.

// Let's implement a simple example where we have a set of files and folders that can be represented as a tree structure.

// Component
class FileSystemItem {
  getName() {}
  getSize() {}
}

// Leaf
class File extends FileSystemItem {
  constructor(name, size) {
    super();
    this.name = name;
    this.size = size;
  }

  getName() {
    return this.name;
  }

  getSize() {
    return this.size;
  }
}

// Composite
class Folder extends FileSystemItem {
  constructor(name) {
    super();
    this.name = name;
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  getName() {
    return this.name;
  }

  getSize() {
    return this.items.reduce((total, item) => total + item.getSize(), 0);
  }
}

// Client
const file1 = new File("file1.txt", 100);
const file2 = new File("file2.txt", 200);
const file3 = new File("file3.txt", 300);

const folder1 = new Folder("folder1");
folder1.add(file1);
folder1.add(file2);

const folder2 = new Folder("folder2");
folder2.add(folder1);
folder2.add(file3);

console.log(`${folder1.getName()} size: ${folder1.getSize()} bytes`);
console.log(`${folder2.getName()} size: ${folder2.getSize()} bytes`);

// folder1 size: 300 bytes
// folder2 size: 600 bytes

// The client code creates instances of files and folders,
// composes them into a tree structure, and then retrieves the total size of the top-level folder.

// Let's create a more advanced implementation of the Composite design pattern by simulating
// a graphic editor where we can group and manipulate graphic objects like circles and squares.

// Component
class Graphic {
  draw() {}
  add(graphic) {}
  remove(graphic) {}
  getChild(index) {}
}

// Leaf
class Circle extends Graphic {
  draw() {
    console.log("Drawing a Circle");
  }
}

class Square extends Graphic {
  draw() {
    console.log("Drawing a Square");
  }
}

// Composite
class GraphicGroup extends Graphic {
  constructor() {
    super();
    this.graphics = [];
  }

  add(graphic) {
    this.graphics.push(graphic);
  }

  remove(graphic) {
    this.graphics = this.graphics.filter((g) => g !== graphic);
  }

  getChild(index) {
    return this.graphics[index];
  }

  draw() {
    console.log("Drawing a Graphic Group:");
    this.graphics.forEach((graphic) => graphic.draw());
  }
}

// Client
const circle1 = new Circle();
const circle2 = new Circle();
const square1 = new Square();

const group1 = new GraphicGroup();
group1.add(circle1);
group1.add(square1);

const group2 = new GraphicGroup();
group2.add(circle2);
group2.add(group1);

group2.draw();

//"Drawing a Graphic Group:"
//"Drawing a Circle"
//"Drawing a Graphic Group:"
//"Drawing a Circle"
//"Drawing a Square"

// The client code creates instances of circles and squares, groups them into a hierarchical structure,
// and then draws the entire group, demonstrating how the composite pattern allows uniform treatment of
// individual objects and compositions of objects.
