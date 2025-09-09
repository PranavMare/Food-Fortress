const { makeCookieFetch, getCookieValue } = require("../_utils/cookies.js");

module.exports = async function handler(req, res) {
  try {
    // CORS (helps during local dev with Parcel at localhost:1234)
    const ORIGIN = process.env.CORS_ORIGIN || "*";
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", ORIGIN);
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      return res.status(204).end();
    }
    res.setHeader("Access-Control-Allow-Origin", ORIGIN);

    const url = new URL(req.url, "http://localhost");
    const lat = url.searchParams.get("lat") || "18.5220938";
    const lng = url.searchParams.get("lng") || "73.8412187";

    const { fetchWithCookies, jar } = makeCookieFetch();

    // Warm up session so Swiggy sets cookies
    await fetchWithCookies("https://www.swiggy.com/restaurants", {
      headers: { "user-agent": UA, referer: "https://www.swiggy.com/" },
    });
    const csrf = await getCookieValue(jar, "https://www.swiggy.com/");

    const headers = {
      "user-agent": UA,
      "x-csrf-token": csrf || "",
      "content-type": "application/json",
      referer: "https://www.swiggy.com/",
    };

    const r = await fetchWithCookies(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}&page_type=DESKTOP_WEB_LISTING`,
      { headers }
    );

    const text = await r.text();
    try {
      res.status(r.status).json(JSON.parse(text));
    } catch {
      res.status(r.status).send(text);
    }
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139 Safari/537.36";
