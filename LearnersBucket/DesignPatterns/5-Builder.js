// What is Builder design pattern?
// Builder design pattern which is part of the creational design pattern family is used for the step-by-step creation of the objects.

// A creational pattern is a software design pattern for creating objects in a manner suitable to a particular situation.
// Creational Design Patterns deal with object creation mechanisms and try to create objects in a flexible,
// controlled, and reusable way instead of using "new" directly everywhere.

// In object-oriented programming, when a new object is created from the constructor,
// you can either pass all the arguments or no arguments to the constructor.

// class Payment {
//   constructor(currency, amount) {
//     this.currency = currency;
//     this.amount = amount;
//   }
// }

// const a = new Payment();
// const b = new Payment("₹", 1000);

// While this suffices for many cases, oftentimes we want to build the object once it is created.
// In that case, we can make use of the builder design pattern.

// Implement Builder design pattern in JavaScript

// Builder design pattern helps to create the objects with only required values,
// for this, we can create a no-args constructor and
// then build the object step-by-step and then get the final result from it.

// For example, let's say you have a payment object, before making the final payment, we want to
// continuously add the amount. In that case, we can do the method chaining (alternative name for Builder
// design pattern) where we return the reference of the current object from the methods so that the
// methods of the same object can be used as required.

// Method chaining is an object-oriented paradigm, in which the methods usually share the same reference,
// which in JavaScript is done by sharing this (current context) from each method.

class Payment {
  constructor(currency = "₹", amount = 0) {
    this.currency = currency;
    this.amount = amount;
  }

  addAmount = function (val) {
    this.amount += val;

    // returning the reference of the same object
    return this;
  };

  pay = function () {
    console.log(`${this.currency} ${this.amount}`);
  };
}

const p1 = new Payment();

p1.addAmount(100).addAmount(200).addAmount(200).pay();
// "₹ 500"
