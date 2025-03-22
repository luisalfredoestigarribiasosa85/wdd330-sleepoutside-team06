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

  document.querySelectorAll(".card__remove").forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.getAttribute("id");
      let items = JSON.parse(localStorage.getItem("so-cart")) || [];
      const newCart = items.filter((item) => item.Id !== itemId);
      localStorage.setItem("so-cart", JSON.stringify(newCart));
      renderCartContents();
      calculateTotalPrice();
      delay(500).then(() => updateCartQuantity());
    });
  });
}

// Total Cart Price
function calculateTotalPrice() {
  let cartProducts = getLocalStorage("so-cart") || [];
  let totalAmount = cartProducts.reduce(
    (sum, product) => sum + (product.FinalPrice || 0),
    0,
  );

  const price = document.getElementById("total-price");
  if (price) {
    price.innerHTML = `<span class="total-price">$${totalAmount.toFixed(2)}</span>`;
  }
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
  </li>`;
  return newItem;
}

loadHeaderFooter();
renderCartContents();
calculateTotalPrice();
delay(500).then(() => updateCartQuantity());
