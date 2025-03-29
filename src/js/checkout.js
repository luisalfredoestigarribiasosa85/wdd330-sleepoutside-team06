import { updateCartQuantity, loadHeaderFooter, delay } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";


const checkout = new CheckoutProcess("so-cart", "#summary");
checkout.init();

document.querySelector("#orderSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    
    checkout.checkout();
});

loadHeaderFooter();
delay(500).then(() => updateCartQuantity());