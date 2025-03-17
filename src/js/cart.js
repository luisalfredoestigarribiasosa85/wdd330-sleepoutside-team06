import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // fixed this task "Empty Card Error: cart.html" on trello adding "|| []" to cartItems so the error in the console is fixed
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

// Total Cart Price
function calculateTotalPrice() {
  let cartProducts = getLocalStorage("so-cart") || [];
  let totalAmount = cartProducts.reduce((sum, product) => {
    return sum + (product.FinalPrice || 0);
  }, 0);

  const price = document.getElementById("total-price");
  price.innerHTML = `<span class="total-price">$${totalAmount.toFixed(2)}</span>`;
}

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function updateCartQuantity() {
  let cartProducts = getLocalStorage("so-cart") || [];
  let totalQuantity = cartProducts.reduce((sum, item) => sum +(item.quantity || 1), 0);

  const quantityBadge = document.getElementById("cart-quantity");
  if (totalQuantity > 0) {
    quantityBadge.textContent = totalQuantity;
    quantityBadge.style.display = "flex";
  } else {
    quantityBadge.style.display = "none";
  }
}

calculateTotalPrice();
renderCartContents();
updateCartQuantity();
