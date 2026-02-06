// Javascript is an object-based programming language in which except for few primitive types everything is an object.

// Objects in Javascript are not class based like in other programming languages.
// They are quite independent and they don't have any restrictions on the names of the new properties and methods or on the values.

// Basically, Objects in Javascript are a box of properties which are mutable,
// where properties are represented by key-value pair.
// Key can be any string including the empty string
// and value can be of any type available in Javascript
// except it cannot be undefined that means it is mandatory to assign a value to the key.

// With the introduction of ES6, there are various new capabilities added to the Objects.
// Dates
// Regular Expressions
// Maths
// Arrays
// Functions
// Objects
// Booleans (When called as constructor with new keyword.)
// Strings (When called as constructor with new keyword.)
// Numbers (When called as constructor with new keyword.)

// https://learnersbucket.com/tutorials/es6/object-literals/

let obj = {};
obj.name = "Prashant";
obj["age"] = 24;

let obj2 = {
  name: "Prashant",
  age: 24,
};

let obj3 = {
  name: "Prashant",
  age: 24,
  details: {
    hobbies: ["Cycling", "Writing", "Teaching"],
    Gender: "Male",
  },
};

let obj4 = {
  name: "Prashant",
  getName: function () {
    return this.name;
  },
};
console.log(obj4.getName());

// By creating instance of the object using new keyword.
let obj5 = new Object();
obj5.name = "Prashant";
obj5.age = 24;
obj5.getDetails = function () {
  return `${this.name} is ${this.age} years old`;
};
console.log(obj5.getDetails());

// By creating a constructor
// In Javascript, we can create a function which can be used as a constructor to create new objects.
function Obj(name, age) {
  // Properties
  this.name = name;
  this.age = age;

  // Methods
  this.getDetails = function () {
    return `${this.name} is ${this.age} years old`;
  };
}

let person = new Obj("Prashant", 22);
console.log(person.getDetails());
//"Prashant is 24 years old"

let person2 = new Obj("Sachin", 23);
console.log(person2.getDetails());
//"Sachin is 23 years old"

// Retrieving the property which does not exist inside the obj will return undefined.
let obj6 = {
  first_name: "Prashant",
};
console.log(obj6.first_name);
//"Prashant"
console.log(obj6.last_name);
//undefined

// Copying an object in javascript
// If we want to do a shallow copy of an object then we can use Object.assign(To, From) method which copies one object to other.
// In shallow copy, the nested objects are still passed as a reference to the new objec
let obj7 = {
  name: "Prashant",
  age: 24,
  details: {
    gender: "Male",
  },
};

let copy = Object.assign({}, obj7);
console.log(copy.name);
//"Prashant"
console.log(copy.age);
//24
console.log(copy.details.gender);
//"Male"
//Update the gender
obj7.details.gender = "Female";
console.log(copy.details.gender);
//"Female"

// We can use JSON.parse() and JSON.stringify() together to create a deep copy of an object.
let copy2 = JSON.parse(JSON.stringify(obj7));
obj7.details.gender = "Male";
console.log(copy2);

// Extending objects with prototype
// Every object in Javascript is linked to a prototype object from which it can inherit properties and methods.
// Prototype object comes standard with Javascript and is available with every object that is created with object literals.

// While accessing the value from the object if the property is not present then it will look into its prototype object
// and if it is not present here then it will look into its prototype until it bottoms out.
// If the property is not present in prototype linkage then it will return undefined.
// This process of looking into the prototype chain is called Delegation.

// We can use the for...in loop to iterate through each property of the given object.

let obj8 = {
  name: "Prashant",
  age: 24,
  getDetails: function () {
    return `${this.name} is ${this.age} years old`;
  },
};

for (let key in obj8) {
  console.log(obj8[key]);
}

console.log(obj8.hasOwnProperty("age"));

//For each loop
Object.keys(obj8).forEach((key) => {
  if (typeof obj8[key] !== "function") {
    console.log(obj8[key]);
  }
});
