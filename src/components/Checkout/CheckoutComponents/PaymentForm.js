// import React, { useState } from "react";
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router";

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       lineHeight: "20px",
//       color: "#212529",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#aab7c4",
//         width: "100%",
//       },
//     },
//     invalid: {
//       color: "#fa755a",
//       iconColor: "#fa755a",
//     },
//   },
// };

// const CheckoutForm = ({ onSubmit, totalPrice }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     if (!stripe || !elements) {
//       // Stripe or Elements not loaded yet
//       return;
//     }

//     const cardElement = elements.getElement(CardNumberElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//       billing_details: {
//         name,
//         email,
//       },
//     });

//     setLoading(false);

//     if (error) {
//       setErrorMsg(error.message);
//       return;
//     }

//     onSubmit(paymentMethod.id, totalPrice);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="row">
//         <div className="col-md-6 mb-2">
//           <label htmlFor="cc-name">Name on card</label>
//           <input
//             id="cc-name"
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="col-md-6 mb-2">
//           <label htmlFor="cc-email">Email</label>
//           <input
//             id="cc-email"
//             type="text"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-12 mb-2">
//           <label htmlFor="cc-number">Card Number</label>
//           <CardNumberElement
//             id="cc-number"
//             className="form-control"
//             options={CARD_ELEMENT_OPTIONS}
//           />
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-6 mb-2">
//           <label htmlFor="expiry">Expiration Date</label>
//           <CardExpiryElement
//             id="expiry"
//             className="form-control"
//             options={CARD_ELEMENT_OPTIONS}
//           />
//         </div>
//         <div className="col-md-6 mb-2">
//           <label htmlFor="cvc">CVC</label>
//           <CardCvcElement
//             id="cvc"
//             className="form-control"
//             options={CARD_ELEMENT_OPTIONS}
//           />
//         </div>
//       </div>

//       <button className="btn btn-primary bg-dark w-100" type="submit" disabled={loading}>
//         {loading ? (
//           <div className="spinner-border spinner-border-sm text-white bg-black" role="status"></div>
//         ) : (
//           `PAY $${totalPrice}`
//         )}
//       </button>
//       {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
//     </form>
//   );
// };

// export const PaymentForm = ({ totalPrice }) => {
//   const navigate = useNavigate();

//   async function handleToken(amount) {
//     await axios
//       .post(
//         process.env.REACT_APP_API_SP_URL + "/api/payment/charge", {


//           amount: amount
//                         }

//       )
//       .then(() => {
//         toast.success("Reservation payment was successful");
//         navigate("/thankYouPage");
//       })
//       .catch((error) => {
//         toast.error("Error, Reservation could not be saved due to a payment error: " + error.message);
//       });
//   }


//   return <CheckoutForm onSubmit={handleToken} totalPrice={totalPrice} />;
// };



import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";


export const PaymentForm = ({ totalPrice, onSaveReservation }) => {
  const [loading, setLoading] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();

  async function handleToken(token, amount,event) {
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_SP_URL + "/api/payment/charge",
        "",
        {
          headers: {
            token: token.id,
            amount: amount,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Reservation payment Successful");
        onSaveReservation(event);
      } else {
        toast.error("Payment failed: " + response.data);
      }
    } catch (error) {
      toast.error("Error, Reservation cannot be saved due to payment error" + error);
         }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe or Elements not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      toast.error("Error processing payment: " + error.message);
    } else {
      handleToken(token, totalPrice, event);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render the CardElement provided by `react-stripe-js` */}

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#fa755a",
            },
          },
          hidePostalCode: true,
          classes: {
            base: 'custom-card-element',
            complete: 'complete',
            empty: 'empty',
            focus: 'focus',
            invalid: 'invalid',
          },
        }}
        className="custom-card-element"
      />

      {/* Render the submit button */}
      <hr className="mb-4" />
        <button className="btn btn-black w-100" type="submit" disabled={loading}>
          {loading ? <div className="spinner-border spinner-border-sm text-light" role="status"></div> : `PAY $${totalPrice}`}
        </button>
      
    </form>
  );
};