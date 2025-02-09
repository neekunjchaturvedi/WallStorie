import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterDropdown = ({ filters, setFilters, applyFilters }) => {
  // Matching exact values from your database schema
  const spaces = [
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

  const [openSections, setOpenSections] = useState({
    price: true,
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
                setFilters((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full appearance-none h-2 rounded-full"
              style={{
                background: `linear-gradient(to right, #22c55e ${
                  (filters.price / 17500) * 100
                }%, #E5E7EB ${(filters.price / 17500) * 100}%)`,
                border: "1px solid #E5E7EB",
              }}
            />
            <p className="text-sm text-green-400">₹0 - ₹{filters.price}</p>
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
            {spaces.map((space) => (
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
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
            {trends.map((trend) => (
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
              price: "0",
              spaces: [],
              trends: [],
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
