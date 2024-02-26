import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReservationService from "../../../Service/ReservationService";
import authService from "../../../Service/AuthService";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import { PaymentForm } from "./PaymentForm";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import './StripePayment.css';
import { PickupInfoForm } from "./PickupInfoForm";
import { ReservationSummary } from "./ReservationSummary";

const moment = extendMoment(originalMoment);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
export default function Checkout({ pageProgress }) {

  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const id = authService.getCurrentUser().id;
  const email = authService.getCurrentUser().email;

  const [user] = useState({ id });
  const [pickupFullName, setPickupFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [showButton, setShowButton] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const startDate = new Date(localStorage.getItem("startDate"));
  const endDate = new Date(localStorage.getItem("endDate"));
  const duration = moment(endDate).diff(startDate, "days");
  const numberOfDays = duration <= 1 ? "1 day" : `${duration} days`;

  const totalPrice = cart.reduce(
    (currentSum, currentCartItem) =>
      currentSum +
      currentCartItem.quantity *
      currentCartItem.onSalePrice * (duration<= 1 ? 1 : duration) *
      (1 + 0.05 ),
    0
  ).toFixed(2);

  const CanProvince = [
    "AB",
    "BC",
    "ON",
    "NB",
    "SK",
    "QC",
    "NC",
    "MB",
    "PE",
    "MB",
    "YT",
    "NT",
    "NL",
  ];
  const SaveReservation = (e) => {
    e.preventDefault();

    const reservationInfo = {
      user,
      pickupFullName,
      address,
      city,
      country,
      province,
      zip,
      payment_Option: paymentOption,
      reservation_Status:cart[0].product.season="sales" ? "Sales" : (showPay ? "Reserved" : "Concept"),
      totalPrice,
      endDate,
      startDate,
      duration,
    };

    if (user === null) {
      navigate.push("/NotSingIn");
      return;
    }
    setSubmitted(true)
    setDisabled(true);

    ReservationService.MakeReservation(reservationInfo, id)
      .then((response) => {
        ReservationService.addCart(cart, id, email)
          .then((response) => {
            toast.success("Customer Information and Cart content saved Successfully");
            if (reservationInfo.reservation_Status === "Concept") {
              navigate("/thankYouPage");
            } else {
              pageProgress("Completed");
            }
            localStorage.removeItem("cart");
          })
          .catch((error) => {
            toast.error(
              "Error, Reservation cannot be saved due to error during cart save" + error
            );
            setSubmitted(false)
          });
      })
      .catch((error) => {
        toast.error("Error, Reservation cannot be saved" + error);
      });
  };

  useEffect(() => {
    if (id) {
      ReservationService.getReservationById(id)
        .then((response) => {
          setAddress(response.data[0].address);
          setCity(response.data[0].city);
          setCountry(response.data[0].country);
          setProvince(response.data[0].province);
          setZip(response.data[0].zip);
          setPickupFullName(response.data[0].pickupFullName);
        })
        .catch((error) => {
          toast.error("Error, customer Information cannot be found" + error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (paymentOption === "Paid") {
      setShowPay(true);
      setShowButton(false);
    } else {
      setShowPay(false);
      setShowButton(true);
    }
  }, [paymentOption]);

  return (
    <>
      <div className="container-sm ">
        <section>
          <div className="row ">
            <div className="col-md-7 order-md-1 ">
            <h2 className="header" >Pickup Info</h2>
              <form className="needs-validation pickupForm">
                <PickupInfoForm
                  paymentOption={paymentOption}
                  pickupFullName={pickupFullName}
                  address={address}
                  city={city}
                  country={country}
                  province={province}
                  zip={zip}
                  setPaymentOption={setPaymentOption}
                  setPickupFullName={setPickupFullName}
                  setAddress={setAddress}
                  setCity={setCity}
                  setCountry={setCountry}
                  setProvince={setProvince}
                  setZip={setZip}
                  submitted={submitted}
                  CanProvince={CanProvince}
                  showButton={showButton}
                  isDisabled={isDisabled}
                  SaveReservation={SaveReservation}
                />

              </form>
            </div>
            <div className="col-md-5 order-md-2 mb-4 ">


              <ReservationSummary
                cart={cart}
                numberOfDays={numberOfDays}
                duration={duration}
                totalPrice={totalPrice}
              />
              {showPay && (
                <>
                  <div className="cardPayment">
                    <h2 className="d-flex justify-content-between align-items-center header">
                    Pay with card
                    </h2>
                  </div>

                  <Elements stripe={stripePromise}>
                    <PaymentForm totalPrice={totalPrice} onSaveReservation={SaveReservation} />
                  </Elements>
                </>
              )}
            </div>

          </div>
        </section>
      </div>
    </>
  );
};
