# Food Fortress

> A React + Tailwind learning project for browsing nearby restaurants with search and infinite scrolling, backed by a tiny Express API that proxies a third‑party listings service to avoid CORS and handle the pagination tokens.

## About

Food Fortress is a two‑part app:

- **Web UI (React + Parcel + Tailwind CSS):** renders the restaurant list, search/filter, and an infinite‑scroll feed with lightweight components (e.g., `RestaurantCard`, `RestaurantMenu`). It uses **React Router** for pages like Home, About, Contact, and individual menus.
- **API (Express):** a small helper service that calls the upstream listings API on your behalf. This keeps credentials/headers server‑side, mitigates CORS, and simplifies pagination by exposing two endpoints:
  - `GET /api/swiggy/list?lat=<lat>&lng=<lng>` – initial page
  - `POST /api/swiggy/update` – fetch next pages using pagination tokens

## Features

- ⚡️ **Fast dev** with Parcel (no complex config)
- 🎯 **Restaurant discovery** with search and filters
- 🔁 **Infinite scroll** (IntersectionObserver based)
- 💅 **Tailwind CSS v4** utility styles with custom theme tokens
- 🔗 **React Router** for page navigation
- 🌐 **Proxy API** (Express) to normalize headers and paginate reliably

## Tech Stack

- **Frontend:** React, React Router, Parcel, Tailwind CSS
- **Backend:** Node.js, Express, node-fetch (+ cookie jar for session/csrf)
- **Dev tooling:** concurrently, nodemon

## Project Structure

```text
.
├─ README.md
├─ package.json  # root scripts
├─ public/
├─ server/  # Express API (proxy/pagination)
└─ src/  # React app (components, hooks, styles)
```

## Getting Started

### Prerequisites

- Node.js 18+
- (Optional) A terminal that supports running multiple scripts

### Install

```bash
# from the project root
npm install
cd server && npm install && cd ..
```

### Run

```bash
# Frontend only (Parcel dev server)
npm run dev:web

# API only (Express on http://localhost:3001)
npm run dev:api

# Both at once (concurrently)
npm run dev:all
```

- UI dev server: usually `http://localhost:1234`
- API server: `http://localhost:3001` (default; override with `PORT`)

### Environment Variables

Create a `.env` file at the project root or export in your shell:

```env
PORT=3001         # API port (server)
```

> The frontend is self‑contained. Only the API needs `PORT` if you want to change it.

## API Quick Reference

**Base:** `http://localhost:3001`

- `GET /api/swiggy/list?lat=<lat>&lng=<lng>`  
  Returns the first page of restaurants for the given location.
- `POST /api/swiggy/update` (JSON body)  
  Use this to load **more** results (pagination).
  ```json
  {
    "lat": "18.5220938",
    "lng": "73.8412187",
    "widgetOffset": { "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": 9 },
    "pageOffset": "...optional token from previous response...",
    "nextOffset": "...optional token from previous response..."
  }
  ```
  The API manages session & CSRF under the hood and merges your offsets.

## Scripts

- `npm run dev:web` – start Parcel on the React app
- `npm run dev:api` – start the Express API with nodemon
- `npm run dev:all` – run both together
- `npm run build` – build static assets with Parcel
- `npm start` – alias of `parcel src/index.html` (dev)

## Troubleshooting

- **CORS or 403 from upstream** → run the API locally and point the web app at it (the API already sets realistic headers).
- **Infinite scroll not loading** → ensure the `POST /api/swiggy/update` request includes the latest pagination token(s) returned by the previous response.
- **Tailwind styles missing** → confirm Tailwind v4 is installed and `@import "tailwindcss";` exists in `src/index.css`.
