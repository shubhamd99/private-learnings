// Mock Product Data
const products = [
  { id: 1, name: "Wireless Headphones", price: 199.99, image: "🎧" },
  { id: 2, name: "Smart Watch", price: 299.99, image: "⌚" },
  { id: 3, name: "Mechanical Keyboard", price: 149.99, image: "⌨️" },
  { id: 4, name: "Gaming Mouse", price: 79.99, image: "🖱️" },
  { id: 5, name: "4K Monitor", price: 399.99, image: "🖥️" },
  { id: 6, name: "Webcam 1080p", price: 59.99, image: "📷" },
];

// App State (Hydrated from localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Element References
const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");

// --- Initialization ---
function init() {
  renderProducts();
  updateCartUI(); // Renders initial cart state from localStorage
  setupEventListeners();
}

// --- Render Products ---
function renderProducts() {
  productListEl.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
    `,
    )
    .join("");
}

// --- Core UI Updater (Syncs DOM with JS State) ---
function updateCartUI() {
  // 1. Persist state
  localStorage.setItem("cart", JSON.stringify(cart));

  // 2. Perform Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = subtotal > 0 ? subtotal * 0.1 : 0; // Flat 10% discount if cart isn't empty
  const total = subtotal - discount;

  // 3. Update Text Content
  cartCountEl.textContent = totalItems;
  subtotalEl.textContent = subtotal.toFixed(2);
  discountEl.textContent = discount.toFixed(2);
  totalEl.textContent = total.toFixed(2);

  // 4. Render Cart Items
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
  } else {
    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                </div>
            </div>
        `,
      )
      .join("");
  }
}

// --- Event Delegation (Crucial for Interviews) ---
// We attach ONE listener to the parent containers instead of looping and adding many.
function setupEventListeners() {
  // 1. Add to Cart Logic (Product List)
  productListEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    }
  });

  // 2. Quantity Controls (Cart items)
  cartItemsEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("qty-btn")) {
      const id = parseInt(e.target.dataset.id);
      if (e.target.classList.contains("plus")) {
        updateQuantity(id, 1);
      } else if (e.target.classList.contains("minus")) {
        updateQuantity(id, -1);
      }
    }
  });
}

// --- State Mutators ---
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

function updateQuantity(id, change) {
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += change;

    // Remove item entirely if quantity reaches 0
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
  }
  updateCartUI();
}

// Bootstrap application
init();
