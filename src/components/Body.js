import { useMemo, useState } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurants from "../utils/useRestaurants.js";
import useInfiniteIntersection from "../utils/useInfiniteIntersection.js";
// ← from utils
import SearchControls from "./SearchControls";
import RestaurantGrid from "./RestaurantGrid";

// Set your city coords here
const LAT = 18.5220938;
const LNG = 73.8412187;

export default function Body() {
  const onlineStatus = useOnlineStatus();
  const { restaurants, hasMore, loadingMore, loadMore } = useRestaurants({ lat: LAT, lng: LNG });

  const [searchText, setSearchText] = useState("");
  const [topOnly, setTopOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = restaurants;
    if (topOnly) list = list.filter((r) => Number(r?.info?.avgRatingString) > 4.5);
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      list = list.filter((r) => r?.info?.name?.toLowerCase().includes(q));
    }
    return list;
  }, [restaurants, searchText, topOnly]);

  const sentinelRef = useInfiniteIntersection(loadMore, {
    root: null,
    rootMargin: "0px 0px 300px 0px",
    threshold: 0,
    enabled: hasMore && !loadingMore,
  });

  if (onlineStatus === false) {
    return <h1>Looks like you are offline please check your internet connection!!</h1>;
  }

  if (restaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <SearchControls searchText={searchText} onSearchTextChange={setSearchText} topOnly={topOnly} onToggleTopOnly={() => setTopOnly((v) => !v)} />

      <RestaurantGrid restaurants={filtered} />

      <div ref={sentinelRef} className="h-8" />
      {loadingMore && <div className="py-4 text-center text-sm opacity-60">Loading more…</div>}
      {!hasMore && <div className="py-4 text-center text-xs opacity-50">You’re all caught up.</div>}
    </div>
  );
}
