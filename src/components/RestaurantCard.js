import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData = {} }) => {
  const info = resData.info || {};

  return (
    <div className="m-3 w-64 overflow-hidden rounded-xl border bg-white shadow-sm hover:bg-orange-50">
      {info.cloudinaryImageId && (
        <img src={`${CDN_URL}${info.cloudinaryImageId}`} alt={info.name || "Restaurant"} className="h-40 w-full object-cover" loading="lazy" />
      )}

      <div className="p-3 space-y-1">
        <h3 className="truncate text-base font-semibold">{info.name || "Restaurant"}</h3>
        {info.cuisines?.length ? <p className="truncate text-sm text-slate-600">{info.cuisines.join(", ")}</p> : null}
        <p className="text-sm">⭐ {info.avgRatingString || "—"}</p>
        <p className="text-sm text-slate-700">{info.sla?.slaString || ""}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
 