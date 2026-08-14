import { DEFAULT_CITY } from './config.js';

const HISTORY_STORAGE_KEY = 'datadash_history';

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Historique corrompu dans le localStorage, réinitialisation.', err);
    return [];
  }
}

export const state = {
  currentCity: DEFAULT_CITY,
  weather: null,
  forecast: null,
  searchHistory: loadHistory(),
};

export function persistHistory() {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.searchHistory));
}
