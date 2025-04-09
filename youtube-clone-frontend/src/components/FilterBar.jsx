// src/components/FilterBar.jsx

const filters = [
    "All",
    "Music",
    "Gaming",
    "Live",
    "News",
    "Coding",
    "Sports",
    "Podcasts",
    "Movies",
    "Trending",
  ];
  
  const FilterBar = () => {
    return (
      <div className="w-full overflow-x-auto px-4 md:px-6 mt-4">
      <div className="flex gap-3 sm:gap-4 md:gap-5 whitespace-nowrap pb-2">
        {filters.map((filter, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 transition whitespace-nowrap shrink-0"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
    );
  };
  
  export default FilterBar;
  