import React from "react";
import { FaCar, FaHotel, FaSuitcaseRolling } from "react-icons/fa"; // Simge seti

const ServicesSidebar = () => {
  return (
    <div className="space-y-5">
      {" "}
      {/* Kartlar arasında boşluk arttırıldı */}
      {/* Araç Kiralama Kartı */}
      <div
        className="relative bg-cover bg-center rounded-lg shadow-lg h-60" // Boyut biraz büyütüldü
        style={{
          backgroundImage:
            "url('https://hvs88dzl.media.zestyio.com/shutterstock_1473155453.jpg')",
        }}
      >
        {/* Karartma katmanı */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        {/* İçerik */}
        <div className="relative p-4 text-white flex flex-col justify-end items-start h-full">
          <FaCar className="text-3xl mb-2" /> {/* İkon boyutu ayarlandı */}
          <h3 className="text-xl font-semibold">CAR RENTALS</h3>
        </div>
      </div>
      {/* Oteller Kartı */}
      <div
        className="relative bg-cover bg-center rounded-lg shadow-lg h-60"
        style={{
          backgroundImage:
            "url('https://images.trvl-media.com/lodging/80000000/79930000/79922500/79922410/3f7c285a.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        <div className="relative p-4 text-white flex flex-col justify-end items-start h-full">
          <FaHotel className="text-3xl mb-2" />
          <h3 className="text-xl font-semibold">HOTELS</h3>
        </div>
      </div>
      {/* Seyahat Paketleri Kartı */}
      <div
        className="relative bg-cover bg-center rounded-lg shadow-lg h-60"
        style={{
          backgroundImage:
            "url('https://www.outgoingtour.com/wp-content/uploads/2021/10/tour-packages.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        <div className="relative p-4 text-white flex flex-col justify-end items-start h-full">
          <FaSuitcaseRolling className="text-3xl mb-2" />
          <h3 className="text-xl font-semibold">TRAVEL PACKAGES</h3>
        </div>
      </div>
    </div>
  );
};

export default ServicesSidebar;
