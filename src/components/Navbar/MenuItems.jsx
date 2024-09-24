import React from "react";
import { IoMdPricetag } from "react-icons/io"; // Fiyat etiketi simgesi
import { BsGlobe } from "react-icons/bs"; // Dünya simgesi (keşfet)

const MenuItems = ({ isResponsive }) => {
  return (
    <div className={isResponsive ? "w-full" : "flex items-center space-x-6"}>
      {/* Deals */}
      <div
        className={`flex ${
          isResponsive ? "justify-between w-full" : "items-center space-x-2"
        } text-gray-700 cursor-pointer border-b py-4`}
      >
        <div className="flex items-center space-x-2">
          <IoMdPricetag className="text-purple-600 text-xl" />
          <span>Deals</span>
        </div>
      </div>

      {/* Discover */}
      <div
        className={`flex ${
          isResponsive ? "justify-between w-full" : "items-center space-x-2"
        } text-gray-700 cursor-pointer border-b py-4`}
      >
        <div className="flex items-center space-x-2">
          <BsGlobe className="text-purple-600 text-xl" />
          <span>Discover</span>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
