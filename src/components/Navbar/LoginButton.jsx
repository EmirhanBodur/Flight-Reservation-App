import React, { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Telefon input stili
import avatar from "../../assets/avatar.jpeg";

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [phone, setPhone] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Modal dışına tıklanıldığında modalı kapatan useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Eğer tıklanan alan modalın dışındaysa modalı kapatır.
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Eğer modal açık ise tıklama olayını dinlemeye başlar
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Modal kapalı ise tıklama olayını dinlemeyi bırakır.
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // isOpen state'i değiştiğinde bu useEffect yeniden çalışır.

  return (
    <div className="flex items-center bg-gray-100 p-4 rounded-lg ">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          src={avatar}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <div className="ml-4">
        <h3 className="text-md  text-gray-700">Joane Smith</h3>
      </div>
    </div>
  );
};

export default LoginButton;
