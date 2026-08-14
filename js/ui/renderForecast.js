import { el } from "./domHelpers.js";
import { VS_CURRENCY } from "../config.js";

const forecastRow = document.getElementById("forecast-row");

/**
 * On prend les 5 derniers points (un par jour) de manière simple.
 */
export function renderForecast(marketData) {
  forecastRow.innerHTML = "";
  const prices = marketData.prices || [];
  if (prices.length === 0) return;

  // Extraire un point par jour: prendre environ une valeur par 24h
  const step = Math.max(1, Math.floor(prices.length / 5));
  const days = [];
  for (let i = 0; i < prices.length && days.length < 5; i += step) {
    days.push(prices[i]);
  }

  days.forEach(([ts, price]) => {
    const date = new Date(ts);
    const label = date.toLocaleDateString(undefined, { weekday: "short" });
    forecastRow.append(
      el("div", { class: "fc-day" }, [
        el("div", { class: "d" }, [label]),
        el("div", { class: "t" }, [
          `${Math.round(price)} ${VS_CURRENCY.toUpperCase()}`,
        ]),
      ]),
    );
  });
}
