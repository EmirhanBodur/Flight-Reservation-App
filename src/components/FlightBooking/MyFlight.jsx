import React, { useEffect, useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";
import StarRating from "./StarRating";

function MyFlight() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/flights/getAll"
        );
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="flex justify-between items-center p-4 bg-white shadow-md mb-6 flex-wrap">
        <div className="flex flex-wrap space-x-2 items-center">
          {["Times", "Stops", "Airlines", "Airports", "Amenities"].map(
            (filter) => (
              <button
                key={filter}
                className="px-4 py-2 border-2 border-gray-300 rounded-md"
              >
                {filter}
              </button>
            )
          )}
          <div className="text-blue-600 ml-4">Edit Search</div>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {[2.5, 3, 4, 4.5, 5].map((rating, index) => (
            <StarRating key={index} rating={rating} />
          ))}
        </div>
      </div>

      <div className="bg-gray-100 py-4 px-6 flex justify-between items-center mb-4 flex-wrap">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 font-medium">Sort by:</span>
          <select className="text-black font-semibold cursor-pointer">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Duration: Shortest</option>
          </select>
        </div>
        <div className="flex items-center space-x-1 mt-4 md:mt-0">
          <span className="text-blue-500 text-xl">ℹ</span>
          <span className="text-gray-600">Avg Fare:</span>
          <span className="text-black font-semibold">$225</span>
        </div>
      </div>

      <div className="space-y-4">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight._id} flight={flight} />
          ))
        ) : (
          <div className="text-center text-gray-500">No flights available.</div>
        )}
      </div>
    </div>
  );
}

export default MyFlight;
