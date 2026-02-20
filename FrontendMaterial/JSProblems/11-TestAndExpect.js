// This question was asked in Meta’s frontend interview where they asked to write a function
// to implement Test() and expect() as in Jest.

// Input:
// test('learnersbucket is a great platform', () => {
//   expect('system-design').toBe('system-design'); // true
//   expect('system-design').not.toBe('machine-coding'); // true
// });

// Output:
// "Pass learnersbucket is a great platform"

// We can notice that there are two different methods that we have to create here.
//  1. test(title, callbackFn)
//  2. expect(value)

// Test function
// Test is the simple method to create, as it will take the title and
// the callback as arguments and invoke the callback,
// if callback does not throw error (which means all the expect method has passed)
// then it will print pass otherwise it will print failed.

// Expect function
// If you read the Jest  documentation, you will notice that there are many methods available,
// for the simplicity, we will just create the base structure and implement  couple of the methods

// Expect function returns a method or a property "not" which has all the expect methods available to it
// The not value is used for the denial check, which the normal method can be used assertion checks

// List of matcher methods
// Each hold logic of their own, the arguments to each function remain constant
// You can define the arguments in the order you like
const matchers = {
  toBe: function (expected, actual, matcherProperties) {
    const { isNot } = matcherProperties;

    if (isNot) {
      if (expected === actual) {
        throw new Error("Should not match");
      }
    } else {
      if (expected !== actual) {
        throw new Error("Should match");
      }
    }
  },
  toBeUndefined: function (expected, actual, matcherProperties) {
    const { isNot } = matcherProperties;

    if (isNot) {
      if (actual === undefined) {
        throw new Error("Should not match");
      }
    } else {
      if (actual !== undefined) {
        throw new Error("Should match");
      }
    }
  },
};

// A helper function that accepts the actual value, the matcherFn and the negation value
// and forms a closure and invokes the matcher function when actual value is received
const helperMatcher = (actual, matcherFn, isNot = false) => {
  return function (expected) {
    matcherFn(expected, actual, { isNot });
  };
};

// The assertion function
const expect = function (actual) {
  // This holds the matcherFns for expected and not expected values
  const expectation = {
    not: {},
  };

  // iterate over all the matcher methods and create an expected and not expected version of each
  for (let key in matchers) {
    const matcherFn = matchers[key];
    expectation[key] = helperMatcher(actual, matcherFn, false);
    expectation.not[key] = helperMatcher(actual, matcherFn, true);
  }

  return expectation;
};

// Test function to describe the tests
// the callback function accepts the expect functions
const test = async (title, callback) => {
  try {
    await callback();
    console.log(`Pass ${title}`);
  } catch (error) {
    console.error(`Fail ${title}`);
    console.error(error);
  }
};

// We have made this an async function as you can use it to test promises later.

// Test case 1

test("To be undefined", () => {
  expect(undefined).toBeUndefined();
});
// "Pass To be undefined"

test("To not be undefined", () => {
  expect(undefined).not.toBeUndefined();
});
// "Fail To not be undefined"

test("To not be undefined", () => {
  expect(1).not.toBeUndefined();
});
// "Pass To not be undefined"

// Test case 2

test("Learnersbucket is the best platform", () => {
  expect("system-design").toBe("system-design");
  expect("system-design").not.toBe("machine-coding");
});
// "Pass Learnersbucket is the best platform"

test("Learnersbucket is the best platform", () => {
  expect("system-design").not.toBe("system-design");
});
// "Fail Learnersbucket is the best platform"
