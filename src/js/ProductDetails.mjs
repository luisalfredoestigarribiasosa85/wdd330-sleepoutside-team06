import { setLocalStorage, updateCartQuantity, delay, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;
  const productImage = document.querySelector("#p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  document.querySelector("#p-price").textContent = `$${product.FinalPrice}`;
  document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
  document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#add-to-cart").dataset.id = product.Id;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById("add-to-cart").addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let cartProducts = getLocalStorage("so-cart") || [];
    cartProducts.push(this.product);
    setLocalStorage("so-cart", cartProducts);
    delay(500).then(() => updateCartQuantity());
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

delay(500).then(() => updateCartQuantity());