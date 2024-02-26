import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import AuthService from "../../Service/AuthService";
import MultiStepProgressBar from "./MultiStepProgressBar/MultiStepProgressBar";
import SignIn from "../../components/Account/SignIn";
import Cart from "./CheckoutComponents/Cart";
import Checkout from "./CheckoutComponents/Checkout";
import CompletePayment from "./CheckoutComponents/CompletePayment";
import "react-step-progress/dist/index.css";
import "./Cart.css";

export default function RentalProgress() {
  const [page, setPage] = useState(getInitialPage());
  const [CheckOutComplete, setCheckOutComplete] = useState(false);

  function getInitialPage() {
    const user = AuthService.getCurrentUser();
    if (!user || user.roles === null) {
      return "signIn";
    }
    return "cart";
  }

  useEffect(() => {
    getInitialPage();
  }, []);

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage(getInitialPage());
        break;
      case "2":
        setPage("cart");
        break;
      case "3":
        if (getInitialPage() === "signIn") {
          setPage("signIn");
        } else {
          setPage("checkout");
        }
        break;
      case "4":
        if (CheckOutComplete) {
          setPage("Completed");
        } else {
          toast.warning("Please complete 'checkout' before proceeding.");
        }
        break;
      case "5":
        toast.fail("Ooops! Seems like went wrong.");
        break;
      default:
        setPage("signIn");
    }
  };

  const handleCheckOutComplete = (complete) => {
    setCheckOutComplete(complete);
  };

  return (
    <div className="container-sm ">
      <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
      {
        {
          signIn: <SignIn pageProgress={nextPage} />,
          cart: <Cart pageProgress={nextPage} />,
          checkout: <Checkout pageProgress={nextPage} onComplete={handleCheckOutComplete} />,
          Completed: <CompletePayment />,
        }[page]
      }
    </div>
  );
}
