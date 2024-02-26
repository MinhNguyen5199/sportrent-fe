import React, { useState, useEffect } from "react";
import ReservationService from "../../../../Service/ReservationService";
import { TablePagination, TableRow, TableFooter, Button } from "@mui/material";
import Create from "@mui/icons-material/Add";
import Export from "@mui/icons-material/FileDownload";
// notifier
 import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  }).format(value);



// Test Data, IMPORT FROM DATABASE AFTER
const ReservationList = () => {
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    getReservation();
  }, []);
  //get all
  const getReservation = () => {
    ReservationService.getReservation()
      .then((response) => {
        setReservation(response.data);
      })
      .catch((error) => {
        //toast.error("Error, Loading Reservation" + error);
      });
  };
  // update selected
  const updateReservation = (category_id) => {
    ReservationService.updateReservation(category_id)
      .then((response) => {
        getReservation();
        toast.success("Reservation  updated Successfully");
      })
      .catch((error) => {
        toast.error("Error, Reservation Updated was is not successful" + error);
      });
  };
  // Search by Keyword
  const { searchTerm } = useState([]);
  // display all if the search team is empty other wise display based on the search term

  const searchReservation = (keyword) => {
    if (keyword === "") {
      getReservation();
    } else {
      ReservationService.searchReservation(keyword)
        .then((response) => {
          setReservation(response.data);
        })
        .catch((error) => {
          toast.error("Error, During Reservation search" + error);
        });
    }
  };

  // table pagination
  const [page, setPage] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const statusBadge = (status) => {
    //const isLoggedIn = this.state.isLoggedIn;
    let badge;
    badge =
      status === "Reserved"
        ? "badge badge-soft-success m-1"
        : // ? "badge bg-primary p-2"
        status === "Pickup"
        ? "badge badge-soft-warning m-1"
        : status === "Return"
        ? "badge bg-secondary m-1"
        : status === "Cancel"
        ? "badge badge-soft-danger m-1"
        : "badge bg-dark m-1";

    return (
      <div>
        <span className={badge}>{status}</span>
      </div>
    );
  };

  //Instanciate CSV HEADERS
  const headers = [
    { label: "Reservation Code", key: "reservation_Code" },
    { label: "Customer Name", key: "pickupFullName" },
    { label: "Status", key: "reservation_Status" },
    { label: "Pick up", key: "startDate" },
    { label: "Return", key: "endDate" },
    { label: "Duration", key: "duration" },
    { label: "Grand Total", key: "totalPrice" },
  ];
  return (
    <div className="container-xl">
      
        <div className="row ">
          <div className="col-sm header">
            <div className="page-title-box">
            <h4 className="card-title">Reservation History</h4>
          {/* <p className="card-title-desc">Customer reservation history </p> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-6 header">
            <div className="dataTables_length">
              <Button
                className="me-2"
                variant="outlined"
                startIcon={<Create />}
              >
                <a href={`/StaffLayout/newReservation`}> Create </a>
              </Button>
              <CSVLink
                data={reservation}
                headers={headers}
                filename={"sr-products.csv"}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" startIcon={<Export />}>
                  Export
                </Button>
              </CSVLink>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 text-end mt-3">
            <div id="datatable_filter" className="dataTables_filter">
              <label> 
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search&hellip; By code or Customer Name"
                  aria-controls="datatable"
               width={100}
                  value={searchTerm}
                 onChange={(e) => searchReservation(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div
        id="datatable_wrapper"
        className="dataTables_wrapper dt-bootstrap4 no-footer"
      >
        <table
          className="table table-bordered table-hover table-striped"
          id="dataTable"
          width="100%"
          cellspacing="0"
          data-page-length="3"
          data-order=" [[2, 'asc']] "
        >
          <thead>
            <tr>
              <th className="th-sm">Reservation Code</th>
              <th className="th-sm">Customer</th>
              <th className="th-sm text-align-center">Status</th>
              <th className="th-sm">Pickup</th>
              <th className="th-sm">Return</th>
              <th className="th-sm text-align-center">Duration</th>
              <th className="th-sm text-align-center">Total Amount</th>
              <th className="th-sm text-align-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? reservation.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : reservation
            ).map((reservations, index) => (
              <tr key={reservations.reserveId}>
                <th scope="row">{reservations.reservation_Code}</th>
                <td>{reservations.pickupFullName}</td>
                <td className="">
                  {statusBadge(reservations.reservation_Status)}
                </td>
                <td>{reservations.startDate}</td>
                <td>{reservations.endDate}</td>
                <td className="text-align-center">{reservations.duration}</td>
                <td className="text-align-right">
                  {numberFormat(reservations.totalPrice)}
                </td>
                <td className="text-align-center">
                  <div className="trn-btn-grp">
                    <div
                      className={
                        reservations.reservation_Status === "Reserved"
                          ? "trn-btn-show"
                          : "trn-btn-hide"
                      }
                    >
                      <a
                        href={`/StaffLayout/cust-reservation/${reservations.id}`}
                      >
                        <span className="trn-btn trn-btn-pu">Pickup</span>
                      </a>
                    </div>

                    {/* */}
                    <div
                      className={
                        reservations.reservation_Status === "Pickup"
                          ? "trn-btn-show"
                          : "trn-btn-hide"
                      }
                    >
                      <a href={`/StaffLayout/cust-return/${reservations.id}`}>
                        <span className="trn-btn trn-btn-pu">Return</span>
                      </a>
                    </div>
                    <div
                      className={
                        reservations.reservation_Status === "Reserved"
                          ? "trn-btn-show"
                          : "trn-btn-hide"
                      }
                    >
                      <a href={`/StaffLayout/cust-return/${reservations.id}`}>
                        <span className="trn-btn trn-btn-ca">Cancel</span>
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="right">
          <TableFooter className="text-end">
            <TableRow>
              <TablePagination
                count={reservation.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage={<span>Rows:</span>}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page}`;
                }}
                backIconButtonProps={{
                  color: "primary",
                }}
                nextIconButtonProps={{ color: "primary" }}
                SelectProps={{
                  inputProps: {
                    "aria-label": "page number",
                  },
                }}
                showFirstButton={true}
                showLastButton={true}
              />
            </TableRow>
          </TableFooter>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
