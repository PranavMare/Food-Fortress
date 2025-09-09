import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useRestaurantMenu from "../utils/useResturantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";

/* ---------- helpers ---------- */
function extractInfo(data) {
  const cards = data?.cards ?? [];
  for (const c of cards) {
    const info = c?.card?.card?.info;
    if (info) return info;
    const maybeInfo = c?.groupedCard?.cardGroupMap?.REGULAR?.cards?.find?.((x) => x?.card?.card?.info)?.card?.card?.info;
    if (maybeInfo) return maybeInfo;
  }
  return {};
}

function extractCategories(data) {
  const regular = data?.cards?.flatMap((c) => c?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [])?.filter(Boolean) ?? [];

  const out = [];
  const pushCat = (title, itemCards) => {
    const safe = Array.isArray(itemCards) ? itemCards.filter(Boolean) : [];
    if (title && safe.length) out.push({ title, itemCards: safe });
  };

  for (const node of regular) {
    const card = node?.card?.card;
    const t = card?.["@type"] || "";
    if (t.includes("ItemCategory")) {
      pushCat(card?.title, card?.itemCards);
    } else if (t.includes("NestedItemCategory")) {
      for (const sub of card?.categories ?? []) pushCat(sub?.title, sub?.itemCards);
    }
  }
  return out;
}

export default function RestaurantMenu() {
  const { resId } = useParams();
  const { resInfo, error } = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (!resId) return <div className="p-4">Invalid restaurant link.</div>;
  if (error) return <div className="p-4">Failed to load menu: {String(error.message || error)}</div>;
  if (!resInfo)
    return (
      <div className="p-4">
        <Shimmer />
      </div>
    );

  const info = extractInfo(resInfo);
  const categories = extractCategories(resInfo);

  return (
    <div className="mx-auto max-w-6xl xl:max-w-7xl px-4 md:px-8 lg:px-12 pb-10">
      <div className="mb-3">
        <Link to="/" className="underline">
          &larr; Back
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold">{info?.name ?? "Restaurant"}</h1>
      <p className="opacity-80">{info?.areaName ?? info?.locality ?? ""}</p>
      {Array.isArray(info?.cuisines) && info.cuisines.length > 0 && <p className="opacity-70 text-sm mt-1">{info.cuisines.join(", ")}</p>}

      {/* Categories */}
      <div className="mt-4">
        {categories.map((cat, idx) => (
          <RestaurantCategory
            key={`${cat.title}-${idx}`}
            data={cat}
            showItems={showIndex === idx}
            setShowCategory={() => setShowIndex((cur) => (cur === idx ? null : idx))}
          />
        ))}
        {categories.length === 0 && <div className="text-sm opacity-70">No menu sections found for this restaurant.</div>}
      </div>
    </div>
  );
}
