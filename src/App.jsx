import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx"; // Navbar path'i
import FlightBooking from "./components/FlightBooking/FlightBooking.jsx";
import ServicesSidebar from "./components/ServicesSidebar/ServicesSidebar.jsx";
import MyFlights from "./components/FlightBooking/MyFlight.jsx";

// Navbar'ı sadece belirli sayfalarda göstermek için kullanıyoruz
const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="bg-gray-100">
      {/* Eğer URL '/myflights' değilse Navbar'ı göster */}
      {location.pathname !== "/myflights" && <Navbar />}
      {children}
    </div>
  );
};

function App() {
  // Price ve airline state'lerini tanımlıyoruz
  const [price, setPrice] = useState(200); // Varsayılan fiyat 200
  const [airline, setAirline] = useState("Alitalia"); // Varsayılan airline

  return (
    <Router>
      <Layout />
      <Routes>
        {/* FlightBooking route'u */}
        <Route
          path="/"
          element={
            <div className="mx-auto mt-8 flex items-start">
              {/* FlightBooking geniş yer kaplayacak */}
              <div className="w-4/5">
                <FlightBooking
                  price={price}
                  airline={airline}
                  setPrice={setPrice}
                  setAirline={setAirline}
                />
              </div>
              {/* Sağdaki sidebar */}
              <div className="w-[300px]  ">
                <ServicesSidebar />
              </div>
            </div>
          }
        />

        {/* MyFlights route'u */}
        <Route path="/myflights" element={<MyFlights />} />
      </Routes>
    </Router>
  );
}

export default App;
