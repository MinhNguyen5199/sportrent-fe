import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { images } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { updateCartLength } from '../../redux/actions/cartActions';

import { Links } from "./Links";
import AuthService from "../../Service/AuthService";
import { CartInNavbar } from "../Header/CartInNavbar";
import "../../App.css";
import "./navbar.scss";

const NavBar = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  const capitalizeFirstLetterOfUserName = (username) => {
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
  //cart show/hide
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((prevState) => !prevState);
  };

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const navigate = useNavigate();
  const [userQuery, setUserQuery] = useState("");

  const searchItems = (e) => {
    e.preventDefault();
    const query = userQuery.trim();
    // Navigate to the search results page with the search query as a parameter
    navigate(`/searchProduct/${query}`);
  };

  //update the cart length with out refreshing the page whe there is a change in the local storage
  const cartLength = useSelector(state => state.cart.cartLength);
  const dispatch = useDispatch();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCartLength = cart ? cart.length : 0;
    dispatch(updateCartLength(newCartLength));
  }, [dispatch]);


  const { cart } = useSelector((state) => state.cart);

  let total = 0;

  if (cart.length > 0) {
    total = cart.reduce(
      (accumulator, product) =>
        accumulator + product.amount,
      0
    );
  }

  function toggleMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
  }
  return (
    <>
      {/* <!-- Navbar --> */}
      <div className="kh-main kmh-header">
        <a href="/" className="kh-logo app__navbar-logo">
          <img src={images.SportsrentLogo} alt="Sport Rental" />
        </a>

        <button className="kmh-toggle navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg width="35" height="60" viewBox="0 0 30 28" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.48 27l-.009-3.78-1.854 3.114H3.96l-1.845-3.033V27H.747v-6.3h1.206l2.358 3.915L6.633 20.7H7.83l.018 6.3H6.48zm8.14-1.17V27H9.742v-6.3h4.761v1.17h-3.312v1.368h2.925v1.134h-2.925v1.458h3.429zm7.339-5.13V27h-1.197l-3.141-3.825V27h-1.44v-6.3h1.206l3.132 3.825V20.7h1.44zm4.693 6.408c-.9 0-1.6-.249-2.102-.747-.5-.498-.751-1.209-.751-2.133V20.7h1.458v3.474c0 1.128.468 1.692 1.404 1.692.456 0 .804-.136 1.044-.41.24-.273.36-.7.36-1.282V20.7h1.44v3.528c0 .924-.25 1.635-.751 2.133-.502.498-1.202.747-2.102.747zM2 0h26a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm0 6h26a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm0 6h26a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z" fill="#FFF" fill-rule="evenodd"></path>
          </svg>
        </button>
        <a href="/" className="khMobile-logo">
          <img src={images.SPMobileLogo} alt="Sport Rental" />
        </a>

        <div className="kh-main__content">
          <form className="kh-search" onSubmit={searchItems}>
            <input
              type="search"
              className="kh-search__input"
              required=""
              placeholder="Search keyword or product name"
              name=""
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
            <button type="submit" className="kh-search__btn" >
              <svg className="icon icon--search" width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
                  <circle className="icon__circle" fill="#FC3" cx="16.5" cy="16.5" r="16.5"></circle>
                  <path className="icon__path" d="M18.034 19.943a4.94 4.94 0 0 1-1.811-.353 4.993 4.993 0 0 1-2.814-2.815 4.98 4.98 0 0 1-.35-1.81 4.976 4.976 0 0 1 4.971-4.974 4.976 4.976 0 0 1 .004 9.952M18.03 8a6.96 6.96 0 0 0-6.962 6.966c0 1.196.33 2.303.86 3.29L8.29 21.893a1 1 0 0 0 0 1.408l1.41 1.41a1 1 0 0 0 1.408 0l3.634-3.64c.983.534 2.09.864 3.292.862A6.967 6.967 0 0 0 18.03 8" fill="#231F20"></path>
                </g>
              </svg>
            </button>
          </form>

          <div className="kh-account">

            {currentUser ? (
              <>
                <svg className="icon icon--profile-small account__icon user-is-guest kh-account__icon" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(3 3)" fill="none" fill-rule="evenodd">
                    <circle className="icon__circle" fill="#EDEDED" cx="16.5" cy="16.5" r="16.5"></circle>
                    <g className="icon__path" transform="translate(9 9)" fill="#000">
                      <circle cx="7.5" cy="3.5" r="3.5"></circle>
                      <path d="M15 15.5a7.5 7.5 0 0 0-15 0h15z"></path>
                    </g>
                  </g>
                </svg>
                <div className="kh-account__info">

                  <Link href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown">
                    <span class="kh-account__name"> {capitalizeFirstLetterOfUserName(currentUser.username)}</span></Link>
                  <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="navbarDropdownMenuAvatar">
                    <li>
                      <a href="/userAccount">
                        <span className="fa fa-cog"></span> Account Settings
                      </a>
                    </li>
                    <li>
                      <a href="/Rentals">
                        <span className="fa fa-line-chart"></span> User Rentals <span className="badge ml-4 mt-1">42</span>
                      </a>
                    </li>
                    <li>
                      <a href="/profile">
                        <span className="fa fa-user"></span> Profile
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="fa fa-heart"></span> Favorites Snippets
                      </a>
                    </li>
                    <li>
                      <a href="/login" onClick={logOut}>
                        <span className="fa fa-sign-out"></span> Sign Out
                      </a>
                    </li>
                  </ul>
                  <span className="k-link--regular kh-account__link" href="/account">Welcome Back!</span>
                  <div className="kh-account__panel">
                    <div className="kh-account__panel-header">
                      <div className="kh-account__panel-close">×</div>
                    </div>

                  </div>
                </div>

              </>
            ) : (
              <>
                <svg className=" kh-account__icon" width="40" height="40" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(3 3)" fill="none" fill-rule="evenodd">
                    <circle className="icon__circle" fill="#EDEDED" cx="16.5" cy="16.5" r="16.5"></circle>
                    <g className="icon__path" transform="translate(9 9)" fill="#000">
                      <circle cx="7.5" cy="3.5" r="3.5"></circle>
                      <path d="M15 15.5a7.5 7.5 0 0 0-15 0h15z"></path>
                    </g>
                  </g>
                </svg>
                <div className="kh-account__info">
                  <span className="kh-account__name">Account</span>
                  <a className="k-link--regular kh-account__link" href="/account">Register or Sign In</a>
                  <div className="kh-account__panel">
                    <div className="kh-account__panel-header">
                      <div className="kh-account__panel-title" data-message="site.header.account.welcome">Welcome Back!</div>
                      <div className="kh-account__panel-close">×</div>
                    </div>

                  </div>
                </div>
              </>
            )}
          </div>
          <div className="cart-link ">
            <Link href="#" className="kh-cart text-reset" onClick={handleClick}>
              <div className="kh-cart__link">
                <svg className="" style={{ width: "38", height: "38" }} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" >
                  <defs>
                    <path id="icon-cart-a" d="M0 0h16v9H0z"></path>
                  </defs>
                  <g transform="translate(3 3)" fill="none" fill-rule="evenodd">
                    <circle className="icon__circle" fill="#EDEDED" cx="16.5" cy="16.5" r="16.5"></circle>
                    <path className="icon__path" d="M15.5 16a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1M15.5 15a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M17.5 17a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M17.5 15a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M18.5 15a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1M19.5 15a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M16.5 15a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1M14.5 16a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M18.5 14a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M16.5 14a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M14.5 14a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M13.5 21a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M18.5 21a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" fill="#231F20"></path>
                    <g transform="translate(7 11)">
                      <mask id="b" fill="#fff">
                        <use href="#icon-cart-a"></use>
                      </mask>
                      <path className="icon__path" d="M15.372 2.071a1 1 0 0 0-1.3.557L12.322 7H6.756L4.962.725A1 1 0 0 0 4 0H1a1 1 0 1 0 0 2h2.246l1.793 6.275a1 1 0 0 0 .96.725h7a1 1 0 0 0 .93-.629l2-5a1 1 0 0 0-.557-1.3" fill="#231F20" mask="url(#b)"></path>
                    </g>
                  </g>
                </svg>
                <div className="kh-cart__badge">
                  {cartLength}
                </div>
              </div>
              <div className="kh-cart__info">
                <span className="kh-cart__name" >
                  My Cart
                </span>

                <span className="kh-cart__total">
                  $ {cart.length === 0 ? '0.00' : total.toFixed(2)}
                </span>
              </div>
            </Link>
            <div
              className="shopping-cart"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <CartInNavbar />
            </div>
          </div>
        </div>
      </div>

      <nav className=" navbar-expand-lg  nav-links">
        <div className="container-md">
       
          <div className="collapse navbar-collapse" id="navbarText">
           {/* mobile menu start hare */}
          <div class="kmh-menu__header ">
            <svg width="33" height="29" viewBox="0 0 33 29" xmlns="http://www.w3.org/2000/svg" onClick={() => toggleMenu()} className="kmh-menu__close">
              <path d="M3.611 28.108c-.642 0-1.222-.14-1.741-.418a3.123 3.123 0 0 1-1.225-1.162A3.199 3.199 0 0 1 .2 24.85c0-.624.148-1.183.445-1.678A3.123 3.123 0 0 1 1.87 22.01a3.637 3.637 0 0 1 1.75-.418c.546 0 1.04.096 1.48.288.442.192.812.468 1.112.828l-.936.864c-.426-.492-.954-.738-1.584-.738-.39 0-.738.085-1.044.256-.306.172-.544.41-.715.716a2.103 2.103 0 0 0-.257 1.044c0 .39.085.738.257 1.044.17.306.409.544.715.715.306.172.654.257 1.044.257.63 0 1.158-.249 1.584-.747l.936.864c-.3.366-.672.645-1.116.837a3.704 3.704 0 0 1-1.485.288zM7.593 21.7h1.458v5.112h3.159V28H7.593v-6.3zm8.779 6.408a3.677 3.677 0 0 1-1.769-.423 3.14 3.14 0 0 1-1.232-1.165 3.182 3.182 0 0 1-.446-1.67c0-.618.148-1.174.446-1.67a3.14 3.14 0 0 1 1.232-1.165 3.677 3.677 0 0 1 1.769-.423c.654 0 1.242.141 1.764.423a3.157 3.157 0 0 1 1.683 2.835c0 .618-.15 1.174-.45 1.67a3.18 3.18 0 0 1-1.233 1.165c-.522.282-1.11.423-1.764.423zm0-1.242a2 2 0 0 0 1.008-.257c.3-.17.535-.409.707-.715.17-.306.256-.654.256-1.044s-.085-.738-.256-1.044a1.84 1.84 0 0 0-.707-.716 2 2 0 0 0-1.008-.256 2 2 0 0 0-1.008.256c-.3.172-.535.41-.707.716a2.103 2.103 0 0 0-.256 1.044c0 .39.085.738.256 1.044.172.306.407.544.707.715a2 2 0 0 0 1.008.257zm7.015 1.242c-.498 0-.98-.067-1.445-.202-.465-.136-.838-.311-1.12-.527l.495-1.098c.27.198.591.357.963.477s.744.18 1.116.18c.414 0 .72-.061.918-.184.198-.124.297-.287.297-.491a.469.469 0 0 0-.175-.374 1.33 1.33 0 0 0-.45-.238 8.957 8.957 0 0 0-.743-.198c-.48-.114-.873-.228-1.179-.342a1.916 1.916 0 0 1-.788-.549c-.219-.252-.328-.588-.328-1.008 0-.366.099-.697.297-.994.198-.298.496-.533.896-.707.399-.174.886-.261 1.462-.261.402 0 .795.048 1.179.144.384.096.72.234 1.008.414l-.45 1.107c-.582-.33-1.164-.495-1.746-.495-.408 0-.71.066-.905.198-.195.132-.292.306-.292.522 0 .216.112.376.337.482.226.105.569.208 1.031.31.48.114.873.228 1.179.342.306.114.568.294.787.54.22.246.329.579.329.999 0 .36-.1.688-.302.986-.2.297-.502.532-.904.706-.402.174-.891.261-1.467.261zm8.95-1.278V28h-4.878v-6.3h4.761v1.17h-3.312v1.368h2.925v1.134h-2.925v1.458h3.429zM16.071 6.657L22.435.293a1 1 0 1 1 1.414 1.414l-6.364 6.364 6.364 6.364a1 1 0 1 1-1.414 1.414l-6.364-6.364-6.364 6.364a1 1 0 0 1-1.414-1.414l6.364-6.364-6.364-6.364A1 1 0 0 1 9.707.293l6.364 6.364z" fill="#FFF" fill-rule="evenodd"></path>
            </svg>

            <a href="/" className="mb-menu-logo">
              <img src={images.SportsrentLogo} alt="Sport Rental" />
            </a>
          </div>
          {/* end here */} 
           <Links user={currentUser} />
          </div>
        </div>
       
      </nav>
      
      
    </>
  );
};

export default NavBar;
