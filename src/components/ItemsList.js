import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/features/cartSlice";

const formatINR = (paisa = 0) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format((paisa ?? 0) / 100);

function ItemsList({ items = [] }) {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item) => {
        const info = item?.card?.info ?? {};
        const price = info.defaultPrice ?? info.price ?? 0;
        const imgId = info.imageId ?? info.cloudinaryImageId;

        return (
          <div key={info.id ?? info.name} className="flex items-start justify-between gap-4 px-2 py-4">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-semibold text-gray-900">{info.name}</h3>
                <span className="text-gray-600">– {formatINR(price)}</span>
              </div>
              {info.description && <p className="mt-1 text-sm text-gray-700 break-words">{info.description}</p>}
            </div>

            {/* Image + Add button */}
            <div className=" relative w-28 h-24 shrink-0 md:w-32 md:h-24">
              {imgId ? (
                <img
                  src={CDN_URL + imgId}
                  alt={info.name ?? "Menu item"}
                  loading="lazy"
                  className=" h-full w-full rounded-md object-cover border border-gray-200"
                />
              ) : (
                <div className="h-full w-full rounded-md bg-gray-100 border border-gray-200" />
              )}

              <button
                type="button"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs md:text-sm font-semibold rounded-full bg-white text-primary ring-1 ring-secondary shadow hover:scale-105 hover:bg-primary hover:text-white active:scale-95 transition"
                onClick={() => handleAddItem(item)}
              >
                Add
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ItemsList;
