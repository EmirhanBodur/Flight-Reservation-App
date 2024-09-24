import React from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
} from "react-icons/fa";

const FlightSearchForm = ({
  tripType,
  setTripType,
  selectedDeparture,
  setSelectedDeparture,
  selectedArrival,
  setSelectedArrival,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  handleSubmit,
}) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-md min-w-[150px] mx-auto mb-8 border border-black">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaPlaneDeparture className="text-purple-600 text-xl mr-2" />
          <h2 className="text-2xl font-bold">BOOK YOUR FLIGHT</h2>
        </div>
        <div className="flex space-x-1">
          <button
            className={`${
              tripType === "round"
                ? "bg-purple-800 text-white"
                : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded-l-full focus:outline-none`}
            onClick={() => setTripType("round")}
          >
            Round trip
          </button>
          <button
            className={`${
              tripType === "one"
                ? "bg-purple-800 text-white"
                : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded-r-full focus:outline-none`}
            onClick={() => setTripType("one")}
          >
            One way
          </button>
        </div>
      </div>

      {/* 4 inputu aynı satıra yerleştiriyoruz */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="relative">
          <FaPlaneDeparture className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600" />
          <input
            className="w-full p-2 pl-12 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Kalkış Yeri IATA Kodunu Girin"
            onChange={(e) => setSelectedDeparture(e.target.value)}
            value={selectedDeparture}
            required
          />
        </div>

        <div className="relative">
          <FaPlaneArrival className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600" />
          <input
            className="w-full p-2 pl-12 border border-gray-300 rounded-r-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Varış Yeri IATA Kodunu Girin"
            onChange={(e) => setSelectedArrival(e.target.value)}
            value={selectedArrival}
            required
          />
        </div>

        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600" />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full p-2 pl-12 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
            min={new Date().toISOString().split("T")[0]} // Bugünün tarihi
          />
        </div>

        {tripType === "round" && (
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-800" />
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-2 pl-12 border border-gray-300 rounded-r-full focus:outline-none focus:ring-2 focus:ring-purple-800"
              required
            />
          </div>
        )}
      </div>

      <div className="text-left mt-4">
        <button
          onClick={handleSubmit}
          className="bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Show flights
        </button>
      </div>
    </div>
  );
};

export default FlightSearchForm;
