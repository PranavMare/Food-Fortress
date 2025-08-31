# Food Fortress — Food Delivery Web App 🍽️

**Food Fortress** is a modern single‑page web application for **discovering restaurants** and managing a simple **order/cart** flow.  
The UI is built with **React** and bundled by **Parcel**. A lightweight **serverless API** (under `/api/*`) proxies upstream data sources and handles cookies/CSRF automatically.

---

## Overview

- **What it is:** A food‑delivery style web client that lists nearby restaurants for given coordinates and lets users explore menus and build a cart.
- **Why it exists:** To provide a clean, fast, and portable front‑end with a minimal backend layer that works in local development without exposing upstream cookies or complex auth.
- **How it works:** The React SPA renders routes and components. Data requests go to local `/api/*` serverless functions which in turn call upstream endpoints (with session warm‑up and CSRF headers), returning JSON back to the client.

---

## Tech Stack

- **React** (SPA UI)
- **Parcel** (dev server + production builds)
- **Serverless functions** (Node 18, CommonJS) under `api/`
- **fetch-cookie** + **tough-cookie** (session + CSRF handling)
- Optional state management: simple component state or Redux Toolkit (depending on your codebase)

---

## Features

- 🔎 **Restaurant discovery** by latitude/longitude
- 🛒 **Cart flow**: add/remove items, subtotal display (implementation in client code)
- 🔀 **Client‑side routing** (single‑page application with deep-link support)
- 🌐 **API proxy**: `/api/swiggy/*` functions warm up cookies and attach CSRF headers automatically
- 🧪 **Typed JSON payloads** for simple parsing on the client
- 🧰 **Fast DX**: zero‑config dev server (`parcel`), single command to run app + API locally

---

## Project Structure

```
repo-root/
├─ api/                      # Serverless API (Node 18, CommonJS)
│  ├─ _utils/
│  │  └─ cookies.js          # fetch-cookie + tough-cookie helper
│  └─ swiggy/
│     ├─ list.js             # GET: restaurants list for lat/lng
│     └─ update.js           # POST: list update (accepts lat/lng; CSRF-aware)
├─ src/                      # React client
│  ├─ index.html
│  ├─ main.jsx / index.jsx   # app entry
│  └─ utils/
│     └─ useRestaurants.js   # data-fetching hook using /api/swiggy/*
├─ package.json              # scripts (parcel dev/build/preview)
├─ vercel.json               # SPA rewrites + function runtime (also used locally)
└─ README.md
```

**Folder notes**

- `api/_utils/cookies.js`: creates a cookie-aware `fetch` and helps read CSRF‑like values from the cookie jar.
- `api/swiggy/list.js`: reads `lat` & `lng` from the query string and forwards the request upstream, returning JSON.
- `api/swiggy/update.js`: accepts `lat`/`lng` **from body or query**, warms up cookies, sends the POST with CSRF headers, and retries once on 403.
- `src/utils/useRestaurants.js`: example hook demonstrating cancellable fetches and basic loading/error handling.

---

## Run Locally

> Requires **Node 18+** and **npm**. (The API functions run locally together with the app.)

### Install

```bash
npm ci
```

### Start (app + API together)

```bash
vercel dev
# App + API available at http://localhost:3000
```

- The SPA and `/api/*` share the **same origin** locally, so no extra CORS setup is needed.
- If you prefer only the Parcel dev server: `npm run dev` (then call the API at `http://localhost:3000/api/...` from another `vercel dev` terminal).

### Local production preview (optional)

```bash
npm run build
npx serve dist
```

### Scripts

```jsonc
{
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html --dist-dir dist --public-url /",
    "preview": "npx serve dist"
  }
}
```

---

## API (Serverless)

All endpoints are served under the **same origin** in local development (e.g., `http://localhost:3000`).

### `GET /api/swiggy/list?lat=<num>&lng=<num>`

Returns a JSON list of restaurants for the provided coordinates.

**Query params**

- `lat` _(number, required)_
- `lng` _(number, required)_

**Example**

```bash
curl "http://localhost:3000/api/swiggy/list?lat=18.5220938&lng=73.8412187"
```

**Response (shape varies; sample)**

```json
{
  "statusCode": 0,
  "data": {
    "cards": [
      /* ... */
    ]
  }
}
```

---

### `POST /api/swiggy/update`

Refreshes/updates the list for a location. Accepts coordinates from **body or query**.

**Body JSON (recommended)**

```json
{
  "lat": 18.5220938,
  "lng": 73.8412187,
  "page_type": "DESKTOP_WEB_LISTING"
}
```

**Query form (alternative)**

```
/api/swiggy/update?lat=18.5220938&lng=73.8412187
```

**Examples**

```bash
# Body
curl -i -X POST http://localhost:3000/api/swiggy/update   -H "content-type: application/json"   -d '{"lat":18.5220938,"lng":73.8412187,"page_type":"DESKTOP_WEB_LISTING"}'

# Query
curl -i -X POST "http://localhost:3000/api/swiggy/update?lat=18.5220938&lng=73.8412187"   -H "content-type: application/json" -d "{}"
```

**Notes**

- Functions perform a brief session warm‑up and attach CSRF headers automatically.
- On a 403 response from upstream, the function retries once with a fresh token.
- If `lat`/`lng` are missing, the function returns HTTP `400` with a clear message.

---

## UI Flow (at a glance)

1. User opens the app (SPA mounts and sets up routes).
2. Client requests `/api/swiggy/list?lat=<...>&lng=<...>` to fetch restaurants for the current location.
3. User can refine or refresh results; client calls `POST /api/swiggy/update` with the same coordinates.
4. User adds items to the cart; the UI maintains client‑side state for totals and item counts.
5. (Optional) Additional features like search, filters, and pagination can be layered onto the same flow.
