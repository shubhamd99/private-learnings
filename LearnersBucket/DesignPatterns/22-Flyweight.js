// The Flyweight design pattern is a structural design pattern aimed at minimising memory usage by
// sharing as much data as possible with similar objects.
// It is especially useful in scenarios where a large number of objects need to be created,
// leading to high memory consumption.
// Instead of creating a new object for each instance, the
// Flyweight pattern reuses existing objects that share the same state.

// In a text editor, each character is an object.
// Instead of creating a new object for every character,
// we can use the Flyweight pattern to share objects among characters that are the same.

class Character {
  constructor(char) {
    this.char = char;
  }
  display(position) {
    console.log(`Character: ${this.char} at position: ${position}`);
  }
}

class CharacterFactory {
  constructor() {
    this.characters = {};
  }
  getCharacter(char) {
    if (!this.characters[char]) {
      this.characters[char] = new Character(char);
    }
    return this.characters[char];
  }
}

// Usage
const factory = new CharacterFactory();
const text = "hello flyweight pattern";
for (let i = 0; i < text.length; i++) {
  const char = factory.getCharacter(text[i]);
  char.display(i);
}

// we have a Character class representing each character in a text editor
// and a CharacterFactory that ensures the same character objects are reused
// When displaying the text "hello flyweight pattern,"
// the factory reuses the Character instances, reducing the number of objects created.

// REAL FRONTEND USE CASES

// Virtualized Lists (React Window, React Virtualized)
// 1 million rows
// Only 20 DOM nodes reused
// Data (style/layout) is shared
// Only position & content change
// This is Flyweight + Recycling.

// Rich Text Editor (Notion, Google Docs)
// Every letter does NOT create new font/style objects
// Font, color, style are shared flyweights
// Only position is external state

// Chart Libraries (ECharts, ChartJS)
// Thousands of points
// Marker shape objects are shared
// Only x/y coordinates differ

class MarkerIcon {
  constructor(color, shape) {
    // Heavy data (image, canvas, svg path, etc)
    this.color = color;
    this.shape = shape;
    console.log("Creating NEW icon:", color, shape);
  }

  draw(x, y) {
    console.log(`Drawing ${this.color} ${this.shape} at (${x}, ${y})`);
  }
}

class MarkerIconFactory {
  constructor() {
    this.cache = new Map();
  }

  getIcon(color, shape) {
    const key = `${color}_${shape}`;

    if (!this.cache.has(key)) {
      this.cache.set(key, new MarkerIcon(color, shape));
    }

    return this.cache.get(key);
  }
}

class Marker {
  constructor(x, y, icon) {
    this.x = x;
    this.y = y;
    this.icon = icon; // shared flyweight
  }

  draw() {
    this.icon.draw(this.x, this.y);
  }
}

const factory2 = new MarkerIconFactory();

const markers = [];

// Create 10,000 markers but only 3 icons
const data = [
  { x: 10, y: 20, color: "red", shape: "circle" },
  { x: 15, y: 25, color: "red", shape: "circle" },
  { x: 30, y: 40, color: "blue", shape: "square" },
  { x: 50, y: 60, color: "red", shape: "circle" },
  { x: 70, y: 80, color: "blue", shape: "square" },
  { x: 90, y: 100, color: "green", shape: "triangle" },
];

for (let d of data) {
  const icon = factory2.getIcon(d.color, d.shape);
  markers.push(new Marker(d.x, d.y, icon));
}

// Draw all
markers.forEach((m) => m.draw());

// Drawing red circle at (10, 20)
// Drawing red circle at (15, 25)
// Drawing blue square at (30, 40)
// Drawing red circle at (50, 60)
// Drawing blue square at (70, 80)
// Drawing green triangle at (90, 100)
