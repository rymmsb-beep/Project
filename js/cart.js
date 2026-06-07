const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

// 🔥 always get fresh cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// 💾 save cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 🔥 update counter (correct quantity sum)
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = count;
}

// 🛒 render cart
function renderCart() {

  const cart = getCart();

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty 🛒</h2>
      </div>
    `;
    cartTotal.textContent = "0 €";
    updateCartCount();
    return;
  }

  cart.forEach(item => {

    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">

        <img src="${item.img}" alt="${item.name}">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>Quantity: ${item.quantity}</p>

          <div class="cart-price">
            ${item.price} €
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${item.id})">
          Remove
        </button>

      </div>
    `;
  });

  cartTotal.textContent = total.toFixed(2) + " €";

  updateCartCount();
}

// ❌ remove item
function removeItem(id) {

  let cart = getCart();

  cart = cart.filter(item => item.id !== id);

  saveCart(cart);

  renderCart();
}

// ➕ add to cart
function addToCart(product) {

  let cart = getCart();

  let existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);

  renderCart();
}

// init
renderCart();