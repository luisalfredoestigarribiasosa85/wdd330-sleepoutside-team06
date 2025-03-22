import { updateCartQuantity, loadHeaderFooter, delay } from "./utils.mjs";

loadHeaderFooter();
delay(500).then(() => updateCartQuantity());
