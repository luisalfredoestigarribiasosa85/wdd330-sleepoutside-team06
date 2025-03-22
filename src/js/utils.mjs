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
  if(callback) {
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
  const headerContainer = document.getElementById("header-container");
  const footerContainer = document.getElementById("footer-container");
  renderWithTemplate(header, headerContainer);
  renderWithTemplate(footer,footerContainer);
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