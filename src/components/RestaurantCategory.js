import ItemsList from "./ItemsList";

const RestaurantCategory = ({ data, showItems, setShowCategory }) => {
  const count = data?.itemCards?.length ?? 0;

  return (
    <div className="mx-auto my-3 w-full md:w-9/12">
      {/* Header */}
      <div className="bg-white ring-secondary rounded-sm shadow-xl p-4 cursor-pointer transition hover:shadow-md" onClick={setShowCategory}>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">
            {data.title} {count ? `(${count})` : ""}
          </span>
          <button className="inline-flex items-center text-gray-700" aria-label={showItems ? "Collapse" : "Expand"}>
            <svg viewBox="0 0 24 24" className={`w-6 h-6 stroke-current transition-transform ${showItems ? "rotate-180" : ""}`}>
              <path d="M6 9l6 6 6-6" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      {showItems && (
        <div className=" rounded-b-xl px-4 pb-4 pt-1">
          <ItemsList items={data.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
