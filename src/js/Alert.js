export default class Alert {
  constructor(alertsUrl) {
    this.alertsUrl = alertsUrl;
  }

  async fetchAlerts() {
    try {
      const response = await fetch(this.alertsUrl);
      if (!response.ok) throw new Error("Failed to load alerts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching alerts:", error);
      return [];
    }
  }

  async renderAlerts() {
    const alerts = await this.fetchAlerts();
    if (alerts.length === 0) return;

    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    alerts.forEach((alert) => {
      const alertElement = document.createElement("p");
      alertElement.textContent = alert.message;
      alertElement.style.backgroundColor = alert.background;
      alertElement.style.color = alert.color;
      alertElement.style.padding = "10px";
      alertElement.style.borderRadius = "5px";
      alertElement.style.marginBottom = "5px";
      alertElement.style.textAlign = "center";

      alertSection.appendChild(alertElement);
    });

    document.body.prepend(alertSection);
  }
}
