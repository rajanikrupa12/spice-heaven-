// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Remove product from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Display cart items
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const totalCountElement = document.getElementById('total-count');
  let total = 0;

  // Retrieve cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.innerHTML = '';

  // Handle empty cart
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty!</p>';
    totalPriceElement.textContent = '0';
    totalCountElement.textContent = '0';
    return;
  }

  // Render each item in the cart
  cart.forEach((product, index) => {
    total += product.price;

    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      </div>
      <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(item);
  });

  // Update total price and count
  totalPriceElement.textContent = total;
  totalCountElement.textContent = cart.length;
}

// Update cart count in navbar
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-counter');
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// Checkout functionality
document.getElementById('checkout-button')?.addEventListener('click', () => {
  const address = document.getElementById('address').value.trim();

  if (!address) {
    alert('Please enter your delivery address!');
    return;
  }

  alert(`Thank you for your purchase! Items will be delivered to: ${address}`);
  localStorage.removeItem('cart');
  cart = [];
  updateCartCount();
  displayCart();
});

// Initialize cart count and display on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (window.location.pathname.includes('cart.html')) {
    displayCart();
  }
});