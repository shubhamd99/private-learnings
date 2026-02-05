// Record is a utility type used to define an object where keys are of a
// specific type (usually string or a Union of strings) and
// values are of a specific type. It creates a clean, uniform map.

// A Simple Dictionary

// Keys = string, Values = string
const colorHexMap: Record<string, string> = {
  red: "#FF0000",
  blue: "#0000FF",
  green: "#008000",
};

// You can add any new color because keys are just generic 'strings'
colorHexMap.purple = "#800080";

// Enforcing Specific Keys (Strict Dictionary)

type UserRole = "admin" | "editor" | "guest";

interface RoleConfig {
  canDelete: boolean;
  canEdit: boolean;
}

// We MUST define a config for 'admin', 'editor', AND 'guest'.
// If we miss one, TS throws an error.
const permissions: Record<UserRole, RoleConfig> = {
  admin: { canDelete: true, canEdit: true },
  editor: { canDelete: false, canEdit: true },
  guest: { canDelete: false, canEdit: false },
};

// Index Signatures (The Manual Way)
// Before Record existed, or when you need more flexibility within an interface,
// you used "Index Signatures". It looks like [key: type]: valueType.

interface UserProfile {
  // 1. Known properties
  name: string;
  email: string;

  // 2. Index Signature (Dynamic properties)
  // Any other key must be a string, and its value must be a string
  [key: string]: string;
}

const user: UserProfile = {
  name: "John",
  email: "john@test.com",

  // Dynamic fields
  twitterHandle: "@johnny",
  discordId: "john#1234",
  bio: "Loves coding",
};

// Key = number (User ID), Value = string (User Name)
const userCache = new Map<number, string>();

userCache.set(1, "Alice");
userCache.set(2, "Bob");

console.log(userCache.get(1)); // "Alice"
console.log(userCache.has(99)); // false
