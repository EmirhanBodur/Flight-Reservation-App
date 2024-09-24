import React from "react";

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const isFullStar = index < rating;
        const starClass = isFullStar ? "text-yellow-500" : "text-gray-300";

        return (
          <span key={index} className={`${starClass} text-xl`}>
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
