import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData = {} }) => {
  const info = resData.info || {};

  return (
    <div
      className="w-64 shadow-gray-700 overflow-hidden rounded-xl bg-secondary shadow-sm hover:bg-primary hover:text-white transform-gpu transition-transform duration-200 hover:scale-111
      "
      tabIndex={0}
    >
      {info.cloudinaryImageId && (
        <img src={`${CDN_URL}${info.cloudinaryImageId}`} alt={info.name || "Restaurant"} className="h-40 w-full object-cover" loading="lazy" />
      )}

      <div className="p-3 space-y-1 ">
        <h3 className="truncate text-base font-semibold ">{info.name || "Restaurant"}</h3>
        {info.cuisines?.length ? <p className="truncate text-sm ">{info.cuisines.join(", ")}</p> : null}
        <p className="text-sm">⭐ {info.avgRatingString || "—"}</p>
        <p className="text-sm ">{info.sla?.slaString || ""}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
