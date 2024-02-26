import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthService from "./Service/AuthService";
import "./App.css";
import "./Styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import CategoryProvider  from './ContextAPI/CategoryProvider';
import NavBar from "./components/Header/Navbar";
import SignUp from "./components/Account/SignUp";
import SignIn from "./components/Account/SignIn";
import ForgotPassword from "./components/Account/ForgotPassword";
import UpdatePassword from "./components/Account/UpdatePassword";
import ResetConfirmation from "./components/Account/ResetConfirmation";
import Home from "./components/HomePage/Home";
import Profile from "./components/User/Profile";
import UserAccount from "./components/Account/UserAccount";
import Rental from "./components/RentalProducts/Rental";
import ProductView from "./components/Product/ProductView";
import SearchProduct from "./components/Search/SearchProduct";
import RentalProgress from "./components/Checkout/RentalProgress";
import ThankYouPage from "./components/Checkout/ThankYouPage";
import OrderHistory from "./components/Checkout/OrderHistory";
import ManagerLayout from "./components/Inventory/ManagerLayout";
import StaffLayout from "./components/Reservation/StaffLayout";
import Services from "./components/Pages/Services";
import ContactUs from "./components/Pages/ContactUs";
import LocationHours from "./components/Pages/LocationHours";
import FooterComponent from "./components/Footer/Footer";
import NotFoundPage from "./components/404/NotFoundPage";
import ShoppingCart from "./components/RentalProducts/ShoppingCart/ShoppingCart";
import Account from "./components/Account/Account";
import { ProductOnSale } from "./components/HomePage/ProductOnSale";
import Sales from "./components/Pages/Sales";
const App = () => {
  const [showStaff, setShowStaff] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    // Fetch the current user and update the state
    const fetchCurrentUser = async () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setShowStaff(user.roles.includes("ROLE_MODERATOR"));
        setShowManager(user.roles.includes("ROLE_ADMIN"));
      }
    };

    fetchCurrentUser();
  }, []);

 

  return (
    <Router>
      {/* Render the navigation bar */}
      <CategoryProvider >   
         <NavBar />
</CategoryProvider>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer autoClose={3000} position="top-center" className="toast-container" toastClassName="dark-toast" />

      {/* Main container for the app */}
      <div className="container-fluid p-0 app_container">
        <React.Fragment>
          <Routes>
            {/* Routes for different components */}
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ForgotPassword/:id" element={<UpdatePassword />} />
            <Route path="/edit-user/:id" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/add-user" element={<SignUp />} />
            <Route path="/userAccount" element={<UserAccount />} />
            <Route path="/resetConfirmation" element={<ResetConfirmation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Rentals/:id" element={<Rental />} />
            <Route path="/Rentals/:season" element={<Rental />} />
            <Route path="/Rentals" element={<Rental />} />
            <Route exact path="/productView/:parameter" element={<ProductView />} />
            <Route exact path="/searchProduct/:searchValue" element={<SearchProduct />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/cart" element={<RentalProgress />} />
            <Route path="/thankYouPage" element={<ThankYouPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/Sales" element={<Sales />} />
            <Route path="/Location-Hours" element={<LocationHours />} />
            <Route path="/shoppingCart" element={<ShoppingCart />} />
            <Route path="/shoppingCart/:id" element={<ShoppingCart />} />
            <Route path="/shoppingCart/:season" element={<ShoppingCart />} />


            {/* Access pages with manager privilege */}
            {showManager && <Route path="/managerLayout/*" element={<ManagerLayout />} />}

            {/* Access pages with Staff privilege */}
            {showStaff && <Route path="/StaffLayout/*" element={<StaffLayout />} />}

            {/* Fallback route for 404 Not Found page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Fragment>
      </div>

      {/* Render the footer */}
      <FooterComponent />
    </Router>
  );
}

export default App;
