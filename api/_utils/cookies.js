// api/_utils/cookies.js
const fetchCookie = require("fetch-cookie").default || require("fetch-cookie");
const { CookieJar } = require("tough-cookie");

function makeCookieFetch() {
  const jar = new CookieJar();
  const fetchWithCookies = fetchCookie(globalThis.fetch, jar);
  return { fetchWithCookies, jar };
}

function getCookieValue(jar, url, match = /csrf|xsrf/i) {
  return new Promise((resolve, reject) => {
    jar.getCookies(url, (err, cookies) => {
      if (err) return reject(err);
      const hit = cookies.find((c) => match.test(c.key));
      resolve(hit ? hit.value : null);
    });
  });
}

module.exports = { makeCookieFetch, getCookieValue };
