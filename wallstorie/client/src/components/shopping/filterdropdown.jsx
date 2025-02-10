import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterDropdown = ({ filters, setFilters, applyFilters }) => {
  // Constants for database values
  const space = [
    "LivingRoom",
    "BedRoom",
    "KidsRoom",
    "OfficeRoom",
    "PoojaRoom",
    "DiningRoom",
    "Balcony",
  ];

  const trends = [
    "bestseller",
    "trending",
    "popular",
    "newarrival",
    "seasonal",
  ];

  const colors = ["Red", "Blue", "Green", "Yellow", "White", "Black"];

  // State for section visibility
  const [openSections, setOpenSections] = useState({
    price: true,
    space: true,
    trends: true,
    color: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const currentValues = prev[category] || [];

      return {
        ...prev,
        [category]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const formatDisplayName = (name) => {
    return name.replace(/([A-Z])/g, " $1").trim();
  };

  const handleClearFilters = () => {
    setFilters({
      price: "0",
      space: [],
      trends: [],
      color: [],
    });
  };

  return (
    <div className="px-4 py-6">
      {/* Price Range Section */}
      <div className="border-b border-gray-300 pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <span className="font-medium">Price Range</span>
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
                setFilters((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              className="w-full appearance-none h-2 rounded-full"
              style={{
                background: `linear-gradient(to right, #22c55e ${
                  (filters.price / 17500) * 100
                }%, #E5E7EB ${(filters.price / 17500) * 100}%)`,
                border: "1px solid #E5E7EB",
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">₹0</span>
              <span className="text-sm text-green-600">₹{filters.price}</span>
            </div>
          </div>
        )}
      </div>

      {/* Colors Section */}
      <div className="border-b border-gray-300 pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("color")}
        >
          <span className="font-medium">Colors</span>
          {openSections.color ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.color && (
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            {colors.map((color) => (
              <label key={color} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.color?.includes(color)}
                  onChange={() => handleCheckboxChange("color", color)}
                  className="appearance-none w-4 h-4 border border-black checked:bg-green-400 rounded"
                />
                <span className="text-sm capitalize">{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Spaces Section */}
      <div className="border-b border-gray-300 pb-3 mb-3">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("space")}
        >
          <span className="font-medium">Spaces</span>
          {openSections.space ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {openSections.space && (
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            {space.map((space) => (
              <label key={space} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.space?.includes(space)}
                  onChange={() => handleCheckboxChange("space", space)}
                  className="appearance-none w-4 h-4 border border-black checked:bg-green-400 rounded"
                />
                <span className="text-sm">{formatDisplayName(space)}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Trends Section */}
      <div className="border-b border-gray-300 pb-3 mb-3">
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
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            {trends.map((trend) => (
              <label key={trend} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.trends?.includes(trend)}
                  onChange={() => handleCheckboxChange("trends", trend)}
                  className="appearance-none w-4 h-4 border border-black checked:bg-green-400 rounded"
                />
                <span className="text-sm capitalize">{trend}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6">
        <button
          onClick={() => {
            applyFilters({
              ...filters,
            });
          }}
          className="w-1/2 py-2 bg-green-50 border border-green-600 text-green-700 font-medium rounded-sm hover:bg-green-100 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="w-1/2 py-2 border border-gray-400 text-gray-600 font-medium rounded-sm hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;
