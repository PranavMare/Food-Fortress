import express from "express";
import cors from "cors";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:1234", "http://localhost:5173", "http://localhost:3000"],
  })
);
app.use(express.json());

const jar = new CookieJar();
const fetch = fetchCookie(nodeFetch, jar);

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";

const defaultWidgetOffset = {
  NewListingView_category_bar_chicletranking_TwoRows: "",
  NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
  Restaurant_Group_WebView_PB_Theme: "",
  Restaurant_Group_WebView_SEO_PB_Theme: "",
  collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "9",
  inlineFacetFilter: "",
  restaurantCountWidget: "",
};

async function warmUpSession() {
  await fetch("https://www.swiggy.com/restaurants", {
    headers: { "user-agent": UA, referer: "https://www.swiggy.com/" },
  });
}

function getCookiePromise(url) {
  return new Promise((resolve, reject) => {
    jar.getCookies(url, (err, cookies) => (err ? reject(err) : resolve(cookies)));
  });
}

// Try to find any CSRF-style cookie (names vary)
async function getCsrfToken() {
  const cookies = await getCookiePromise("https://www.swiggy.com/");
  const hit = cookies.find((c) => /^(csrf|xsrf|_csrf|XSRF-TOKEN)$/i.test(c.key)) || cookies.find((c) => /csrf|xsrf/i.test(c.key));
  return hit?.value || null;
}

// First page passthrough (optional)
app.get("/api/swiggy/list", async (req, res) => {
  try {
    const lat = req.query.lat ?? "18.5220938";
    const lng = req.query.lng ?? "73.8412187";

    await warmUpSession();
    const r = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`, {
      headers: {
        "user-agent": UA,
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        referer: "https://www.swiggy.com/restaurants",
        // These client hints aren’t required server-side, but harmless:
        "sec-ch-ua": '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
    });
    const text = await r.text();
    res.status(r.status).json(
      (() => {
        try {
          return JSON.parse(text);
        } catch {
          return { raw: text };
        }
      })()
    );
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// Pagination endpoint with CSRF + original-ish headers
app.post("/api/swiggy/update", async (req, res) => {
  try {
    const { lat, lng, widgetOffset, pageOffset, nextOffset } = req.body;

    await warmUpSession();
    const csrf = await getCsrfToken(); // ← key bit

    const body = {
      lat,
      lng,
      widgetOffset: { ...defaultWidgetOffset, ...(widgetOffset || {}) },
      filters: {},
      seoParams: {
        seoUrl: "https://www.swiggy.com/restaurants",
        pageType: "FOOD_HOMEPAGE",
        apiName: "FoodHomePage",
        businessLine: "FOOD",
      },
      page_type: "DESKTOP_WEB_LISTING",
      // include CSRF only if we have it
      ...(csrf ? { _csrf: csrf } : {}),
      // include whichever pagination token(s) you have
      ...(pageOffset ? { pageOffset } : {}),
      ...(nextOffset ? { nextOffset } : {}),
    };

    const headers = {
      "content-type": "application/json",
      "user-agent": UA,
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      origin: "https://www.swiggy.com",
      referer: "https://www.swiggy.com/restaurants",
      // mimic browser-y bits they check for
      __fetch_req__: "true",
      platform: "dweb",
      // Optional but sometimes accepted by middleware:
      ...(csrf ? { "x-csrf-token": csrf } : {}),
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      "sec-ch-ua": '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
    };

    let r = await fetch("https://www.swiggy.com/dapi/restaurants/list/update", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    // If we somehow raced before cookies/token existed, retry once
    if (r.status === 403) {
      await warmUpSession();
      const csrf2 = await getCsrfToken();
      if (csrf2 && csrf2 !== csrf) {
        body._csrf = csrf2;
        headers["x-csrf-token"] = csrf2;
        r = await fetch("https://www.swiggy.com/dapi/restaurants/list/update", {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
      }
    }

    const text = await r.text();
    res.status(r.status).json(
      (() => {
        try {
          return JSON.parse(text);
        } catch {
          return { raw: text };
        }
      })()
    );
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
