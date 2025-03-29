import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts} from "./utils.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
}

export function packageItems(items) {
    const listOfItems = items.map ((item) => {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity
        };
    });
    return listOfItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateOrderTotal();
    }
  
    calculateOrderTotal() {
      this.itemTotal = calculateTotalPrice();
      this.tax = parseFloat(this.itemTotal) * 0.06;
      const products = getLocalStorage(this.key) || [];
      const totalQuantity = products.reduce((sum,product) => sum + (product.quantity || 0), 0);
      if (totalQuantity == 1) {
        this.shipping = 10;
      } else if (totalQuantity > 1) {
        this.shipping = 10 + (totalQuantity - 1) * 2;
      }


      this.orderTotal = parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping);
  
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const tax = document.querySelector(`${this.outputSelector} #tax`);
      const shipping = document.querySelector(`${this.outputSelector} #shipping`);
      const subTotal = document.querySelector(`${this.outputSelector} #subtotal`);
      const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);


      shipping.innerText = `Shipping: $${this.shipping.toFixed(2)}`;
      orderTotal.innerText = `Total: $${this.orderTotal.toFixed(2)}`;
      subTotal.innerText = `SubTotal: $${this.itemTotal}`;
      tax.innerText = `Tax: $${this.tax.toFixed(2)}`;
    }

    async checkout() {
        const formData = document.forms["checkoutForm"];
        const order = formDataToJSON(formData);

        order.orderDate = new Date().toISOString();
        order.items = packageItems(this.list);
        order.orderTotal = this.orderTotal.toFixed(2);
        order.shipping = this.shipping;
        order.tax = this.tax.toFixed(2);

        try {
            await services.checkout(order);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");
        } catch (err) {
            removeAllAlerts();
            for (let message in err.message) {
              alertMessage(err.message[message]);
            }
            console.log(err);
        }
    }
  }  

function calculateTotalPrice() {
    let cartProducts = getLocalStorage("so-cart") || [];
    let totalAmount = cartProducts.reduce(
      (sum, product) => sum + (product.FinalPrice * product.quantity || 0),
      0,
    );
    return totalAmount.toFixed(2);
}