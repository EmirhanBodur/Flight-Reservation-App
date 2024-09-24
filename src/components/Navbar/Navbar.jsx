import React, { useState } from "react";
import Logo from "./Logo.jsx"; // Logo bileşeni
import MenuItems from "./MenuItems.jsx"; // Menü başlıkları
import LoginButton from "./LoginButton.jsx"; // Giriş yap butonu
import { FaBars } from "react-icons/fa"; // Hamburger menü ikonu
import ProfileCard from "./ProfileCard.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4  ">
      {/* Logo solda */}
      <Logo />

      {/* Menü ve Giriş Yap Butonu - büyük ekranlarda yan yana olacak */}
      <div className="hidden md:flex items-center space-x-6">
        <MenuItems isResponsive={false} /> {/* Deals ve Discover */}
        <ProfileCard />
      </div>

      {/* Hamburger menü ikonu ve LoginButton - küçük ekranlarda yan yana olacak */}
      <div className="flex items-center space-x-4 md:hidden">
        <button className="text-purple-600 text-2xl" onClick={toggleMenu}>
          <FaBars />
        </button>
        <LoginButton />
      </div>

      {/* Hamburger menü içeriği - küçük ekranlarda açılacak */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 bg-white border border-gray-300 shadow-lg rounded-lg z-50 w-full md:hidden">
          {/* Küçük ekranlarda menü öğeleri alt alta olacak */}
          <div className="flex flex-col items-start space-y-4 p-4">
            <MenuItems isResponsive={true} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
