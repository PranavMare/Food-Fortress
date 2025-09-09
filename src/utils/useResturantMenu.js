import { useEffect, useState } from "react";

export default function useRestaurantMenu(resId, opts = {}) {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null);
  const { lat, lng } = opts;

  useEffect(() => {
    if (!resId) {
      setResInfo(null);
      setError(null);
      return;
    }
    const ac = new AbortController();
    (async () => {
      try {
        const params = new URLSearchParams({ restaurantId: String(resId) });
        if (lat != null) params.set("lat", String(lat));
        if (lng != null) params.set("lng", String(lng));
        const r = await fetch(`/api/swiggy/menu?${params.toString()}`, { signal: ac.signal });
        if (!r.ok) throw new Error(`Menu API ${r.status}`);
        const json = await r.json();
        if (!ac.signal.aborted) setResInfo(json?.data ?? null);
      } catch (e) {
        if (!ac.signal.aborted) setError(e);
      }
    })();
    return () => ac.abort();
  }, [resId, lat, lng]);

  return { resInfo, error };
}
