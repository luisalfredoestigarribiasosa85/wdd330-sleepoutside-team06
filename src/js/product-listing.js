import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {
  updateCartQuantity,
  loadHeaderFooter,
  delay,
  getParam,
} from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
delay(500).then(() => updateCartQuantity());
