import React, { useState } from "react";
//import "./styles.css";

export default function StarRating({ limit = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleMouseEnter = (e) => {
    setHover(e);
  };
  const handleSelectedStar = (starValue) => {
    setRating((prev) => (prev == starValue ? 0 : starValue));
  };

  return (
    <div className="challenge-container">
      <div className="star-container">
        <h2>Star Rating Component</h2>
        {[...Array(limit)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={starValue}
              className={`star ${
                starValue <= (hover || rating) ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => {
                handleSelectedStar(starValue);
              }}
            >
              ★
            </span>
          );
        })}
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
}
