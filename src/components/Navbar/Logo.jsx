import React from "react";
import { FaPlaneDeparture } from "react-icons/fa"; // Uçak simgesi
import flightLogo from "../../assets/flightlogo.png";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img src={flightLogo} className="h-11 w-11" />
      <h1 className="text-lg font-bold text-gray-800">PLANE SCAPE</h1>
    </div>
  );
};

export default Logo;
