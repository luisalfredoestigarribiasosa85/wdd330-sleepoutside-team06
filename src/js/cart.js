import {
  getLocalStorage,
  updateCartQuantity,
  loadHeaderFooter,
  delay,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // fixed this task "Empty Card Error: cart.html" on trello adding "|| []" to cartItems so the error in the console is fixed
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  calculateTotalPrice();
  delay(500).then(() => updateCartQuantity());
  removeFromCart();
  displayCheckoutButton();
}

// Total Cart Price
function calculateTotalPrice() {
  let cartProducts = getLocalStorage("so-cart") || [];
  let totalAmount = cartProducts.reduce(
    (sum, product) => sum + (product.FinalPrice * product.quantity || 0),
    0,
  );
  const price = document.getElementById("total-price");
  if (price) {
    price.innerHTML = `<span class="total-price">$${totalAmount.toFixed(2)}</span>`;
  }
}

// Remove from cart
function removeFromCart() {
  document.querySelectorAll(".card__remove").forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.getAttribute("id");
      let items = JSON.parse(localStorage.getItem("so-cart")) || [];
      const newCart = items.filter((item) => item.Id !== itemId);
      localStorage.setItem("so-cart", JSON.stringify(newCart));
      renderCartContents();
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a class="cart-card__image" href="/product_pages/?product=${item.Id}">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}">
  </a>
  <a href="/product_pages/?product=${item.Id}">
    <h2 class="card__name">${item.NameWithoutBrand}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <span id="${item.Id}" class="card__remove">X</span>
  <p class="product-card__price">$${item.FinalPrice}</p>
  <p>Qtd: ${item.quantity}</p>
  </li>`;
  return newItem;
}

// Display the Checkout button
function displayCheckoutButton() {
  const products = getLocalStorage("so-cart") || [];
  const totalQuantity = products.reduce(
    (sum, product) => sum + (product.quantity || 0),
    0,
  );

  const buttonContainer = document.querySelector(".button-container");

  if (totalQuantity > 0) {
    if (!buttonContainer) {
      const newButtonContainer = document.createElement("div");
      newButtonContainer.classList.add("button-container");

      const checkoutButton = document.createElement("a");
      checkoutButton.id = "checkoutButton";
      checkoutButton.href = "../checkout/index.html";
      checkoutButton.textContent = "To checkout";

      newButtonContainer.appendChild(checkoutButton);

      const totalContainer = document.querySelector(".total-container");
      totalContainer.appendChild(newButtonContainer);
    }
  } else {
    if (buttonContainer) {
      buttonContainer.remove();
    }
  }
}

loadHeaderFooter();
renderCartContents();
