import { COINGECKO_BASE, VS_CURRENCY } from "./config.js";

// Récupère les détails d'une crypto (nom, image, prix courant, market data)
export async function fetchCoin(coinId) {
  const url = `${COINGECKO_BASE}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) throw new Error("COIN_NOT_FOUND");
    throw new Error(`CoinGecko API error: ${res.status}`);
  }
  return res.json();
}

// Récupère le marché (prix historique) pour les derniers jours
export async function fetchMarketChart(coinId, days = 5) {
  const url = `${COINGECKO_BASE}/coins/${coinId}/market_chart?vs_currency=${VS_CURRENCY}&days=${days}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CoinGecko API error: ${res.status}`);
  return res.json();
}
