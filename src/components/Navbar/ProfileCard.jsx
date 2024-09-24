import React from "react";
import avatar from "../../assets/avatar.jpeg";

function ProfileCard() {
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
}

export default ProfileCard;
