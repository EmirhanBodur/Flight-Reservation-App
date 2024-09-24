import React, { useState } from "react";

const FlightFilter = ({ setPrice, setAirline }) => {
  const [sortOption, setSortOption] = useState("Lowest Price");
  const [selectedTime, setSelectedTime] = useState("morning");
  const [selectedStop, setSelectedStop] = useState("nonstop");
  const [selectedAirline, setSelectedAirline] = useState("Alitalia");

  const airlinePrices = {
    Alitalia: 230,
    Lufthansa: 250,
    "Air France": 220,
    "Brussels Airlines": 240,
    "Air Italy": 260,
    Siberia: 270,
    "Air Europa": 210,
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleStopChange = (e) => {
    setSelectedStop(e.target.value);
  };

  const handleAirlineChange = (e) => {
    const value = e.target.value;
    setSelectedAirline(value);

    if (airlinePrices[value]) {
      setPrice(airlinePrices[value]);
      setAirline(value);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Sort by */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Sort by:</label>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="block w-full border border-gray-300 rounded-md p-2"
        >
          <option>Lowest Price</option>
          <option>Highest Price</option>
          <option>Earliest Departure</option>
          <option>Latest Departure</option>
        </select>
      </div>

      {/* Arrival Time */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Arrival Time
        </label>
        <div className="flex flex-col">
          <label className="flex items-center">
            <input
              type="radio"
              value="morning"
              checked={selectedTime === "morning"}
              onChange={handleTimeChange}
              className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
              style={{
                accentColor: "#6B46C1", // Mor renk
              }}
            />
            5:00 AM - 11:59 AM
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="afternoon"
              checked={selectedTime === "afternoon"}
              onChange={handleTimeChange}
              className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
              style={{
                accentColor: "#6B46C1", // Mor renk
              }}
            />
            12:00 PM - 5:59 PM
          </label>
        </div>
      </div>

      {/* Stops */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Stops</label>
        <div className="flex flex-col">
          <label className="flex items-center justify-between">
            <span className="flex items-center">
              <input
                type="radio"
                value="nonstop"
                checked={selectedStop === "nonstop"}
                onChange={handleStopChange}
                className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
                style={{
                  accentColor: "#6B46C1", // Mor renk
                }}
              />
              Nonstop
            </span>
            <span>$230</span>
          </label>
          <label className="flex items-center justify-between">
            <span className="flex items-center">
              <input
                type="radio"
                value="1stop"
                checked={selectedStop === "1stop"}
                onChange={handleStopChange}
                className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
                style={{
                  accentColor: "#6B46C1", // Mor renk
                }}
              />
              1 Stop
            </span>
            <span>$230</span>
          </label>
          <label className="flex items-center justify-between">
            <span className="flex items-center">
              <input
                type="radio"
                value="2stop"
                checked={selectedStop === "2stop"}
                onChange={handleStopChange}
                className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
                style={{
                  accentColor: "#6B46C1", // Mor renk
                }}
              />
              2+ Stops
            </span>
            <span>$230</span>
          </label>
        </div>
      </div>

      {/* Airlines Included */}
      <div>
        <label className="block text-gray-700 font-bold mb-2">
          Airlines Included
        </label>
        <div className="flex flex-col">
          {Object.keys(airlinePrices).map((airline) => (
            <label
              key={airline}
              className="flex items-center justify-between mb-2"
            >
              <span className="flex items-center">
                <input
                  type="radio"
                  value={airline}
                  checked={selectedAirline === airline}
                  onChange={handleAirlineChange}
                  className="mr-2 h-4 w-4 accent-purple-700 border border-purple-800 rounded-full appearance-none checked:bg-purple-700 checked:border-purple-700"
                  style={{
                    accentColor: "#6B46C1", // Mor renk
                  }}
                />
                {airline}
              </span>
              <span>${airlinePrices[airline]}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightFilter;
