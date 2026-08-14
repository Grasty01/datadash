import { state, persistHistory } from "./state.js";

const MAX_HISTORY = 5;

/**
 * Cette fonction ajoute une ville en tête d'historique
 */
export function addToHistory(city) {
  const normalized = city.trim();
  if (!normalized) return;

  state.searchHistory = [
    normalized,
    ...state.searchHistory.filter(
      (c) => c.toLowerCase() !== normalized.toLowerCase(),
    ),
  ].slice(0, MAX_HISTORY);

  persistHistory();
}

export function getHistory() {
  return state.searchHistory;
}
