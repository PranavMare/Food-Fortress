import { useState, useEffect, useCallback } from "react";

const extractRestaurants = (payload) => {
  const cards = payload?.data?.cards ?? [];
  for (const c of cards) {
    const list = c?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    if (Array.isArray(list)) return list;
  }
  return [];
};

const extractWidgetOffset = (payload) => payload?.data?.widgetOffset ?? null;
const extractNextPageToken = (payload) => {
  const d = payload?.data ?? {};
  return d?.pageOffset?.nextOffset || d?.nextOffset || d?.pageOffset || null;
};
const hasAnyOffset = (wo) => !!wo && Object.values(wo).some((v) => Boolean(v) && String(v).trim() !== "");

const WKEY = "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo";
const bumpWidgetOffset = (prev) => {
  const cur = Number((prev && prev[WKEY]) ?? 9);
  const next = String(cur + 15);
  return { ...(prev || {}), [WKEY]: next };
};

export default function useRestaurants({ lat, lng }) {
  const [restaurants, setRestaurants] = useState([]);
  const [widgetOffset, setWidgetOffset] = useState(null);
  const [pageToken, setPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initial load + reset when lat/lng change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setRestaurants([]);
        setWidgetOffset(null);
        setPageToken(null);
        setHasMore(true);
        setLoadingMore(false);

        const r = await fetch(`/api/swiggy/list?lat=${lat}&lng=${lng}`);
        if (!r.ok) throw new Error(`API ${r.status}`);
        const json = await r.json();
        if (cancelled) return;

        const initial = extractRestaurants(json);
        const wo = extractWidgetOffset(json) ?? { [WKEY]: "9" };
        const token = extractNextPageToken(json);

        setRestaurants(initial);
        setWidgetOffset(wo);
        setPageToken(token);
        setHasMore(initial.length > 0 && (hasAnyOffset(wo) || !!token));
      } catch (e) {
        console.error(e);
        setHasMore(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lat, lng]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || widgetOffset == null) return;

    const prevWO = widgetOffset;
    setLoadingMore(true);
    try {
      const resp = await fetch("/api/swiggy/update", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lat,
          lng,
          widgetOffset: prevWO,
          pageOffset: pageToken,
          nextOffset: pageToken,
        }),
      });
      const more = await resp.json();

      const newItems = extractRestaurants(more);
      const nextWOFromServer = extractWidgetOffset(more);
      const nextToken = extractNextPageToken(more);

      // merge + de-dupe
      setRestaurants((prev) => {
        const map = new Map(prev.map((r) => [r?.info?.id, r]));
        newItems.forEach((r) => map.set(r?.info?.id, r));
        return Array.from(map.values());
      });

      let finalNextWO;
      if (hasAnyOffset(nextWOFromServer) && nextWOFromServer[WKEY] !== prevWO?.[WKEY]) {
        finalNextWO = nextWOFromServer;
      } else if (newItems.length > 0 || !!nextToken) {
        finalNextWO = bumpWidgetOffset(prevWO);
      } else {
        finalNextWO = nextWOFromServer ?? prevWO;
      }

      setWidgetOffset(finalNextWO);
      setPageToken(nextToken);

      const canTryMore = newItems.length > 0 || !!nextToken || (hasAnyOffset(finalNextWO) && finalNextWO[WKEY] !== prevWO?.[WKEY]);

      setHasMore(Boolean(canTryMore));
    } catch (e) {
      console.error(e);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [lat, lng, loadingMore, hasMore, widgetOffset, pageToken]);

  return {
    restaurants,
    hasMore,
    loadingMore,
    loadMore,
  };
}
