import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/features/cartSlice";

const formatINR = (paisa = 0) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format((paisa ?? 0) / 100);

function ItemsList({ items = [] }) {
  return (
    <div className="divide-y divide-gray-200">
      {items.map((item) => {
        const info = item?.card?.info ?? {};
        const price = info.defaultPrice ?? info.price ?? 0;
        const imgId = info.imageId ?? info.cloudinaryImageId;

        const dispatch = useDispatch();

        const handleAddItems = () => {
          //Dispatch an action
          dispatch(addItem(item));
        };

        return (
          <div key={info.id ?? info.name} className="flex items-start gap-4 py-4">
            {/* Text */}
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-semibold text-gray-900">{info.name}</h3>
                <span className="text-gray-600"> - {formatINR(price)}</span>
              </div>

              {info.description && <p className="mt-1 text-sm text-gray-700 text-left">{info.description}</p>}
            </div>

            {/* Image + Add button */}
            <div className="relative w-28 shrink-0">
              {imgId ? (
                <img src={CDN_URL + imgId} alt={info.name ?? "Menu item"} loading="lazy" className="h-24 w-28 rounded-md object-cover border border-gray-200" />
              ) : (
                <div className="h-24 w-28 rounded-md bg-gray-100 border border-gray-200" />
              )}

              <button
                type="button"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 text-sm  font-bold rounded-full bg-secondary text-primary ring-1 ring-gray-200 shadow hover:bg-primary hover:scale-120 hover:text-secondary"
                onClick={() => handleAddItems(item)}
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
