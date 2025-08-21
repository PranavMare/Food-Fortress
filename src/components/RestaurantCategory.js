import { useState } from "react";
import ItemsList from "./ItemsList";

const RestaurantCategory = ({ data, showItems, setShowCategory }) => {
  const handleClick = () => {
    setShowCategory();
  };

  return (
    <div className="">
      {/* Header */}
      <div className="w-6/12 mx-auto my-2 bg-gray shadow-lg p-4 cursor-pointer" onClick={handleClick}>
        <div className="flex justify-between">
          <span className="font-semibold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>
            <button className="inline-flex items-center gap-1 text-gray-700">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current">
                <path d="M6 9l6 6 6-6" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </span>
        </div>
        {showItems && <ItemsList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
