import { renderListWithTemplate } from "./utils.mjs";

function getDiscountDetails(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  let discountPercentage = 0;
  let discountBadge = "";

  if(isDiscounted) {
    const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
    discountPercentage = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);
    discountBadge = `<span class="discount-badge">${discountPercentage}% Discount</span>`;
  }

  return {isDiscounted, discountPercentage, discountBadge};
}

function productCardTemplate(product) {
  const { discountBadge } = getDiscountDetails(product);

  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
        ${discountBadge}
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}