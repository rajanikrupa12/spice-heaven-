// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} has been added to the cart!`);
  updateCartCount();
}

function updateCartCount() {
  const cartCounter = document.getElementById('cart-counter');
  cartCounter.textContent = cart.length;
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
