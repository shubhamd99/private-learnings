// What is prototype in JavaScript?
// Objects in JavaScript are very special, they can be created directly without having a Class defined
// and the objects have a special property called prototype available to them that holds the reference
// to the parent that has created it.

// If you are declaring an object directly then the prototype
// will point to the default properties that are available on an object in JavaScript.

let obj = {};

console.log(obj);

// If the object is an instance derived from a constructor then its prototype
// will point to the prototype property of the constructor class.

class Robot {
  constructor(name) {
    this.name = name;
  }

  fire() {
    return "phew phew";
  }
}

console.log(Robot);

const robo1 = new Robot("RoboCop");

console.log(robo1);

// The instance object also holds a special property called __proto__ that points to the prototype of the constructor.
console.log(robo1.__proto__);

// What is prototype chain in JavaScript?
// When you try to access the methods or properties on the object,
// the object checks if that instance is available on it or not,
// if it is not available it will look for the same in the prototype.

// This is called a prototype chain where the derived object keeps looking for the properties in its prototype,
// this really helps in creating a single instance of the property on the constructor
// making it available to all the derived instances of it.

// For example, we will first create two instances of the Robot class
// and then add a new method called a report that will mark the attendance of the Robots.

class Robot2 {
  constructor(name) {
    this.name = name;
  }

  fire() {
    return "phew phew";
  }
}

const robo2 = new Robot2("RoboCop");
const robo22 = new Robot2("AutoBot");

Robot2.prototype.report = function () {
  console.log(`${this.name} reporting sir!`);
};

// In the prototype, the new method was shared among all the instances,
// we were able to access the name of each object individually,
// which means that even though method is shared the preference for this is given to the nearest scope.

Robot.prototype.name = "abc";

robo2.report();
// RoboCop reporting sir!

robo22.report();
// AutoBot reporting sir!

// Even if we have added the property name to the prototype,
// the methods accessing the property value from its nearest scope.
// If we remove the name property from the constructor then it will access it from the prototype chain.

//  constructor(name){
//     // this.name = name;
//   }
// robo1.report();
// //abc reporting sir!

// robo2.report();
// //abc reporting sir!

// Prototype design pattern in JavaScript
// We can make use of the prototype and form a pattern to remove the need to define the same method repeatedly
// rather create one on the prototype and share it with all the instances.

// For example, in this, we have a Class that extends another Class and
// we have added a property on the prototype of the first class,
// still when we try to access that property report it looks for it in the chain and invokes it.

class Transform extends Robot2 {
  constructor(name, nature) {
    super(name);
    this.nature = nature;
  }

  getNature() {
    console.log(`I am ${this.nature}`);
  }
}

const trans = new Transform("RoboCop", "good");
const trans2 = new Transform("AutoBot", "evil");

trans.report();
//RoboCop reporting sir!

trans2.report();
//AutoBot reporting sir!

// This is how the prototype chain works. While looking for the properties,
// they are first searched in the current instance, then the prototype chain of the parent and grandparent, and so on.

// The prototype design pattern in JavaScript really helps to define the methods once and
// then make it available in all of its instances, for example,
// we can define a method on the Array prototype making it available in all its instances.

Array.prototype.append = function (str) {
  return this.map((e) => `${str} ${e}`);
};

const arr = [1, 2, 3, 4, 5];

console.log(arr.append("Hello"));
// Array(5) [ "Hello 1", "Hello 2", "Hello 3", "Hello 4", "Hello 5" ]
