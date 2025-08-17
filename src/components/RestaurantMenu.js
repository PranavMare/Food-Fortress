import React, { useState } from "react";
import { useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useResturantMenu from "../utils/useResturantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useResturantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  console.log(resId);
  console.log(MENU_API + resId);

  console.log(resInfo);
  console.log(resInfo?.cards[2]?.card.card.info.name);

  const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card.card.info;
  const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  console.log(itemCards);

  return (
    <div>
      <h1>{name}</h1>
      <h3>Cuisines {cuisines.join(", ")}</h3>
      <h3>Cost for Two {costForTwoMessage}.</h3>
      <h1>Menu </h1>
      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} : Rs.{item.card.info.price / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
