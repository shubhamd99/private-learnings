// The Visitor design pattern is a behavioural design pattern that lets you add further operations to objects
// without having to modify them. It allows you to define new operations on an object structure without
// changing the classes of the elements on which it operates.

// This pattern separates an algorithm from an object structure by moving the logic
// into a separate object, called the visitor.

// The key components of this pattern are the Visitor, ConcreteVisitor, Element, ConcreteElement, and ObjectStructure

// Visitor: Declares a visit operation for each ConcreteElement in the object structure.
// ConcreteVisitor: Implements each operation declared by the Visitor.
// Element: Declares an accept method that takes a visitor as an argument.
// ConcreteElement: Implements the accept method.
// ObjectStructure: Can enumerate its elements and provide a way to access them.

// Visitor interface
class Visitor {
  visitCircle(circle) {}
  visitRectangle(rectangle) {}
}

// Concrete visitors
class AreaVisitor extends Visitor {
  visitCircle(circle) {
    const area = Math.PI * Math.pow(circle.radius, 2);
    console.log(`Circle area: ${area}`);
  }
  visitRectangle(rectangle) {
    const area = rectangle.width * rectangle.height;
    console.log(`Rectangle area: ${area}`);
  }
}

class PerimeterVisitor extends Visitor {
  visitCircle(circle) {
    const perimeter = 2 * Math.PI * circle.radius;
    console.log(`Circle perimeter: ${perimeter}`);
  }
  visitRectangle(rectangle) {
    const perimeter = 2 * (rectangle.width + rectangle.height);
    console.log(`Rectangle perimeter: ${perimeter}`);
  }
}

// Element interface
class Shape {
  accept(visitor) {}
}

// Concrete elements
class Circle extends Shape {
  constructor(radius) {
    super(); // Calls the constructor of the parent class (Shape).
    this.radius = radius;
  }
  accept(visitor) {
    visitor.visitCircle(this);
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super(); // Calls the constructor of the parent class (Shape).
    this.width = width;
    this.height = height;
  }
  accept(visitor) {
    visitor.visitRectangle(this);
  }
}

// Client
const shapes = [new Circle(5), new Rectangle(4, 6)];

const areaVisitor = new AreaVisitor();
const perimeterVisitor = new PerimeterVisitor();
shapes.forEach((shape) => shape.accept(areaVisitor));
// Circle area: 78.53981633974483
// Rectangle area: 24

shapes.forEach((shape) => shape.accept(perimeterVisitor));
// Circle perimeter: 31.41592653589793
// Rectangle perimeter: 20

// In this implementation, we have two concrete visitors: AreaVisitor and PerimeterVisitor,
// which calculate the area and perimeter of shapes, respectively

// The shapes, Circle and Rectangle, act as concrete elements that accept visitors.

// The accept method in each shape class calls the appropriate visit method on the visitor,
// passing itself as an argument

// The client code creates a list of shapes and applies both the area and perimeter visitors to each shape
// demonstrating the separation of shape-related operations from the shape classes themselves.

// It allows you to add new operations (features) to objects without modifying their classes.
// And today you want:
// Area calculation
// Tomorrow you want:
// Perimeter
// Drawing
// Export to JSON
// Cost estimation
// Physics simulation
// etc...
// Without Visitor Pattern, you would keep modifying Circle and Rectangle again and again, adding more and more methods.

class JSONExportVisitor extends Visitor {
  visitCircle(circle) {
    console.log(
      JSON.stringify({
        type: "Circle",
        radius: circle.radius,
      }),
    );
  }

  visitRectangle(rectangle) {
    console.log(
      JSON.stringify({
        type: "Rectangle",
        width: rectangle.width,
        height: rectangle.height,
      }),
    );
  }
}

const jsonVisitor = new JSONExportVisitor();
shapes.forEach((shape) => shape.accept(jsonVisitor));
// {"type":"Circle","radius":5}
// {"type":"Rectangle","width":4,"height":6}

// Example Scenario 2:
// Now, let's create a more advanced implementation by simulating a document editor
// where we can perform operations (visitors) on different parts of a document, such as text and images.

// Visitor interface
class Visitor2 {
  visitText(text) {}
  visitImage(image) {}
}

// Concrete visitors
class SpellCheckVisitor extends Visitor2 {
  visitText(text) {
    console.log(`Checking spelling for text: "${text.content}"`);
    // Dummy spell check implementation
    if (text.content.includes("teh")) {
      console.log(`Found misspelling: "teh" should be "the"`);
    } else {
      console.log("No spelling errors found");
    }
  }

  visitImage(image) {
    console.log("Spell check not applicable for images");
  }
}

class RenderVisitor extends Visitor2 {
  visitText(text) {
    console.log(`Rendering text: "${text.content}"`);
  }
  visitImage(image) {
    console.log(`Rendering image with src: "${image.src}"`);
  }
}

// Element interface
class DocumentElement {
  accept(visitor) {}
}

// Concrete elements
class Text extends DocumentElement {
  constructor(content) {
    super();
    this.content = content;
  }
  accept(visitor) {
    visitor.visitText(this);
  }
}

class Image extends DocumentElement {
  constructor(src) {
    super();
    this.src = src;
  }
  accept(visitor) {
    visitor.visitImage(this);
  }
}

// Object structure
class Document {
  constructor() {
    this.elements = [];
  }
  addElement(element) {
    this.elements.push(element);
  }
  accept(visitor) {
    this.elements.forEach((element) => element.accept(visitor));
  }
}

// Client
const document = new Document();
document.addElement(new Text("Hello world"));
document.addElement(new Text("This is teh example text"));
document.addElement(new Image("image.png"));

const spellCheckVisitor = new SpellCheckVisitor();
const renderVisitor = new RenderVisitor();

document.accept(spellCheckVisitor);
// Checking spelling for text: "Hello world"
// No spelling errors found
// Checking spelling for text: "This is teh example text"
// Found misspelling: "teh" should be "the"
// Spell check not applicable for images

document.accept(renderVisitor);
// Rendering text: "Hello world"
// Rendering text: "This is teh example text"
// Rendering image with src: "image.png"

// The Document class acts as an object structure,
// holding a list of elements and allowing visitors to visit each element.
// The client code creates a document with text and image elements,
// then applies both the spell check and render visitors to the document,
// demonstrating how the Visitor pattern can be used to perform various operations
// on different types of elements in a document.
