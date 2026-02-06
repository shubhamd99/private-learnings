// The Decorator design pattern is a structural pattern that allows behaviour to be added to individual objects
// dynamically, without affecting the behaviour of other objects from the same class.

// Decorator pattern is used in frontend to build request pipelines like logging, retry, caching, auth, and
// error handling around fetch/axios without modifying the core client.

// This is achieved by creating a set of decorator classes that are used to wrap concrete components.
// The key components of this pattern are the Component, ConcreteComponent, Decorator, and ConcreteDecorator.

// Component: Declares the interface for objects that can have responsibilities added to them dynamically.

// ConcreteComponent: Defines an object to which additional responsibilities can be attached.

// Decorator: Maintains a reference to a Component object and defines an interface
// that conforms to the Component's interface.

// ConcreteDecorator: Adds responsibilities to the component.

// Each decorator calls the previous object first, then adds its own behavior.
// Why this is powerful:
// You can stack behaviors
// Order is dynamic
// No subclass explosion
// Each decorator adds ONE feature

// In this basic example, we will create a simple notification system where we can
// decorate a message with various types of notifications like email and SMS.

// Component
class Notification {
  send(message) {
    console.log(`Sending notification: ${message}`);
  }
}

// Concrete Component
class BasicNotification extends Notification {
  send(message) {
    super.send(message);
  }
}

// Decorator
class NotificationDecorator extends Notification {
  constructor(notification) {
    super();
    this.notification = notification;
  }
  send(message) {
    this.notification.send(message);
  }
}

// Concrete Decorators
class EmailNotification extends NotificationDecorator {
  send(message) {
    super.send(message);
    console.log(`Sending email with message: ${message}`);
  }
}

class SMSNotification extends NotificationDecorator {
  send(message) {
    super.send(message);
    console.log(`Sending SMS with message: ${message}`);
  }
}

// Client Code

let notification = new BasicNotification();
notification = new EmailNotification(notification);
notification = new SMSNotification(notification);
notification.send("Hello, this is your notification!");

// Each decorator wraps the previous object and calls its send() inside its own send().
// SMSNotification
//    ↓ wraps
// EmailNotification
//    ↓ wraps
// BasicNotification

// SMSNotification.send()
//  └─> EmailNotification.send()
//       └─> BasicNotification.send()
//            └─> Notification.send()

// Sending notification: Hello, this is your notification!
// Sending email with message: Hello, this is your notification!
// Sending SMS with message: Hello, this is your notification!

// SMSNotification(EmailNotification(BasicNotification))

// REAL uses of Decorator in frontend
// Wrapping fetch with:
// Logging
// Retry
// Caching
// Auth headers
// Error handling
// WITHOUT changing the original fetch logic
// This is exactly how Axios interceptors, middleware, etc. work internally.

// Base Component (Core Fetch Client)

// Component
class HttpClient {
  async get(url) {
    throw new Error("Not implemented");
  }
}

// Concrete Component
class FetchClient extends HttpClient {
  async get(url) {
    console.log("🌐 Fetching from network:", url);

    // Fake API call simulation
    await new Promise((r) => setTimeout(r, 300));

    // Simulate random failure
    if (Math.random() < 0.5) {
      throw new Error("Network error");
    }

    return { url, data: "Server data for " + url };
  }
}

// Decorator Base Class
class HttpClientDecorator extends HttpClient {
  constructor(client) {
    super();
    this.client = client;
  }

  async get(url) {
    return this.client.get(url);
  }
}

// Logging Decorator
class LoggingDecorator extends HttpClientDecorator {
  async get(url) {
    console.log("📝 [LOG] Request:", url);

    const result = await this.client.get(url);

    console.log("✅ [LOG] Response:", result);

    return result;
  }
}

// Retry Decorator
class RetryDecorator extends HttpClientDecorator {
  constructor(client, retries = 3) {
    super(client);
    this.retries = retries;
  }

  async get(url) {
    let attempt = 0;

    while (true) {
      try {
        return await this.client.get(url);
      } catch (err) {
        attempt++;
        console.log(`🔁 Retry ${attempt}/${this.retries} for ${url}`);

        if (attempt >= this.retries) {
          console.log("❌ All retries failed");
          throw err;
        }
      }
    }
  }
}

class CacheDecorator extends HttpClientDecorator {
  constructor(client) {
    super(client);
    this.cache = new Map();
  }

  async get(url) {
    if (this.cache.has(url)) {
      console.log("⚡ Cache hit for:", url);
      return this.cache.get(url);
    }

    const result = await this.client.get(url);
    this.cache.set(url, result);

    return result;
  }
}

(async () => {
  let api = new FetchClient();

  // Wrap with decorators
  api = new LoggingDecorator(api);
  api = new RetryDecorator(api, 3);
  api = new CacheDecorator(api);

  try {
    console.log("\n--- First call ---");
    const res1 = await api.get("/users");
    console.log("Result:", res1);

    console.log("\n--- Second call (should hit cache) ---");
    const res2 = await api.get("/users");
    console.log("Result:", res2);
  } catch (err) {
    console.error("Final error:", err.message);
  }
})();

// CacheDecorator
//   → RetryDecorator
//      → LoggingDecorator
//         → FetchClient

// Cache → Retry → Log → Fetch

// Without Decorator, You’d have:
// fetchWithRetryAndCacheAndLoggingAndAuthAndTimeout(...)
// Disaster.

// No, multiple awaits here do NOT make it slower in a meaningful way.
// What await really does
// await does NOT block CPU. It:
// Pauses the current function
// Lets JS event loop run other things
// Resumes when promise resolves
// Only ONE real slow operation exists - await fetch(...)

// Builder is used to construct complex objects step-by-step,
// while Decorator is used to dynamically add behavior to objects without changing their class.
