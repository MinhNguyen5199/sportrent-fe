import React, { useState } from "react";


const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  const renderStars = () => {
    const stars = [];
    const maxRating = 5;
  
    for (let i = 1; i <= maxRating; i++) {
      let starClass = "star";
      if (i <= (hoverRating || rating)) {
        starClass += " filled";
      }
  
      stars.push(
        <span
          key={i}
          className={starClass}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          ★
        </span>
      );
    }
  
    return stars;
  };

  return(
    
    <><div className="star-rating">{renderStars()} </div>
    <span className="availability">&nbsp;&nbsp;100% recommended</span>
    </>);
};

export default StarRating;
