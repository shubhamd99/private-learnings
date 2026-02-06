// pipe and compose are functional programming patterns
// used to perform function composition

// The main difference between them is the direction in which the functions are executed.
// pipe: left to right
// compose: right to left

// Composition:
// Composition is the mathematical concept where the output of one function
// becomes the input of the next
// In JavaScript, compose executes functions from right-to-left (or bottom-to-top).

// It mimics the mathematical notation $f(g(x))$.
// common use - Functional libraries (Ramda, Lodash/fp)

const add5 = (x) => x + 5;
const multiplyBy2 = (x) => x * 2;

// manual way:
// Hard to read as it grows:
const result = add5(multiplyBy2(10)); // (10 * 2) + 5 = 25

// The Compose Helper:
// A common implementation using reduceRight:

// reduceRight - it applies the function from right to left
const compose =
  (...fns) =>
  (initialValue) =>
    fns.reduceRight((acc, fn) => fn(acc), initialValue);

const result2 = compose(add5, multiplyBy2)(10); // 25

// Pipe
// Pipe does exactly the same thing as compose, but it executes from left-to-right
// This is often considered more readable for developers because it follows the natural way
// we read English and how data "flows" through a factory line.
// It mimics the mathematical notation x to g to f

/**
 * Executes functions from left-to-right.
 * Each function takes the output of the previous one.
 */
const pipe =
  (...fns) =>
  (initialValue) =>
    fns.reduce((acc, fn) => fn(acc), initialValue);

const result3 = pipe(multiplyBy2, add5)(10); // (10 * 2) + 5 = 25

// Common use - Data processing pipelines

// Why use them?
// Using these patterns makes your code declarative and point-free
// (meaning you don't have to explicitly declare the intermediate variables
// or arguments).

// Imagine you need to take a string, trim it, lowercase it, and add a hashtag.

const input = "  Gemini  ";
const trimmed = input.trim();
const lowered = trimmed.toLowerCase();
const final = `#${lowered}`;

// With Pipe (Declarative):
const trim = (str) => str.trim();
const lower = (str) => str.toLowerCase();
const hashtag = (str) => `#${str}`;

const prepareTag = pipe(trim, lower, hashtag);

prepareTag("  Gemini  "); // "#gemini"
