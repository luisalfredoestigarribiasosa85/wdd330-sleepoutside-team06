export default class ProductDetails {
    constructor(category) {
      this.category = category;
      this.path = `../json/${this.category}.json`;
    }

    init(){

    }
}

export function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

export function renderProductDetails() {

}