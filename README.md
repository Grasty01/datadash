# DataDash

Dashboard météo interactif en Single Page Application (SPA) construit en JavaScript vanilla. L'application affiche la météo actuelle d'une ville, permet de rechercher n'importe quelle autre ville, et propose des prévisions sur 5 jours ainsi qu'un historique de recherche persistant.

Projet réalisé dans le cadre du module JS S10 — Akieni Academy.

## Aperçu

![Aperçu de DataDash](./screenshot.png)

## Fonctionnalités

### Fondamentaux
- Appel à l'API pour récupérer la météo actuelle d'une ville par défaut (Brazzaville)
- Layout dashboard en CSS Grid : température, description, humidité, icône fournie par l'API
- Indicateur de chargement et message d'erreur clair (ville introuvable, clé API invalide)

### Interactivité
- Moteur de recherche : taper une ville et appuyer sur Entrée met à jour tout le dashboard
- Formatage des données : températures arrondies (ex. 22,45 → 22°), heures UNIX converties en heures lisibles (ex. 18:00)

### Bonus
- Prévisions sur 5 jours à partir de l'endpoint `forecast` (tranches de 3h regroupées par jour, avec calcul du min/max)
- Historique des 5 dernières villes recherchées, sauvegardé en `localStorage` et affiché sous forme de tags cliquables

## Stack technique

- HTML5 / CSS3 (Grid, Flexbox)
- JavaScript (ES6+, vanilla, aucun framework)
- [OpenWeatherMap API](https://openweathermap.org/api) — nécessite une clé API gratuite

## Configuration

1. Crée un compte gratuit sur [openweathermap.org](https://openweathermap.org/)
2. Récupère ta clé API dans l'onglet "API keys" de ton compte
3. Renseigne-la dans `js/config.js` :

```js
export const OWM_API_KEY = "TA_CLE_ICI";
```

⚠️ Ne commite jamais ta vraie clé API sur un repo public. Ajoute `js/config.js` à ton `.gitignore` et fournis un `js/config.example.js` à la place.

Note : une clé OpenWeatherMap fraîchement créée peut mettre jusqu'à 2h avant de devenir active.

## Installation

```bash
git clone https://github.com/<ton-user>/datadash.git
cd datadash
```

Le projet utilise des modules ES6, il faut donc un serveur local (pas de double-clic direct sur `index.html`) :

```bash
npx serve .
```

## Structure du projet

```
datadash/
├── index.html
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── api.js
│   ├── config.js
│   ├── state.js
│   ├── history.js
│   └── ui/
│       ├── renderDashboard.js
│       ├── renderForecast.js
│       └── domHelpers.js
└── README.md
```

## Auteur

Grâsty — Akieni Academy
