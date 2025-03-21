import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartQuantity, loadHeaderFooter } from "./utils.mjs";

updateCartQuantity();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);
loadHeaderFooter();

listing.init();
