const { makeCookieFetch, getCookieValue } = require("../_utils/cookies.js");

module.exports = async function handler(req, res) {
  try {
    // CORS (handy for local dev)
    const ORIGIN = process.env.CORS_ORIGIN || "*";
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", ORIGIN);
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      return res.status(204).end();
    }
    res.setHeader("Access-Control-Allow-Origin", ORIGIN);

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).end("Method Not Allowed");
    }

    const { fetchWithCookies, jar } = makeCookieFetch();

    // Parse body (support Vercel's req.body) and merge query
    const body = await getBody(req);
    const url = new URL(req.url, "http://localhost");

    const lat = body.lat ?? asNum(url.searchParams.get("lat"));
    const lng = body.lng ?? asNum(url.searchParams.get("lng"));
    const payload = {
      page_type: body.page_type ?? "DESKTOP_WEB_LISTING",
      ...body,
      ...(lat != null ? { lat } : {}),
      ...(lng != null ? { lng } : {}),
    };

    if (payload.lat == null || payload.lng == null) {
      return res.status(400).json({ error: "lat and lng are required on body or query" });
    }

    // Warm session → get cookies/CSRF
    await warmup(fetchWithCookies);

    // Post with CSRF; retry once on 403
    let csrf = await getCookieValue(jar, "https://www.swiggy.com/");
    let resp = await postUpdate(fetchWithCookies, payload, csrf);
    if (resp.status === 403) {
      await warmup(fetchWithCookies);
      csrf = await getCookieValue(jar, "https://www.swiggy.com/");
      resp = await postUpdate(fetchWithCookies, payload, csrf);
    }

    const text = await resp.text();
    res.status(resp.status);
    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};

function asNum(v) {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

async function getBody(req) {
  // Vercel may populate req.body for JSON
  if (req.body !== undefined) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body || "{}");
      } catch {
        return {};
      }
    }
    return req.body || {};
  }
  // Fallback: read stream
  const chunks = [];
  for await (const ch of req) chunks.push(ch);
  const raw = Buffer.concat(chunks).toString("utf8");
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function warmup(fetchWithCookies) {
  await fetchWithCookies("https://www.swiggy.com/restaurants", {
    headers: {
      "user-agent": UA,
      referer: "https://www.swiggy.com/",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  await fetchWithCookies("https://www.swiggy.com/dapi/landing/PRE_FETCH?_=" + Date.now(), {
    headers: {
      "user-agent": UA,
      referer: "https://www.swiggy.com/",
      accept: "application/json, text/plain, */*",
    },
  });
}

function buildHeaders(csrf) {
  const h = {
    "user-agent": UA,
    "content-type": "application/json",
    accept: "application/json, text/plain, */*",
    referer: "https://www.swiggy.com/",
    origin: "https://www.swiggy.com",
    "x-requested-with": "XMLHttpRequest",
  };
  if (csrf) {
    h["x-csrf-token"] = csrf;
    h["x-xsrf-token"] = csrf;
    h["csrf-token"] = csrf;
  }
  return h;
}

async function postUpdate(fetchWithCookies, body, csrf) {
  return fetchWithCookies("https://www.swiggy.com/dapi/restaurants/list/update", {
    method: "POST",
    headers: buildHeaders(csrf),
    body: JSON.stringify(body || {}),
  });
}

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139 Safari/537.36";
