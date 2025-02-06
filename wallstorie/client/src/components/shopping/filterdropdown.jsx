import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function FilterDropdown() {
  const [filters, setFilters] = useState({
    price: 0,
    themes: [],
    spaces: [],
    trends: [],
  });

  const [openSections, setOpenSections] = useState({
    price: true,
    colors: true,
    themes: true,
    spaces: true,
    trends: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-green-700 mb-3">Filter</h2>

      {/* Price Range */}
      <div className="border-b pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <span className="font-medium">Price</span>
          {openSections.price ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.price && (
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="17500"
              value={filters.price}
              onChange={(e) =>
                setFilters({ ...filters, price: e.target.value })
              }
              className="w-full bg-white "
            />
            <p className="text-sm text-green-600">₹0 - ₹{filters.price}</p>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-b pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("colors")}
        >
          <span className="font-medium">Colors</span>
          {openSections.colors ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.colors && (
          <div className="grid grid-cols-5 gap-2 mt-3">
            {[
              "#000000",
              "#FF0000",
              "#008000",
              "#0000FF",
              "#FFFF00",
              "#800080",
              "#FFA500",
              "#964B00",
            ].map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border cursor-pointer"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Themes */}
      <div className="border-b pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("themes")}
        >
          <span className="font-medium">Themes</span>
          {openSections.themes ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.themes && (
          <div className="mt-2 space-y-1">
            {["Divine", "Heritage", "Kid Series", "Tropical", "Sequence"].map(
              (theme) => (
                <label key={theme} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.themes.includes(theme)}
                    onChange={() => handleCheckboxChange("themes", theme)}
                  />
                  <span>{theme}</span>
                </label>
              )
            )}
          </div>
        )}
      </div>

      {/* Spaces */}
      <div className="border-b pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("spaces")}
        >
          <span className="font-medium">Spaces</span>
          {openSections.spaces ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.spaces && (
          <div className="mt-2 space-y-1">
            {[
              "Living room",
              "Bedroom",
              "Office room",
              "Pooja room",
              "Kids room",
            ].map((space) => (
              <label key={space} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.spaces.includes(space)}
                  onChange={() => handleCheckboxChange("spaces", space)}
                />
                <span>{space}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Trends */}
      <div className="border-b pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("trends")}
        >
          <span className="font-medium">Trends</span>
          {openSections.trends ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.trends && (
          <div className="mt-2 space-y-1">
            {["Bestseller", "New Arrival", "Seasonal Special"].map((trend) => (
              <label key={trend} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.trends.includes(trend)}
                  onChange={() => handleCheckboxChange("trends", trend)}
                />
                <span>{trend}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply & Clear Buttons */}
      <div className="flex space-x-3 mt-4">
        <button className="w-1/2 py-2 border border-green-600 text-green-700 font-medium rounded-md">
          Apply
        </button>
        <button
          className="w-1/2 py-2 border border-gray-400 text-gray-600 font-medium rounded-md"
          onClick={() =>
            setFilters({ price: 0, themes: [], spaces: [], trends: [] })
          }
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

export default FilterDropdown;
