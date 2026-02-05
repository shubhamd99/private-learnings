// Partial <Type>
// It takes an existing type and makes all of its properties optional (?).
// Use When you are updating a subset of an object
// or creating a "draft" version of data where fields might be missing

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

type ProductDraft = Partial<Product>;

// Function to update product in database
// We use Partial<Product> because we might only want to update the price
function updateProduct(id: string, changes: Partial<Product>) {
  console.log(`Updating ${id} with:`, changes);
}

// Usage
updateProduct("prod_1", { price: 29.99 }); // Valid (only updating price)
updateProduct("prod_1", { name: "New Name", description: "Better version" }); // Valid

// Required <Type>
// It takes an existing type and makes all of its properties required (removes ?)
// When you want to ensure an object is "complete" after a process

interface AppConfig {
  theme?: "dark" | "light"; // User doesn't HAVE to specify this
  retries?: number; // User doesn't HAVE to specify this
}

type RequiredAppConfig = Required<AppConfig>;

// The default values ensure everything is filled
const defaults: Required<AppConfig> = {
  theme: "light",
  retries: 3,
};

function initializeApp(userConfig: AppConfig) {
  // We merge defaults with user input
  // The result is GUARANTEED to have all fields filled
  const finalConfig: Required<AppConfig> = {
    ...defaults,
    ...userConfig,
  };

  // TypeScript knows 'retries' is a number, NOT 'number | undefined'
  console.log("Retries set to:", finalConfig.retries);
}
