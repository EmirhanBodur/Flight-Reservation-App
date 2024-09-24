import React, { useState } from "react";
import axios from "axios";
import airportData from "../../data/airports.json";
import { useNavigate } from "react-router-dom";
import FlightSearchForm from "./FlightSearchForm";
import FlightList from "./FlightList";
import FlightFilter from "./FlightFilter";
import loadingGif from "../../assets/loading.gif"; // Yükleme animasyonu

const FlightBooking = ({ price, airline, setPrice, setAirline }) => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]); // Uçuş verileri
  const [loading, setLoading] = useState(false); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata mesajı
  const [departureDate, setDepartureDate] = useState(""); // Kalkış tarihi
  const [selectedDeparture, setSelectedDeparture] = useState(""); // Seçilen kalkış
  const [selectedArrival, setSelectedArrival] = useState(""); // Seçilen varış
  const [tripType, setTripType] = useState("one"); // Yolculuk türü
  const [returnDate, setReturnDate] = useState(""); // Dönüş tarihi (round trip için)
  const [expandedFlightIndex, setExpandedFlightIndex] = useState(null); // Uçuş detayları için genişletilmiş index
  const [isFlightListVisible, setIsFlightListVisible] = useState(false); // Uçuşlar gösteriliyor mu

  // Uçuşu rezervasyon etme fonksiyonu
  const handleBookFlight = async (flight) => {
    try {
      const flightData = {
        flightNumber: flight.flightNumber || "N/A",
        airline,
        departureAirport: flight.prefixIATA,
        arrivalAirport: flight.route.destinations[0],
        departureTime: flight.scheduleDateTime,
        arrivalTime: flight.estimatedLandingTime,
        flightName: flight.flightName || "UNKNOWN",
        route: `${getAirportName(selectedDeparture)} - ${getAirportName(
          selectedArrival
        )}`,
      };

      const response = await axios.post(
        "http://localhost:5000/api/flights/add",
        flightData
      );
      console.log("Flight booked successfully:", response.data);
      navigate("/myflights");
    } catch (error) {
      console.error("Error booking flight:", error);
    }
  };

  // Havaalanı isimlerini IATA kodundan al
  const getAirportName = (iataCode) => {
    const airport = airportData.find(
      (airport) => airport.iata === iataCode.toUpperCase()
    );
    return airport ? airport.name : iataCode;
  };

  // Uçuşları API'den çekme fonksiyonu (5 saniye gecikmeli)
  const fetchFlights = async () => {
    setLoading(true);
    setError(null); // Önceki hataları temizle

    try {
      const response = await axios.get("http://localhost:5000/api/flights", {
        params: {
          departure: selectedDeparture,
          arrival: selectedArrival,
          date: departureDate,
        },
      });

      const allFlights = response.data.flights || [];

      // Uçuşları filtreleme
      const filteredFlights = allFlights.filter((flight) => {
        const departureMatches =
          flight.prefixIATA === selectedDeparture.toUpperCase();
        const arrivalMatches = flight.route.destinations.includes(
          selectedArrival.toUpperCase()
        );
        return departureMatches && arrivalMatches;
      });

      setTimeout(() => {
        setFlights(filteredFlights.length > 0 ? filteredFlights : []);
        setError(filteredFlights.length > 0 ? null : "Uçuş bulunamadı.");
        setIsFlightListVisible(filteredFlights.length > 0); // Eğer uçuş varsa FlightFilter'ı göster
        setLoading(false); // Yüklemeyi bitir
      }, 5000); // 5 saniye gecikme
    } catch (error) {
      setTimeout(() => {
        setError("Uçuş bulunamadı.");
        setIsFlightListVisible(false); // Hata varsa FlightFilter'ı gizle
        setLoading(false); // Yüklemeyi bitir
      }, 5000); // 5 saniye gecikme
    }
  };

  // Form submit fonksiyonu
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDeparture || !selectedArrival || !departureDate) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    fetchFlights();
  };

  return (
    <div className="p-8 relative">
      {/* Uçuş arama formu */}
      <FlightSearchForm
        tripType={tripType}
        setTripType={setTripType}
        selectedDeparture={selectedDeparture}
        setSelectedDeparture={setSelectedDeparture}
        selectedArrival={selectedArrival}
        setSelectedArrival={setSelectedArrival}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        handleSubmit={handleSubmit}
      />

      {/* Yükleme, hata ve uçuş listesi */}
      {loading ? (
        <>
          {/* Arka planı karartan overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

          {/* Loading GIF */}
          <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
            <img src={loadingGif} alt="Loading..." className="w-42 h-36" />
          </div>
        </>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : flights.length > 0 ? (
        <div className="flex mt-8">
          {/* Flight List Section */}
          <div className="w-3/4 pr-4">
            <FlightList
              flights={flights}
              selectedDeparture={selectedDeparture}
              selectedArrival={selectedArrival}
              expandedFlightIndex={expandedFlightIndex}
              toggleDetails={setExpandedFlightIndex}
              handleBookFlight={handleBookFlight}
              price={price}
              airline={airline}
              getAirportName={getAirportName}
            />
          </div>

          {/* Flight Filter Section */}
          <div className="w-1/4 pl-4">
            <FlightFilter setPrice={setPrice} setAirline={setAirline} />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Uçuş bulunamadı.</div>
      )}
    </div>
  );
};

export default FlightBooking;
