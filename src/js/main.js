import { updateCartQuantity, loadHeaderFooter, delay, generateBreadcrumbs } from "./utils.mjs";

loadHeaderFooter();
document.addEventListener("DOMContentLoaded", generateBreadcrumbs);
delay(500).then(() => updateCartQuantity());
