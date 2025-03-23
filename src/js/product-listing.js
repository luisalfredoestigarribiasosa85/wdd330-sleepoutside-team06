import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {
  updateCartQuantity,
  loadHeaderFooter,
  delay,
  getParam,
} from "./utils.mjs";
import Alert from "./Alert.js";
const alertSystem = new Alert("/json/alerts.json");
alertSystem.renderAlerts();

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
delay(500).then(() => updateCartQuantity());
