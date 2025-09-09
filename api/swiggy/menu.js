const { makeCookieFetch } = require("../_utils/cookies.js");

module.exports = async function handler(req, res) {
  try {
    const ORIGIN = process.env.CORS_ORIGIN || "*";
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", ORIGIN);
      res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      return res.status(204).end();
    }
    res.setHeader("Access-Control-Allow-Origin", ORIGIN);

    const url = new URL(req.url, "http://localhost");
    const q = Object.fromEntries(url.searchParams.entries());
    const rid = q.restaurantId || q.resId;
    if (!rid) return res.status(400).json({ error: "restaurantId is required" });

    const lat = q.lat || "18.5220938";
    const lng = q.lng || "73.8412187";

    const { fetchWithCookies } = makeCookieFetch();

    await fetchWithCookies("https://www.swiggy.com/restaurants", {
      headers: { "user-agent": UA, referer: "https://www.swiggy.com/" },
    });

    const menuUrl =
      `https://www.swiggy.com/dapi/menu/pl` +
      `?page-type=REGULAR_MENU&complete-menu=true` +
      `&lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}` +
      `&restaurantId=${encodeURIComponent(rid)}`;

    const r = await fetchWithCookies(menuUrl, {
      headers: {
        "user-agent": UA,
        referer: "https://www.swiggy.com/",
        accept: "application/json, text/plain, */*",
      },
    });

    const text = await r.text();
    res.status(r.status);
    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139 Safari/537.36";
