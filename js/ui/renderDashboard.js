import { el, toBarPercent } from "./domHelpers.js";
import { VS_CURRENCY } from "../config.js";

const dashboardContent = document.getElementById("dashboard-content");
const loader = document.getElementById("loader");
const errorBox = document.getElementById("error-box");
const errorMessage = document.getElementById("error-message");

export function showLoader() {
  loader.style.display = "block";
  errorBox.style.display = "none";
  dashboardContent.style.display = "none";
}

export function showError(message) {
  loader.style.display = "none";
  dashboardContent.style.display = "none";
  errorBox.style.display = "block";
  errorMessage.textContent = message || "⚠️ Impossible de charger les données.";
}

/**
 * Cette fonction donne des informations basiques sur la crypto
 */
export function renderDashboard(coin) {
  loader.style.display = "none";
  errorBox.style.display = "none";
  dashboardContent.style.display = "block";

  const nameEl = document.getElementById("hero-city-name");
  const dateEl = document.getElementById("hero-date");
  const icon = document.getElementById("hero-icon");
  const tempEl = document.getElementById("hero-temp");
  const descEl = document.getElementById("hero-desc");

  nameEl.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;
  dateEl.textContent = `Dernière MAJ: ${new Date(coin.last_updated).toLocaleString()}`;
  icon.src = coin.image?.large || coin.image?.thumb || "";
  icon.alt = coin.name;

  const price = coin.market_data?.current_price?.[VS_CURRENCY] ?? 0;
  tempEl.textContent = `${Math.round(price)} ${VS_CURRENCY.toUpperCase()}`;

  const change24 = coin.market_data?.price_change_percentage_24h;
  descEl.textContent = `Variation 24h: ${change24 ? change24.toFixed(2) + "%" : "N/A"}`;

  document.getElementById("stat-humidity").textContent =
    `${coin.market_data?.market_cap?.[VS_CURRENCY] ? Math.round(coin.market_data.market_cap[VS_CURRENCY]).toLocaleString() : "—"}`;
  document.getElementById("stat-wind").textContent =
    `${coin.market_data?.total_volume?.[VS_CURRENCY] ? Math.round(coin.market_data.total_volume[VS_CURRENCY]).toLocaleString() : "—"}`;
  document.getElementById("stat-sunrise").textContent =
    `High 24h: ${coin.market_data?.high_24h?.[VS_CURRENCY] ? Math.round(coin.market_data.high_24h[VS_CURRENCY]) + " " + VS_CURRENCY.toUpperCase() : "—"}`;
  document.getElementById("stat-sunset").textContent =
    `Low 24h: ${coin.market_data?.low_24h?.[VS_CURRENCY] ? Math.round(coin.market_data.low_24h[VS_CURRENCY]) + " " + VS_CURRENCY.toUpperCase() : "—"}`;

  document.getElementById("widget-pressure").innerHTML =
    `${coin.market_data?.market_cap?.[VS_CURRENCY] ? Math.round(coin.market_data.market_cap[VS_CURRENCY]).toLocaleString() : "—"} <span>${VS_CURRENCY.toUpperCase()}</span>`;
  const marketCap = coin.market_data?.market_cap?.[VS_CURRENCY] ?? 0;
  document.getElementById("pressure-bar").style.width =
    `${toBarPercent(marketCap, 0, marketCap || 1)}%`;

  document.getElementById("widget-visibility").innerHTML =
    `${coin.market_data?.total_volume?.[VS_CURRENCY] ? Math.round(coin.market_data.total_volume[VS_CURRENCY]).toLocaleString() : "—"} <span>${VS_CURRENCY.toUpperCase()}</span>`;
  const volume = coin.market_data?.total_volume?.[VS_CURRENCY] ?? 0;
  document.getElementById("visibility-bar").style.width =
    `${toBarPercent(volume, 0, volume || 1)}%`;

  document.getElementById("side-sync").innerHTML =
    `API CoinGecko<br>Dernière synchro: ${new Date().toLocaleTimeString()}`;
}
