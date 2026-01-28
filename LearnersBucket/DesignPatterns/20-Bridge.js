// The Bridge design pattern is a structural design pattern that separates an abstraction from its
// implementation, allowing both to vary independently.
// This pattern involves an interface that acts as a bridge,
// making the functionality of concrete classes independent from interface implementers.

// The key components of this pattern are:
// Abstraction: Defines the abstraction's interface and maintains a reference to an object of type Implementor.
// Refined Abstraction: Extends the interface defined by Abstraction.
// Implementor: Defines the interface for implementation classes.
// ConcreteImplementor: Implements the Implementor interface and defines its concrete implementation.

// Let's implement a simple example to understand the Bridge pattern.
// We will create different shapes (abstraction) that can be drawn with different colors (implementation)

// Implementor interface
class Color {
  applyColor() {}
}

// ConcreteImplementors
class RedColor extends Color {
  applyColor() {
    console.log("Applying red color");
  }
}
class BlueColor extends Color {
  applyColor() {
    console.log("Applying blue color");
  }
}

// Abstraction
class Shape {
  constructor(color) {
    this.color = color;
  }
  draw() {}
}

// Refined Abstraction
class Circle extends Shape {
  draw() {
    console.log("Drawing Circle");
    this.color.applyColor();
  }
}
class Square extends Shape {
  draw() {
    console.log("Drawing Square");
    this.color.applyColor();
  }
}

// Client
const red = new RedColor();
const blue = new BlueColor();
const redCircle = new Circle(red);
const blueSquare = new Square(blue);
redCircle.draw();
blueSquare.draw();

// Drawing Circle
// Applying red color
// Drawing Square
// Applying blue color

// The Shape class acts as the abstraction, and it holds a reference to a Color object.
// This decouples the shape from the color, allowing both to vary independently.

// Let's create a more detailed implementation of the Bridge pattern by simulating a multimedia player
// that can play different types of media files (audio and video) on different operating systems (Windows and Mac).

// Implementor interface
class OS {
  playAudio() {}
  playVideo() {}
}

// ConcreteImplementors
class WindowsOS extends OS {
  playAudio() {
    console.log("Playing audio on Windows");
  }
  playVideo() {
    console.log("Playing video on Windows");
  }
}

class MacOS extends OS {
  playAudio() {
    console.log("Playing audio on MacOS");
  }
  playVideo() {
    console.log("Playing video on MacOS");
  }
}

// Abstraction
class MediaPlayer {
  constructor(os) {
    this.os = os;
  }
  play() {}
}

// Refined Abstraction
class AudioPlayer extends MediaPlayer {
  play() {
    console.log("Starting Audio Player");
    this.os.playAudio();
  }
}

class VideoPlayer extends MediaPlayer {
  play() {
    console.log("Starting Video Player");
    this.os.playVideo();
  }
}

// Client
const windowsOS = new WindowsOS();
const macOs = new MacOS();
const windowsAudioPlayer = new AudioPlayer(windowsOS);
const macVideoPlayer = new VideoPlayer(macOs);
windowsAudioPlayer.play();
macVideoPlayer.play();

// Starting Audio Player
// Playing audio on Windows
// Starting Video Player
// Playing video on MacOS

// This setup allows the media player functionality to vary independently from the operating system,
// demonstrating the flexibility and power of the Bridge design pattern.
