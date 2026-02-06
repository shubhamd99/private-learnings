// The Template Method is a behavioural design pattern that defines the skeleton of an algorithm in a method,
// deferring some steps to subclasses.

//  This pattern allows subclasses to redefine certain steps of an algorithm without
// changing the algorithm's structure

// It promotes code reuse and ensures that the core algorithm remains consistent
// while allowing flexibility in the specific steps of the process.

// Abstract class
class DataProcessor {
  process() {
    this.readData();
    this.processData();
    this.writeData();
  }
  readData() {
    throw new Error("readData() must be implemented");
  }
  processData() {
    throw new Error("processData() must be implemented");
  }
  writeData() {
    throw new Error("writeData() must be implemented");
  }
}

// Concrete class
class CsvDataProcessor extends DataProcessor {
  readData() {
    console.log("Reading data from CSV file");
    this.data = "name,age\nJohn,30\nJane,25";
  }
  processData() {
    console.log("Processing CSV data");
    this.data = this.data.split("\n").map((row) => row.split(","));
  }
  writeData() {
    console.log("Writing data to CSV file");
    console.log(this.data);
  }
}

// Client
const csvProcessor = new CsvDataProcessor();
csvProcessor.process();
// [ [ 'name', 'age' ], [ 'John', '30' ], [ 'Jane', '25' ] ]

// In this implementation, the DataProcessor abstract class defines the process method
// which acts as the template method outlining the steps of the algorithm: reading data, processing data, and writing data

// The CsvDataProcessor concrete class implements these abstract methods to provide specific behaviour for handling CSV data

// Abstract class
class Game {
  play() {
    this.initialize();
    this.startPlay();
    this.endPlay();
  }
  initialize() {
    throw new Error("initialize() must be implemented");
  }
  startPlay() {
    throw new Error("startPlay() must be implemented");
  }
  endPlay() {
    throw new Error("endPlay() must be implemented");
  }
}

// Concrete class for Soccer
class Soccer extends Game {
  initialize() {
    console.log("Soccer Game Initialized. Start playing.");
  }
  startPlay() {
    console.log("Soccer Game Started. Enjoy the game!");
  }
  endPlay() {
    console.log("Soccer Game Finished!");
  }
}

// Concrete class for Basketball
class Basketball extends Game {
  initialize() {
    console.log("Basketball Game Initialized. Start playing.");
  }
  startPlay() {
    console.log("Basketball Game Started. Enjoy the game!");
  }
  endPlay() {
    console.log("Basketball Game Finished!");
  }
}

// Client
const soccer = new Soccer();
soccer.play();

const basketball = new Basketball();
basketball.play();

// Soccer Game Initialized. Start playing.
// Soccer Game Started. Enjoy the game!
// Soccer Game Finished!
// Basketball Game Initialized. Start playing.
// Basketball Game Started. Enjoy the game!
// Basketball Game Finished!

// This demonstrates how the Template Method pattern can be used to structure the workflow of different games
// while maintaining a consistent overall process.
