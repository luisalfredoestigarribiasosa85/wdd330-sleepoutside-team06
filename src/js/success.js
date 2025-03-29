import { updateCartQuantity, loadHeaderFooter, delay } from "./utils.mjs";

export function countdown() {
  let countdownElement = document.getElementById("countdown");
  let countdownValue = 10;

  const countdownInterval = setInterval(() => {
    countdownValue--;
    countdownElement.textContent = countdownValue;

    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      window.location.href = "../index.html";
    }
  }, 1000);
}

countdown();
loadHeaderFooter();
delay(500).then(() => updateCartQuantity());
