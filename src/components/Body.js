import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [resObj, setResObj] = useState([]);
  const [filteredRestuarants, setFilteredRestuarants] = useState(resObj);
  const [toggleTopResturants, setToggleTopResturants] = useState("Top Rated Restaurants");

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5220938&lng=73.8412187&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setResObj(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestuarants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlineStatus = useOnlineStatus();
  console.log(onlineStatus);

  if (onlineStatus === false) return <h1>Looks like you are offline please check your internet connection!!</h1>;

  return resObj.length === 0 ? (
    <Shimmer  />
  ) : (
    <div className="body ">
      <div className="flex justify-center">
        <div className="m-1 p-2">
          <input
            type="text"
            className="border border-solid border-black rounded-l "
            value={searchText}
            onChange={(e) => {
              const query = e.target.value;
              setSearchText(query);
              const filtered = resObj.filter((res) => res.info.name.toLowerCase().includes(query.toLowerCase()));
              setFilteredRestuarants(filtered);
            }}
          />
          <button
            className="px-4 py-2 m-2 bg-primary rounded-2xl cursor-pointer text-white"
            onClick={() => {
              const filtered = resObj.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
              setFilteredRestuarants(filtered);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="px-4 py-2 m-4 bg-primary rounded-2xl cursor-pointer text-white"
          onClick={() => {
            if (toggleTopResturants === "Top Rated Restaurants") {
              const filtered = resObj.filter((res) => res.info.avgRatingString > 4.5);
              setToggleTopResturants("Show All Restuarants");
              setFilteredRestuarants(filtered);
            } else {
              setToggleTopResturants("Top Rated Restaurants");
              setFilteredRestuarants(resObj);
            }
          }}
        >
          {toggleTopResturants}
        </button>
      </div>
      <div className="mx-auto max-w-screen-5xl flex flex-wrap justify-center gap-8">
        {filteredRestuarants.map((restaurant) => (
          <Link key={restaurant.info.id} to={"/restaurant/" + restaurant.info.id} className="block">
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
