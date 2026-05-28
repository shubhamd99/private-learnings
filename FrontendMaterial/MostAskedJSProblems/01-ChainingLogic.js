// To make chaining logic of function like: calculator().add(4).subtract(3).multiply(3);
// It can be achieved by returning this from every methods of object

// Builder pattern is a design pattern that allows for the step-by-step construction of complex objects.
// It provides a way to create objects with a clear and fluent interface, often using method chaining
// to set properties or perform operations on the object being built.

class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(num) {
    this.value += num;
    return this; // Return the instance to allow chaining
  }

  subtract(num) {
    this.value -= num;
    return this; // Return the instance to allow chaining
  }

  multiply(num) {
    this.value *= num;
    return this; // Return the instance to allow chaining
  }

  divide(num) {
    this.value /= num;
    return this; // Return the instance to allow chaining
  }

  result() {
    return this.value; // Return the final result
  }
}

// Example usage:
const calculator = new Calculator();
const finalResult = calculator
  .add(4) // 0 + 4 = 4
  .subtract(3) // 4 - 3 = 1
  .multiply(3) // 1 * 3 = 3
  .divide(2) // 3 / 2 = 1.5
  .result();
console.log(finalResult); // Output: 1.5
