import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
// date range and duration
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

export const RentalCalender = ({ onNumberOfDaysChange }) => {
 // Check if startDate and endDate exist in localStorage
let storedStartDate = localStorage.getItem("startDate");
let storedEndDate = localStorage.getItem("endDate");

// Set up state for pickup date, return date, and number of days
const [pickup, setPickup] = useState(
  storedStartDate ? new Date(storedStartDate) : new Date()
);
const [returns, setReturns] = useState(
  storedEndDate ? new Date(storedEndDate) : new Date()
);
  const [numberOfDays, setNumberOfDays] = useState(0);

// Set startDate and endDate in localStorage if they are not already set or there is any change to the dates
useEffect(() => {
  
    localStorage.setItem("startDate", pickup.toISOString().split("T")[0]);

    localStorage.setItem("endDate", returns.toISOString().split("T")[0]);
  
}, [pickup, returns, storedStartDate, storedEndDate]);

  // Calculate number of days between pickup and return dates when either date changes
  useEffect(() => {
    const duration = moment(returns).diff(pickup, "days");
    setNumberOfDays(duration <= 1 ? 1 : duration);
  }, [returns, pickup]);

  // Call onNumberOfDaysChange callback when number of days changes
  useEffect(() => {
    onNumberOfDaysChange(numberOfDays);
  });

  // Set clearIcon to null to remove the X icon from the date picker
  const customClearIcon = null;
  // Render the rental calendar form with two date pickers
  return (
   
    <div className="booking-form ">
      <form>
        <div className="row mt-2 ml-4">
        <div className="col-sm-3 ml-0">
        <span className="calender-header ">Location</span>
        <i className="fa fa-map-marker "></i>
        <span className="calender-content"> Calgary, AB</span> 
        
        </div>

          <div className="col-sm-3 ">
            <div className="form-group pickup-date">
              <span className="calender-header ">Pick-Up Date</span>
              {/* Pass customClearIcon to clearIcon prop to remove X icon */}
              <DatePicker
                onChange={(date) => setPickup(date)}
                value={pickup}
                className="calender-content"
                clearIcon={customClearIcon}
                // format="yyyy-MM-dd"
                calendarIcon={<i className="fa fa-calendar"></i>}
                startDate={pickup}

               
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group return-date">
              <span className="calender-header">Return Date</span>
              {/* Pass customClearIcon to clearIcon prop to remove X icon */}
              <DatePicker
                onChange={(date) => setReturns(date)}
                value={returns}
                className=" calender-content"
                clearIcon={customClearIcon}
                // format="yyyy-MM-dd"
                calendarIcon={<i className="fa fa-calendar"></i>}
                startDate={returns}
              />
            </div>
          </div>
          <div className="col-sm-3">
          <button type="button" className=" mt-2 productBtn" >
          Rental Period</button>
</div>
         </div>
            {numberOfDays > 0 && (
              <span className="duration">The duration of your rental period is &nbsp; <strong> { numberOfDays} </strong> &nbsp;   days .</span>
            )}
        
      </form>
    </div>
  );
};
