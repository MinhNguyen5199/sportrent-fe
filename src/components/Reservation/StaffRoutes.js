import React from "react";
import { Route, Routes } from "react-router-dom";
import ReservationList from "./pages/TableList/ReservationList";
import Reservation, { NewReservation } from "./pages/Reservation1";
import { withRouter } from "../../constants/WithRouter";

import CustomerPickup from "./pages/TableList/PickupReservation";
import CustomerReturn from "./pages/TableList/Returns";
import Transactions from "./pages/TableList/TransactionList";
import { ReservationCalender } from "./pages/TableList/ReservationCalender";

function StaffRoutes() {
  return (
    <React.Fragment>
      <section>
        <Routes>
          <Route path="/" exact element={<ReservationCalender />} />
          <Route path="/reservation/:id" element={<Reservation />} />
          <Route path="/reservationList" element={<ReservationList />} />

          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reservationCalender" element={<ReservationCalender />} />
          <Route path="/cust-reservation/:id" element={<CustomerPickup />} />
          <Route path="/cust-return/:id" element={<CustomerReturn />} />
          <Route path="/newReservation" element={<NewReservation />} />

        </Routes>
      </section>
    </React.Fragment>
  );
}

export default withRouter(StaffRoutes);
