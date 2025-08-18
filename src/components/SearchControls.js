export default function SearchControls({ searchText, onSearchTextChange, topOnly, onToggleTopOnly }) {
  return (
    <div className="flex justify-center">
      <div className="m-1 p-2">
        <input
          type="text"
          className="border border-solid border-black rounded-l"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          placeholder="Search restaurants…"
        />
        <button className="px-4 py-2 m-2 bg-primary rounded-2xl cursor-pointer text-white" onClick={() => onSearchTextChange(searchText)}>
          Search
        </button>
      </div>
      <button className="px-4 py-2 m-4 bg-primary rounded-2xl cursor-pointer text-white" onClick={onToggleTopOnly}>
        {topOnly ? "Show All Restaurants" : "Top Rated Restaurants"}
      </button>
    </div>
  );
}
