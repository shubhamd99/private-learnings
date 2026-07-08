// The "Key Constraint" Pattern (keyof)
// You want a function that extracts a value from an object,
// but you want to guarantee that the key actually exists on that object.

// T is the Object
// K is a Key of T (extends keyof T)
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: "Alice",
  isAdmin: true,
};

// VALID: "name" is a key of 'user'. Return type is string.
const userName = getProperty(user, "name");

// VALID: "isAdmin" is a key of 'user'. Return type is boolean.
const userRole = getProperty(user, "isAdmin");

// ERROR: Argument of type '"age"' is not assignable to parameter of type '"id" | "name" | "isAdmin"'.
// getProperty(user, "age");

// ------------------------------------------------------------------------------

// The "API Response Wrapper" Pattern
// Your backend returns a standard envelope (status, error, data),
// but the data shape changes for every endpoint (Users, Products, Orders).

// 1. The Generic Envelope
interface ApiResponse<Data> {
  status: "success" | "error";
  code: number;
  timestamp: Date;
  data: Data; // This changes dynamically
  error?: string;
}

// 2. Specific Data Models
interface User {
  id: number;
  name: string;
}
interface Product {
  sku: string;
  price: number;
}

// 3. Simulating API Calls
function fetchUser(): ApiResponse<User> {
  return {
    status: "success",
    code: 200,
    timestamp: new Date(),
    data: { id: 1, name: "Alice" }, // Must match User
  };
}

function fetchProduct(): ApiResponse<Product> {
  return {
    status: "success",
    code: 200,
    timestamp: new Date(),
    data: { sku: "X-99", price: 19.99 }, // Must match Product
  };
}

// ------------------------------------------------------------------------------

// The "Generic Class"
// If You need a Queue data structure. If you write it with any,
// you might accidentally push a string and pop a number, causing a crash

class Queue<T> {
  private data: T[] = [];

  push(item: T): void {
    this.data.push(item);
  }

  pop(): T | undefined {
    return this.data.shift();
  }
}

// Usage 1: A Number Queue
const numberQueue = new Queue<number>();
numberQueue.push(10);
numberQueue.push(20);
// numberQueue.push("Hello"); // ERROR: Argument of type 'string' is not assignable to 'number'

// Usage 2: A String Queue
const stringQueue = new Queue<string>();
stringQueue.push("First");
stringQueue.push("Second");

const item = stringQueue.pop(); // TypeScript knows 'item' is string | undefined

// ------------------------------------------------------------------------------

// Advanced: Utility Types with Generics (Mapped Types)
// You want to create a type that transforms another type
// For example, creating a type that makes all properties of an object boolean
// (often used for validation flags).

interface Settings {
  darkMode: boolean;
  fontSize: number;
  username: string;
}

// A generic that takes a Type (T) and converts ALL its values to boolean
type Booleanify<T> = {
  [K in keyof T]: boolean;
};

// Result: { darkMode: boolean; fontSize: boolean; username: boolean; }
const settingsFlags: Booleanify<Settings> = {
  darkMode: true,
  fontSize: false, // originally number, now boolean
  username: true, // originally string, now boolean
};

// Const Generic
function first<const T>(arr: T[]) {
  return arr[0];
}

// with const T the return type will be: const num: 1 | 2 | 3
// without const T the return type will be: number
const num = first([1, 2, 3]);
