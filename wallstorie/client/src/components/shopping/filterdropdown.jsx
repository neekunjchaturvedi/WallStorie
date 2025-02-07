import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterDropdown = ({ filters, setFilters, applyFilters }) => {
  const colors = [
    "#C0C0C0", // Silver
    "#000000", // Black
    "#FF6B6B", // Light Red
    "#FFD700", // Gold
    "#4169E1", // Royal Blue
    "#6A0572", // Purple
    "#008080", // Teal
    "#F5DEB3", // Wheat
    "#DC143C", // Crimson
    "#87CEEB", // Sky Blue
    "#964B00", // Brown
    "#FFB6C1", // Light Pink
  ];

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
    <>
      {/* Price Range */}
      <div className="border-b border-gray-300 pb-3 mb-3">
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
              className="w-full appearance-none h-2 rounded-full"
              style={{
                background: `linear-gradient(to right, #22c55e ${
                  (filters.price / 17500) * 100
                }%, #E5E7EB ${(filters.price / 17500) * 100}%)`,
                border: "1px solid #E5E7EB", // Light gray border to make it visible
              }}
            />
            <p className="text-sm text-green-400">₹0 - ₹{filters.price}</p>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-b pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("colors")}
        >
          <span className="font-medium text-green-800 text-lg">Colors</span>
          {openSections.colors ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>

        {openSections.colors && (
          <div className="grid grid-cols-3 gap-4 mt-3">
            {colors.map((color, index) => (
              <label
                key={index}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => handleCheckboxChange("colors", color)}
                  className="appearance-none w-4 h-4 border border-black checked:bg-green-400"
                />
                <div
                  className="w-5 h-5 rounded-full border border-gray-400 bg-white"
                  style={{ backgroundColor: color }}
                ></div>
              </label>
            ))}
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
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            {[
              "Living room",
              "Bedroom",
              "Office room",
              "Pooja room",
              "Kids room",
            ].map((space, index) => (
              <label key={space} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.spaces.includes(space)}
                  onChange={() => handleCheckboxChange("spaces", space)}
                  className="appearance-none w-4 h-4 border border-black checked:bg-green-400"
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
                  className="appearance-none w-4 h-4 border border-black checked:bg-green-400"
                />
                <span>{trend}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply & Clear Buttons */}
      <div className="flex space-x-3 mt-4">
        <button
          className="w-1/2 py-2 border border-green-600 text-green-700 font-medium rounded-sm"
          onClick={applyFilters}
        >
          Apply
        </button>
        <button
          className="w-1/2 py-2 border border-gray-400 text-gray-600 font-medium rounded-sm"
          onClick={() =>
            setFilters({
              price: 0,
              themes: [],
              spaces: [],
              trends: [],
              colors: [],
            })
          }
        >
          Clear all
        </button>
      </div>
    </>
  );
};

export default FilterDropdown;
