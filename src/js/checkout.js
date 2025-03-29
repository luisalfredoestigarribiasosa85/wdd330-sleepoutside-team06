import { updateCartQuantity, loadHeaderFooter, delay, generateBreadcrumbs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", "#summary");
checkout.init();

document.querySelector("#orderSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.querySelector("#checkoutForm");
  if (!form.checkValidity()) {
    alert("Please fill in all required fields.");
    form.reportValidity();
    return;
  }
  checkout.checkout();
});

loadHeaderFooter();
document.addEventListener("DOMContentLoaded", generateBreadcrumbs);
delay(500).then(() => updateCartQuantity());
