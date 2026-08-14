import { fetchCoin, fetchMarketChart } from "./api.js";
import { state } from "./state.js";
import { addToHistory, getHistory } from "./history.js";
import {
  showLoader,
  showError,
  renderDashboard,
} from "./ui/renderDashboard.js";
import { renderForecast } from "./ui/renderForecast.js";
import { el } from "./ui/domHelpers.js";

const searchInput = document.getElementById("search-input");
const historyTagsContainer = document.getElementById("history-tags");
const retryBtn = document.getElementById("retry-btn");

/**
 * Affiche les tags d'historique (5 dernières villes)
 */
function renderHistoryTags() {
  historyTagsContainer.innerHTML = "";
  const history = getHistory();

  if (history.length === 0) {
    historyTagsContainer.append(
      el("span", { class: "tag current" }, [state.currentCity]),
    );
    return;
  }

  history.forEach((city) => {
    const isCurrent = city.toLowerCase() === state.currentCity.toLowerCase();
    const tag = el("button", { class: `tag${isCurrent ? " current" : ""}` }, [
      city,
    ]);
    tag.addEventListener("click", () => loadCity(city));
    historyTagsContainer.append(tag);
  });
}

/**
 * Charge les données d'une crypto et les cours (market chart)
 * Utilisation de Promise.all pour fetchCoin et fetchMarketChart
 */
async function loadCity(city) {
  showLoader();
  const coinId = city.trim().toLowerCase();

  try {
    const [coin, market] = await Promise.all([
      fetchCoin(coinId),
      fetchMarketChart(coinId, 5),
    ]);

    state.currentCity = coin.id;
    state.weather = coin;
    state.forecast = market;

    addToHistory(coin.id);
    renderHistoryTags();
    renderDashboard(coin);
    renderForecast(market);
  } catch (err) {
    console.error(err);
    if (err.message === "COIN_NOT_FOUND") {
      showError(`⚠️ Crypto "${city}" introuvable sur CoinGecko.`);
    } else {
      showError("⚠️ Impossible de charger les données. Vérifie ta connexion.");
    }
  }
}

/**
 * Evénement déclenché lors de la rechercche d'une ville
 */
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && searchInput.value.trim() !== "") {
    loadCity(searchInput.value.trim());
    searchInput.value = "";
  }
});

retryBtn.addEventListener("click", () => loadCity(state.currentCity));

renderHistoryTags();
loadCity(state.currentCity);
