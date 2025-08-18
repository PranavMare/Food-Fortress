import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantGrid({ restaurants }) {
  return (
    <div className="mx-auto max-w-screen-5xl flex flex-wrap justify-center gap-8">
      {restaurants.map((restaurant) => (
        <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id} className="block">
          <RestaurantCard resData={restaurant} />
        </Link>
      ))}
    </div>
  );
}
