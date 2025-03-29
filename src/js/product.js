import { getParam, loadHeaderFooter, generateBreadcrumbs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();
document.addEventListener("DOMContentLoaded", generateBreadcrumbs);
const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
