import React, { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResturantMenu from "../utils/useResturantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useResturantMenu(resId);
  const [showCategory, setShowCategory] = useState(0);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines } = resInfo?.cards[2]?.card.card.info;
  const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) => c.card.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className=" font-bold text-xl">Cuisines {cuisines.join(", ")}</p>
      {categories.map((category, index) => {
        return (
          <RestaurantCategory
            data={category.card.card}
            key={index}
            showItems={index === showCategory ? true : false}
            setShowCategory={() => setShowCategory(index)}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
