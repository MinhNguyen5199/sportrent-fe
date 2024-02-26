import React, { useState, useEffect } from "react";
import ReservationService from "../../../../Service/ReservationService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
const localizer = momentLocalizer(moment);

export const ReservationCalender = () => {
  const [reservation, setReservation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getReservation();
  }, []);

  const getReservation = () => {
    ReservationService.getReservation()
      .then((response) => {
        const reservations = response.data
          .filter(
            (r) =>
              r.reservation_Status === "Reserved" ||
              r.reservation_Status === "Return"
          )
          .map((r) => ({
            start: new Date(r.startDate),
            end: new Date(r.startDate),
            title: `${r.pickupFullName}\nStatus: ${r.reservation_Status}`,
            id: r.id,
          }));

        setReservation(reservations);
      })
      .catch((error) => {
        console.log("Error loading reservations", error);
      });
  };

  const onSelectEvent = (event) => {
    navigate(`/StaffLayout/cust-reservation/${event.id}`);
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col-sm-12">
          <div className="page-title-box">
            <h4 className="font-size-18">Calendar</h4>
          </div>
        </div>

      
      </div>

      <div>
        <Calendar
          localizer={localizer}
          events={reservation}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={onSelectEvent}
          // add key prop to each event
          eventPropGetter={(event) => ({
            className: "",
            style: { backgroundColor: event.color },
            key: event.id,
          })}
        />
      </div>
    </>
  );
};
