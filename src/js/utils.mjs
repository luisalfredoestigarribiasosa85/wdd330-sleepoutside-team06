import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

//week3 function
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("../partials/header.html");
  const footer = await loadTemplate("../partials/footer.html");
  const breadcrumb = await loadTemplate("../partials/breadcrumbs.html")
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");
  const breadcrumbContainer = document.querySelector(".breadcrumbs");
  renderWithTemplate(header, headerContainer);
  renderWithTemplate(footer, footerContainer);
  renderWithTemplate(breadcrumb, breadcrumbContainer);
}

export async function generateBreadcrumbs() {
  const breadcrumbs = document.querySelector(".breadcrumbs");
  if (!breadcrumbs) return;

  const path = window.location.pathname;
  let breadcrumbHTML = "";

  if (path.includes("product_listing")) {
    const category = getParam("category");

    try {
      const products = await services.getData(category);
      breadcrumbHTML = `${category} -> (${products.length} items)`;
    } catch (error) {
      console.error("Error:", error);
      breadcrumbHTML = `${category} -> (0 items)`;
    }
  } else if (path.includes("product_pages")) {
    const productId = getParam("product");

    try {
      const product = await services.findProductById(productId);
      breadcrumbHTML = product ? `${product.Category}` : "Product Category";
    } catch (error) {
      console.error("Error:", error);
      breadcrumbHTML = "Product Category";
    }
  } else if (path.includes("cart")) {
    breadcrumbHTML = "Cart";
  } else if (path.includes("checkout")) {
    breadcrumbHTML = "Checkout";
  }


  breadcrumbs.innerHTML = breadcrumbHTML;
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function updateCartQuantity() {
  let cartProducts = getLocalStorage("so-cart") || [];
  let totalQuantity = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    let item = cartProducts[i];
    let quantity = item.quantity || 1;
    totalQuantity = totalQuantity + quantity;
  }

  const quantityBadge = document.getElementById("cart-quantity");
  if (totalQuantity > 0) {
    quantityBadge.innerHTML = totalQuantity;
    quantityBadge.style.display = "flex";
  } else {
    quantityBadge.style.display = "none";
  }
}

export function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}