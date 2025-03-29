import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import {
  updateCartQuantity,
  loadHeaderFooter,
  delay,
  getParam,
  generateBreadcrumbs
} from "./utils.mjs";
import Alert from "./Alert.js";
const alertSystem = new Alert("/json/alerts.json");
alertSystem.renderAlerts();

loadHeaderFooter();
document.addEventListener("DOMContentLoaded", generateBreadcrumbs);
const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();
delay(500).then(() => updateCartQuantity());
