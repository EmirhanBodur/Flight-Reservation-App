import React from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";

const FlightList = ({
  flights,
  selectedDeparture,
  selectedArrival,
  expandedFlightIndex,
  toggleDetails,
  handleBookFlight,
  price,
  airline,
  getAirportName,
}) => {
  return (
    <ul className="space-y-4">
      {flights && flights.length > 0 ? (
        flights.map((flight, index) => (
          <li
            key={index}
            className="bg-white min-h-64 shadow-md rounded-lg p-6 mb-4 flex flex-col lg:flex-row justify-between items-center border border-gray-200 relative"
          >
            {/* Kalkış ve Varış Noktalarının İsimleri */}
            <div className="text-xl font-semibold mt-4 mb-6 absolute top-2 left-5">
              {selectedDeparture && selectedArrival && (
                <>
                  {getAirportName(selectedDeparture)} -{" "}
                  {getAirportName(selectedArrival)}
                </>
              )}
            </div>

            {/* Sol kısım - Kalkış Bilgileri */}
            <div className="flex flex-col mt-4 items-start space-y-2">
              <span className="text-gray-500 text-sm flex items-center">
                <FaPlaneDeparture className="mr-1" /> Departure
              </span>
              <span className="text-xl font-semibold">
                {new Date(flight.scheduleDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-gray-500 text-sm">
                Airport: {flight.prefixIATA}
              </span>

              <span className="text-lg font-semibold text-purple-700 mt-4">
                Price: {price}
              </span>
              <span className="text-sm text-gray-500">Round Trip</span>
            </div>

            {/* Orta kısım - Çizgi ve Havayolu Bilgileri */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-20 border-t border-gray-400"></div>

              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold">{airline}</span>
                <FaPlane className="text-purple-600 text-lg my-2" />
                <span className="text-sm text-gray-500">
                  {flight.estimatedLandingTime
                    ? "0h 8m (nonstop)"
                    : "Nonstop flight"}
                </span>
              </div>

              <div className="w-20 border-t border-gray-400"></div>
            </div>

            {/* Sağ kısım - Varış Bilgileri */}
            <div className="flex flex-col items-end space-y-2">
              <span className="text-gray-500 text-sm flex items-center">
                <FaPlaneArrival className="mr-1" /> Arrival
              </span>
              <span className="text-xl font-semibold">
                {new Date(flight.estimatedLandingTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className="text-gray-500 text-sm">
                Airport: {flight.route && flight.route.destinations[0]}
              </span>
            </div>

            <button
              onClick={() => handleBookFlight(flight)}
              className="bg-purple-600 text-white px-6 py-2 rounded-md shadow hover:bg-purple-700 absolute right-0 bottom-0"
            >
              Book Flight
            </button>

            <button
              onClick={() => toggleDetails(index)}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:underline text-sm mt-4 absolute left-0 top-60"
            >
              Check the details
            </button>

            {expandedFlightIndex === index && (
              <div className="bg-gray-100 p-4 mt-4 rounded-md w-full absolute bottom-[-210px] left-0 border ">
                <h3 className="text-lg font-semibold mb-2">Flight Details:</h3>
                <p>
                  Flight Number:{" "}
                  {new Date(flight.scheduleDateTime).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  ) || "N/A"}
                </p>
                <p>Flight Name: {flight.flightName || "N/A"}</p>
                <p>Airline Code: {flight.airlineCode || "N/A"}</p>
              </div>
            )}
          </li>
        ))
      ) : (
        <li className="text-center text-gray-500">Uçuş bulunamadı.</li>
      )}
    </ul>
  );
};

export default FlightList;
