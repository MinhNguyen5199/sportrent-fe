import React, { useState, useEffect } from "react";
import { useCategoryList } from "../../ContextAPI/CategoryProvider"
import AuthService from "../../Service/AuthService";

export const Links = ({ user }) => {
  const [showStaff, setShowStaff] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setShowStaff(user.roles.includes("ROLE_MODERATOR"));
      setShowManager(user.roles.includes("ROLE_ADMIN"));
    }
  }, [user]);


  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const categories = useCategoryList();

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };
  return (
    <>
        <div className="kh-nav__shop k-flyout ">
        <div className="dropdown">
          <a onClick={toggleDropdown} className="dropdown-button kh-nav__shop-link k-flyout__toggle"  >
            All Category
            <svg id="down-arrow" class="kh-nav__shop-arrow icon icon--arrow-down-thick" width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
              <g class="icon__path" fill="#231F20" fill-rule="evenodd">
                <path d="M15.75 8.875h-5.499v4.126L7.5 13l5.501 5.501 5.5-5.5-2.75-.001z"></path>
                <path d="M13 21.25c-4.55 0-8.25-3.7-8.25-8.25S8.45 4.75 13 4.75s8.25 3.7 8.25 8.25-3.7 8.25-8.25 8.25M13 2C6.925 2 2 6.925 2 13s4.925 11 11 11 11-4.925 11-11S19.075 2 13 2"></path>
              </g>
            </svg>
          </a>
          {isDropdownOpen && (
            <ul className="k-flyout__list">
              <li className="k-flyout__column">
                <a href={`/category/Summer`} className="k-flyout__title">
                  Summer
                </a>
                {categories && categories.filter((category) => category.season === 'Summer').map((category) => (
 
                    <a href={`/shoppingCart/${category.category_id}`} key={category.category_Name} className="k-flyout__link">
                      {category.category_Name}
                    </a>
                  ))}
              </li>
              <li className="k-flyout__column">
                <a href={`/category/Winter`} className="k-flyout__title">
                  Winter
                </a>
                {categories && categories.filter((category) => category.season === 'Winter').map((category) => (
                    <a href={`/shoppingCart/${category.category_id}`} key={category.category_Name} className="k-flyout__link">
                      {category.category_Name}
                    </a>
                  ))}
              </li>
            </ul>

          )}
        </div>
      </div>


      <div className="kh-navbar ">
        {/* Links to currently logged in user to access user content*/}
        <div className="mb-menu-account">
          {currentUser == null ?
            <>
              <span >
                <a href="/login" >
                  {/* <FontAwesomeIcon icon={faHome} /> */}
                  Sign in
                </a>
              </span>
              <span >
                <a href="/edit-user" >
                  {/* <FontAwesomeIcon icon={faHome} /> */}
                  Create an Account
                </a>
              </span>
            </>
            :
            <>
              <span class="k-link--regular kh-account__link" href="/account">
                Welcome Back!
              </span>
              <span class="kh-account__name">
                <a href="/userAccount" > {currentUser.username}
                </a>
              </span>
              <span>
                <a href="/login" onClick={logOut}>
                  Sign Out
                </a>
              </span>
            </>
          }

          {currentUser && !showManager && !showStaff && (
            <span >
              <a href="/orderHistory" >
                {/* <FontAwesomeIcon icon={faHome} /> */}
                Order History
              </a>
            </span>
          )}
        </div>
        {/* Links to currently logged in Moderator who has Staff access privilege */}
        {showStaff && (
          <>
            <span >
              <a href="/staffLayout" >
                Manage Reservation
              </a>
            </span>
            <span className="">
              <a href="/orderHistory" >
                {/* <FontAwesomeIcon icon={faHome} /> */}
                Reservation
              </a>
            </span>
          </>
        )}

        {/* Links to currently logged in Admin who is Managerial access privilege */}
        {showManager && (
          <>
            <span >
              <a href="/managerLayout" >
                Manage Inventory
              </a>
            </span>
            <span >
              <a href="/CustomerReservation" >
                Reservation
              </a>
            </span>
          </>
        )}

        <>

          <span >
            <a href="/shoppingCart" >
              Rental Product
            </a>
          </span>
          {/* <span >
            <a href="/Rentals" >
              Product
            </a>
          </span> */}
          {showManager && showStaff && currentUser && (
            <span >
              <a href="/CustomerReservation" >
                Reservation
              </a>
            </span>
          )}
          
        
          <span >
            <a href="/Sales" >
              Sales
            </a>
          </span>
          <span >
            <a href="/services" >
              Service
            </a>
          </span>
          <span >
            <a href="/Location-Hours" >
              Location & Hours
            </a>
          </span>
          <span >
            <a href="/contact-us" >
              Contact Us
            </a>
          </span>
        </>
      </div>
    </>
  );
};
