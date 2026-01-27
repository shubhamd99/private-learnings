// The Strategy design pattern is a behavioural design pattern that enables
// selecting an algorithm's behaviour at runtime

// The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable

// This pattern allows the algorithm to vary independently from the clients that use it.

// The key components of this pattern are the Strategy, the ConcreteStrategy, and the Context.

// Strategy: Declares an interface common to all supported algorithms.
// ConcreteStrategy: Implements the algorithm defined in the Strategy interface.
// Context: Maintains a reference to a Strategy object and delegates the algorithm's
// execution to the currently set Strategy.

// Let's implement a simple example where we have different strategies for calculating discounts

// Strategy interface
class DiscountStrategy {
  calculate(price) {
    throw new Error("This method should be overridden!");
  }
}

// Concrete strategies
class NoDiscount extends DiscountStrategy {
  calculate(price) {
    return price;
  }
}

class PercentageDiscount extends DiscountStrategy {
  constructor(percentage) {
    super(); // Calls the constructor of the parent class (DiscountStrategy).
    this.percentage = percentage;
  }
  calculate(price) {
    return price - (price * this.percentage) / 100;
  }
}

class FixedDiscount extends DiscountStrategy {
  constructor(discount) {
    super(); // Calls the constructor of the parent class (DiscountStrategy).
    this.discount = discount;
  }
  calculate(price) {
    return price - this.discount;
  }
}

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountStrategy = new NoDiscount();
  }

  setDiscountStrategy(discountStrategy) {
    this.discountStrategy = discountStrategy;
  }

  addItem(item, price) {
    this.items.push({ item, price });
  }

  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + this.discountStrategy.calculate(item.price);
    }, 0);
  }
}

// Client
const cart = new ShoppingCart();
cart.addItem("Shirt", 50);
cart.addItem("Pants", 100);
console.log("Total without discount:", cart.calculateTotal());
cart.setDiscountStrategy(new PercentageDiscount(10));
console.log("Total with 10% discount:", cart.calculateTotal());
cart.setDiscountStrategy(new FixedDiscount(15));
console.log("Total with $15 discount:", cart.calculateTotal());

// Total without discount: 150
// Total with 10% discount: 135
// Total with $15 discount: 120

// This demonstrates how the Strategy pattern allows dynamic selection of the discount calculation algorithm at runtime.

// REAL FRONTEND USE CASES
// Form Validation Strategy (based on field type)

// Instead of:
// if (type === "email") validateEmail();
// else if (type === "phone") validatePhone();
// else if (type === "password") validatePassword();

// Strategy way

// Strategy interface
class Validator {
  validate(value) {}
}

// Concrete strategies
class EmailValidator extends Validator {
  validate(value) {
    return value.includes("@");
  }
}

class PhoneValidator extends Validator {
  validate(value) {
    return value.length === 10;
  }
}

// Context
class InputField {
  constructor(validator) {
    this.validator = validator;
  }

  setValidator(validator) {
    this.validator = validator;
  }

  validate(value) {
    return this.validator.validate(value);
  }
}

// Usage
const field = new InputField(new EmailValidator());
console.log(field.validate("test@test.com")); // true

field.setValidator(new PhoneValidator());
console.log(field.validate("1234567890")); // true

// Barcode scanning usecase

class BarcodeStrategy {
  canHandle(barcode) {
    throw new Error("canHandle() must be implemented");
  }

  parse(barcode) {
    throw new Error("parse() must be implemented");
  }

  process(parsedData) {
    throw new Error("process() must be implemented");
  }
}

class NormalBarcodeStrategy extends BarcodeStrategy {
  canHandle(barcode) {
    return /^[0-9]+$/.test(barcode);
  }

  parse(barcode) {
    return {
      type: "normal",
      code: barcode,
    };
  }

  process(data) {
    console.log("Processing NORMAL barcode:", data.code);
    // 👉 normal lookup logic
  }
}

class AFormatBarcodeStrategy extends BarcodeStrategy {
  canHandle(barcode) {
    return barcode.startsWith("a_");
  }

  parse(barcode) {
    const [, code] = barcode.split("_");
    return {
      type: "A",
      code,
    };
  }

  process(data) {
    console.log("Processing A-FORMAT barcode:", data.code);
    // 👉 special logic for A format
  }
}

class BFormatBarcodeStrategy extends BarcodeStrategy {
  canHandle(barcode) {
    return barcode.startsWith("b_");
  }

  parse(barcode) {
    const [, id, itemCode] = barcode.split("_");
    return {
      type: "B",
      id,
      itemCode,
    };
  }

  process(data) {
    console.log(
      "Processing B-FORMAT barcode:",
      "id =",
      data.id,
      "itemCode =",
      data.itemCode,
    );
    // 👉 complex logic for B format
  }
}

class BarcodeHandler {
  constructor() {
    this.strategies = [
      new NormalBarcodeStrategy(),
      new AFormatBarcodeStrategy(),
      new BFormatBarcodeStrategy(),
    ];
  }

  handle(barcode) {
    const strategy = this.strategies.find((s) => s.canHandle(barcode));

    if (!strategy) {
      throw new Error("Unknown barcode format: " + barcode);
    }

    const parsedData = strategy.parse(barcode);
    strategy.process(parsedData);
  }
}

const handler = new BarcodeHandler();

handler.handle("12233");
handler.handle("a_12233");
handler.handle("b_12233_itemCode");

// Processing NORMAL barcode: 12233
// Processing A-FORMAT barcode: 12233
// Processing B-FORMAT barcode: id = 12233 itemCode = itemCode
