// The Function.prototype.call() function is a built-in method in JavaScript
// that allows you to call a function with a specified this value and a set of arguments,
// passed individuall

/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
  return this.bind(thisArg)(...argArray);
};

Function.prototype.myApply = function (thisArg, argArray = []) {
  return this.bind(thisArg)(...argArray);
};

Function.prototype.myBind = function (thisArg, ...argArray) {
  return (...newArgs) => this.apply(thisArg, [...argArray, ...newArgs]);
};

// Or you can also pass the argArray into bind() before executing it.

Function.prototype.myCall2 = function (thisArg, ...argArray) {
  return this.bind(thisArg, ...argArray)();
};

Function.prototype.myApply2 = function (thisArg, argArray = []) {
  return this.bind(thisArg, ...argArray)();
};

Function.prototype.myCall3 = function (thisArg, ...argArray) {
  return this.apply(thisArg, argArray);
};

function multiplyAge(multiplier = 1) {
  return this.age * multiplier;
}

const mary = {
  age: 21,
};

const john = {
  age: 42,
};

multiplyAge.myCall(mary); // 21
multiplyAge.myCall(john, 2); // 84

// ---------------- APPLY POLYFILL COMPLEX ----------------

Function.prototype.myApply = function (thisArg, argArray = []) {
  // handle null / undefined
  thisArg = thisArg ?? globalThis;

  // create unique temporary key
  const fnSymbol = Symbol();

  // attach function to object
  thisArg[fnSymbol] = this;

  // execute function
  const result = thisArg[fnSymbol](...argArray);

  // cleanup
  delete thisArg[fnSymbol];

  return result;
};
