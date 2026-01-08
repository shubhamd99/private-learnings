// A proxy acts as an intermediary between the client and the real object.
// Instead of accessing the real object directly, you access it through a proxy.

// Proxy is the concept of doing things via an intermediatory,
// for example, if you want to change something in the original source,
// you hand your changes to your proxy which can do all sorts of validations on it to make sure only legit things are passed
// and then it forwards to the original source.

// Proxy Pattern is used for access control (security), caching, lazy loading, logging/monitoring,
// validation, rate limiting, remote object access, immutability, reactivity (state tracking like Vue),
// and wrapping old APIs without changing existing code.

// Proxy design pattern works similarly in JavaScript
// and it is majorly used with objects, you can use it with other data types as well.

// But as the majority of things in JavaScript are objects they can be passed as a reference
// there is a higher chance that they can be mutated unknowingly creating bugs.

// To solve this and add additional constraints JavaScript has introduced a proxy object
// that provides us the flexibility to create a proxy for another object.

// It takes two parameters as input:
// Target - The target object that needs to proxied.
// Handler - An object that defines the methods that need to be intercepted. Handlers have many different methods such as get, set.

const person = {
  name: "prashant",
  age: 28,
  gender: "male",
};

// const proxiedPerson = new Proxy(person, {
//   get() {
//     // intercept get
//   },
//   set() {
//     // intercept get
//   },
// });

// Explicit: Stated directly, plainly, and fully, with no ambiguity.
// Implicit: Suggested or understood through context, tone, or body language, rather than explicit words; it's hinted at.

// Now, if you do the implicit or explicit update or access of object properties it will be intercepted,
// irrespective if you use the dot operator proxiedPerson.name or the square brackets proxiedPerson["name"].

const proxiedPerson = new Proxy(person, {
  get(obj, prop) {
    console.log(`${obj[prop]} is the value of the property ${prop}`);
    return obj[prop];
  },
  set(obj, prop, value) {
    // intercept get
    console.log(
      `The value of the ${prop} is about to change from ${obj[prop]} to ${value}`
    );
    obj[prop] = value;
  },
});

console.log(proxiedPerson.name);
// "prashant is the value of the property name"
// "prashant"

proxiedPerson.age = 29;
// "The value of the age is about to change from 28 to 29"

// Implement proxy design pattern in JavaScript
// As JavaScript is a loosely typed language and the types are not defined,
// values in the objects can be updated to any type that can create bugs.
// Implementing a proxy design pattern makes sure that we have an interceptor in place that observes
// the changes that are being made to the original object.
// For example, if we want to add the validations to the object properties that their types cannot be changed
// or they should be within a certain range we can add those validations in the proxy

const proxiedPerson2 = new Proxy(person, {
  // We have added the restriction to the gender, making it write only, when it is accessed we are showing a message and returning undefined.
  get(obj, prop) {
    if (prop === "gender") {
      console.log("Gender is a write only property be exposed!");
    } else {
      return obj[prop];
    }
  },
  // Similarly, for the age we have added a check that its value should be within a range
  // otherwise we are showing a message and not updating the property's value.
  set(obj, prop, value) {
    if (prop === "age") {
      if (value < 18 || value > 50) {
        console.log("Age value should be between 18 and 50");
      } else {
        obj[prop] = value;
      }
    } else {
      obj[prop] = value;
    }
  },
});

console.log(proxiedPerson2.gender);
// "Gender is a write only property be exposed!"
// undefined

proxiedPerson2.age = 17;
// "Age value should be between 18 and 50"

console.log(proxiedPerson2.age);
// 28

console.log("-----------------------------------------------------------");

// Using Reflect in Proxy in JavaScript
// If you notice in the above example we are using square objects to update
// and access the object property value in the get() and set() methods.
// While this works fine, proxies are often used with the Reflect
// which is an inbuilt object that we can use to get and set the property values

const proxiedPerson3 = new Proxy(person, {
  get(obj, prop) {
    if (prop === "gender") {
      console.log("Gender is a write only property be exposed!");
    } else {
      return Reflect.get(obj, prop);
    }
  },
  set(obj, prop, value) {
    if (prop === "age") {
      if (value < 18 || value > 50) {
        console.log("Age value should be between 18 and 50");
      } else {
        Reflect.set(obj, prop, value);
      }
    } else {
      Reflect.set(obj, prop, value);
    }
  },
});

console.log(proxiedPerson3.gender);
// "Gender is a write only property be exposed!"
// undefined

proxiedPerson3.age = 17;
// "Age value should be between 18 and 50"

console.log(proxiedPerson3.age);
// 28

// Performance implications of Proxy design pattern
// Even though proxies are very efficient in controlling the behavior of the object
// and can be used for many use cases such as intercepting, monitoring, alerting, etc.
// Overusing them can drastically hamper the performance of the application, thus they should be used in cognizance.
