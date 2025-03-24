import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const tentDataSource = new ProductData("tents");
const testElement = document.querySelector(".product-list");
const tentListing = new ProductList("Tents", tentDataSource, testElement);

const packDataSource = new ProductData("backpacks");
const packElement = document.querySelector(".product-list");
const packListing = new ProductList("Backpacks", packDataSource, packElement);

const bagDataSource = new ProductData("sleepingBags");
const bagElement = document.querySelector(".product-list");
const bagListing = new ProductList("Sleeping Bags", bagDataSource, bagElement);

const hammockDataSource = new ProductData("hammocks");
const hammockElement = document.querySelector(".product-list");
const hammockListing = new ProductList("Hammocks", hammockDataSource, hammockElement);

tentListing.init();
packListing.init();
//bagListing.init();
//hammockListing.init();