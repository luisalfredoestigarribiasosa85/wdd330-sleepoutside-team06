import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartQuantity, loadHeaderFooter, delay } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();

loadHeaderFooter();
delay(500).then(() => updateCartQuantity());
