// No external icon base required for CoinGecko (images fournis directement)

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === "class") {
      node.className = value;
    } else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    node.append(child instanceof Node ? child : document.createTextNode(child));
  });

  return node;
}

/**
 * Cette fonction arrondi la température, comme démandé
 */
export function formatTemp(value) {
  return Math.round(value);
}

/**
 * Cette fonction récupère le temps et le converti de sorte que le format
 * puisse correspondre celui des humains. Il prend 2 parametres et return l'heure au format: 19:05 par exemple
 */
export function formatTime(unixSeconds, timezoneOffsetSeconds) {
  const localMs = (unixSeconds + timezoneOffsetSeconds) * 1000;
  const date = new Date(localMs);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Permet de formater la date par rapport au format français - Ex: Vendredi 14 aout 2026
 */
export function formatToday(unixSeconds, timezoneOffsetSeconds) {
  const localMs = (unixSeconds + timezoneOffsetSeconds) * 1000;
  const date = new Date(localMs);
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
  return `Aujourd'hui, ${formatted}`;
}

/**
 * Formatage des jours de la semaine - Toujours par rapport au format français
 */
export function formatWeekday(unixSeconds) {
  const date = new Date(unixSeconds * 1000);
  const label = new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
  return label.charAt(0).toUpperCase() + label.slice(1).replace(".", "");
}

export function iconUrl(iconCodeOrUrl) {
  if (!iconCodeOrUrl) return "";
  if (typeof iconCodeOrUrl === "string" && iconCodeOrUrl.startsWith("http")) {
    return iconCodeOrUrl;
  }
  return "";
}

/**
 * La barre de progression
 */
export function toBarPercent(value, min, max) {
  const percent = ((value - min) / (max - min)) * 100;
  return Math.min(100, Math.max(0, Math.round(percent)));
}
