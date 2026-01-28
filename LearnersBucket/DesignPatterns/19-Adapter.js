// The Adapter design pattern is a structural design pattern that allows objects
// with incompatible interfaces to work together

// The adapter acts as a bridge between the incompatible interfaces,
// converting the interface of a class into another interface that the client expects.

// This pattern is especially useful when you want to use an existing class
// but its interface does not match the one you need.

// Perfect — Adapter is extremely common in frontend, especially when:
// Backend API shape ≠ UI needs
// 3rd-party SDK shape ≠ your app architecture
// Legacy code ≠ new architecture
// Core idea: Convert external / incompatible data or API into your app’s expected shape.

// The key components of this pattern are the Target, the Adapter, the Adaptee, and the Client.

// Target: Defines the domain-specific interface that the Client uses.
// Adapter: Implements the Target interface and translates the requests to the Adaptee's interface.
// Adaptee: Defines an existing interface that needs adapting.
// Client: Collaborates with objects that conform to the Target interface.

// Let's implement a simple example where we have a payment gateway that expects payments in a certain format,
// but we need to use an existing payment system that provides a different interface.

// Target interface
class PaymentGateway {
  makePayment(amount) {
    throw new Error("This method should be overridden!");
  }
}

// Adaptee class
class OldPaymentSystem {
  processPayment(amount) {
    console.log(
      `Processing payment of ${amount} through the old payment system.`,
    );
  }
}

// Adapter class
class PaymentAdapter extends PaymentGateway {
  constructor(oldPaymentSystem) {
    super();
    this.oldPaymentSystem = oldPaymentSystem;
  }

  makePayment(amount) {
    this.oldPaymentSystem.processPayment(amount);
  }
}

// Client code
const oldPaymentSystem = new OldPaymentSystem();
const paymentAdapter = new PaymentAdapter(oldPaymentSystem);
paymentAdapter.makePayment(100);

// The PaymentAdapter class extends PaymentGateway and
// adapts the OldPaymentSystem to the PaymentGateway interface by translating the makePayment call
// to processPayment.

// REAL WORLD EXAMPLE: Backend API → UI Model Adapter

// Backend API Response (Uncontrollable)

// From backend
const apiResponse = {
  user_id: 123,
  user_name: "Shubham",
  profile_pic_url: "https://img.com/pic.png",
  is_active: 1,
  created_at: "2025-01-10T10:20:30Z",
};

// But your UI / Store expects:
// {
//   id: number,
//   name: string,
//   avatar: string,
//   isActive: boolean,
//   createdAt: Date
// }

class UserAdapter {
  static fromApi(apiUser) {
    return {
      id: apiUser.user_id,
      name: apiUser.user_name,
      avatar: apiUser.profile_pic_url,
      isActive: Boolean(apiUser.is_active),
      createdAt: new Date(apiUser.created_at),
    };
  }
}

const user = UserAdapter.fromApi(apiResponse);

console.log(user);
// {
//   id: 123,
//   name: 'Shubham',
//   avatar: 'https://img.com/pic.png',
//   isActive: true,
//   createdAt: 2025-01-10T10:20:30.000Z
// }

// REAL WORLD EXAMPLE: Normalizing Multiple APIs
class UserNormalizer {
  static fromApiA(data) {
    return { id: data.id, name: data.name };
  }

  static fromApiB(data) {
    return { id: data.userId, name: data.fullName };
  }
}

// REAL WORLD EXAMPLE: Backend API Response (Ugly, Legacy, Nested)

const apiResponseUgly = {
  user_id: 123,
  full_name: "Shubham Dhage",
  is_active: 1,
  profile: {
    avatar_url: "https://img.com/a.png",
    phone_no: "9999999999",
  },
  roles: [{ role_code: "ADMIN" }, { role_code: "SELLER" }],
  address: {
    line_1: "Street 1",
    city_name: "Pune",
    pin_code: "411001",
  },
  created_at: "2025-01-10T10:20:30Z",
  internal_flags: {
    is_test_user: false,
  },
};

class UserAdapter2 {
  // ==========================
  // API → UI
  // ==========================

  static toUI(apiUser) {
    return {
      id: apiUser.user_id,
      name: apiUser.full_name,
      isActive: Boolean(apiUser.is_active),

      avatar: apiUser.profile?.avatar_url ?? null,
      phone: apiUser.profile?.phone_no ?? null,

      roles: apiUser.roles.map((r) => r.role_code),

      address: {
        line1: apiUser.address.line_1,
        city: apiUser.address.city_name,
        pincode: apiUser.address.pin_code,
      },

      createdAt: new Date(apiUser.created_at),

      // Derived / computed field
      isAdmin: apiUser.roles.some((r) => r.role_code === "ADMIN"),
    };
  }

  // ==========================
  // UI → API (For Save / Update)
  // ==========================
  static toApi(uiUser) {
    return {
      user_id: uiUser.id,
      full_name: uiUser.name,
      is_active: uiUser.isActive ? 1 : 0,

      profile: {
        avatar_url: uiUser.avatar,
        phone_no: uiUser.phone,
      },

      roles: uiUser.roles.map((r) => ({ role_code: r })),

      address: {
        line_1: uiUser.address.line1,
        city_name: uiUser.address.city,
        pin_code: uiUser.address.pincode,
      },

      created_at: uiUser.createdAt.toISOString(),

      // Backend-required but UI doesn't care
      internal_flags: {
        is_test_user: false,
      },
    };
  }
}

const uiUser = UserAdapter2.toUI(apiResponseUgly);

console.log(uiUser);
/*
{
  id: 123,
  name: "Shubham Dhage",
  isActive: true,
  avatar: "...",
  phone: "999...",
  roles: ["ADMIN", "SELLER"],
  address: { line1, city, pincode },
  createdAt: Date,
  isAdmin: true
}
*/
