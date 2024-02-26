import React from "react";

const RentalDays = ({ days, focusIndex, handleDaysClick }) => {
  return (
    <>
      {days.map((day, index) => (
        <div
          key={day}
          className={`day ${index === focusIndex ? "focus" : ""}`}
          onClick={() => handleDaysClick(index)}
        >
          {day}
        </div>
      ))}
    </>
  );
};

export default RentalDays;
