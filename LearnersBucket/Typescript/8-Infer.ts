// infer as a pattern matching tool.
// It allows you to go inside a complex type (like a Function, Array, or Promise)
// and extract a specific part of it into a new variable

// The syntax always follows this pattern:
// T extends SomeStructure<infer X> ? X : Fallback
// It means: "Does type T match this structure?
// If yes, grab the inner part, call it X, and return it."

// infer can ONLY be used in the extends clause of a conditional type.
// it acts like a variable declaration for types (let U = innerType).
//If the pattern doesn't match (the false branch of the conditional), the inferred variable cannot be used.

// Unpacking an Array
// The Utility Type
// "If T is an array of (infer U), return U. Otherwise return T."
type Unpack<T> = T extends (infer U)[] ? U : T;

// Usage
type Strings = string[];
type Item = Unpack<Strings>;
// Result: string

type Numbers = number[];
type Num = Unpack<Numbers>;
// Result: number

// Getting a Function's Return Type

// The Utility Type
// "If T is a function returning (infer R), give me R."
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// A function
function createConfig() {
  return { mode: "dark", version: 2 };
}

// We extract the shape automatically
type Config = MyReturnType<typeof createConfig>;
// Result: { mode: string; version: number }

// Advanced: Extracting Function Arguments

// "If T is a function with at least 2 args, infer the 2nd one (Arg2)"
type SecondArgument<T> = T extends (
  a: any,
  b: infer Arg2,
  ...rest: any[]
) => any
  ? Arg2
  : never;

function updateUser(id: number, data: { name: string }, force: boolean) {
  // ...
}

type DataType = SecondArgument<typeof updateUser>;
// Result: { name: string }

// Advanced: Unwrapping a Promise

type Unpromise<T> = T extends Promise<infer U> ? U : T;

type ApiResult = Promise<{ id: number }>;

type ActualData = Unpromise<ApiResult>;
// Result: { id: number }
