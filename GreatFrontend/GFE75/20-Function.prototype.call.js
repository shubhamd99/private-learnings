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

// Or you can also pass the argArray into bind() before executing it.

Function.prototype.myCall2 = function (thisArg, ...argArray) {
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
