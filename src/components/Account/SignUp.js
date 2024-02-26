import React, { useEffect, useState } from "react";
import UserService from "../../Service/AuthService";

import { withRouter } from "../../constants/WithRouter";
import { User } from "../models/User";
import images from "../../constants/images";


import "../../components/Common.css";

const SignUp = ({ router }) => {

  const [user, setUser] = useState(new User("", "", "", "", "", ""));
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    // redirect to home if already logged in
    if (UserService.getCurrentUser()) {
      router.navigate("/");
    }
  }, [router]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setIsLoading(true);
  
    if (
      !(
        user.firstName &&
        user.lastName &&
        user.email &&
        user.phoneNumber &&
        user.username &&
        user.password &&
        user.confirmPassword
      )
    ) {
      return;
    }
  
    if (user.password !== user.confirmPassword) {
      setErrorMessage("Password confirmation doesn't match, please re-enter.");
      setIsLoading(false);
      return;
    }
  
    try {
      await UserService.register(user);
      router.navigate("/login");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.message) {
        setErrorMessage("Unexpected error occurred: " + (error.message || error.toString()));
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
      setIsLoading(false);
    }
  };
  


  const handleInputFocus = (e) => {
    const parent = e.target.parentNode;
    parent.classList.add("focused");
  };

  const handleInputBlur = (e) => {
    const parent = e.target.parentNode;
    if (e.target.value === "") {
      parent.classList.remove("focused");
    }
  };


  return (
    <>
      <div className="wrappers signUp">
        <div className="inner-wrappers text-center">
          <img
            className="img-fluid centered sbux-logo"
            alt="SportsRent logo"
            src={images.icon}
          />
          <h2 className="title"> Create account to make a reservation</h2>
          {errorMessage && (
            <div className="alert alert-danger mt-2" role="alert">
              <strong>Error! </strong> {errorMessage}
            </div>
          )}

          <form name="form" onSubmit={handleRegister}>
            <div className="input-group ">
              <label className="palceholder" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}

                placeholder=""
                aria-required="true"
                aria-describedby="firstName-error"
                aria-invalid="true"
              />
              {submitted && !user.firstName && (
                <span id="FirstName-error" className="validate-tooltip">
                  Please provide valid First Name.
                </span>
              )}
              <span className="lighting"></span>
            </div>




            <div className="input-group ">
              <label className="palceholder" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}

                placeholder=""
                aria-required="true"
                aria-describedby="LastName-error"
                aria-invalid="true"
              />
              {submitted && !user.lastName && (
                <span id="LastName-error" className="validate-tooltip">
                  Please provide valid Last Name.
                </span>
              )}
              <span className="lighting"></span>
            </div>




            <div className="input-group ">
              <label className="palceholder" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}

                placeholder=""
                aria-required="true"
                aria-describedby="Email-error"
                aria-invalid="true"
              />
              {submitted && !user.email && (
                <span id="Email-error" className="validate-tooltip">
                  Please provide valid Email.
                </span>
              )}
              <span className="lighting"></span>
            </div>




            <div className="input-group ">
              <label className="palceholder" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}

                pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
                placeholder=""

                aria-required="true"
                aria-describedby="phoneNumber-error"
                aria-invalid="true"
              />
              {submitted && !user.phoneNumber && (
                <span id="phoneNumber-error" className="validate-tooltip">
                  Please provide valid Phone Number.
                </span>
              )}
              <span className="lighting"></span>
            </div>






            <div className="input-group ">
              <label className="palceholder" htmlFor="userName">
                User Name
              </label>
              <input
                className="form-control validate-tooltip"
                name="username"
                value={user.username}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                id="username"
                type="text"
                placeholder=""
                aria-required="true"
                aria-describedby="userName-error"
                aria-invalid="true"
                maxLength={20}
              />
              {submitted && !user.username && (

                <span id="userName-error" className="validate-tooltip">
                  Please provide valid User Name.
                </span>

              )}
              <span className="lighting"></span>
            </div>



            <div className="input-group ">
              <label className="palceholder" htmlFor="userPassword">
                Password
              </label>
              <input
                className="form-control validate-tooltip"
                name="password"
                value={user.password}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                id="password"
                type="password"
                placeholder=""
                aria-required="true"
                aria-describedby="userPassword-error"
                aria-invalid="true"
                minLength={7}
              />
              {submitted && !user.password && (
                <span id="userPassword-error" className="validate-tooltip">
                  Please provide valid Password.
                </span>
              )}
              <span className="lighting"></span>
            </div>



            <div className="input-group ">
              <label className="palceholder" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="form-control validate-tooltip"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                id="confirmPassword"
                type="password"
                placeholder=""
                aria-required="true"
                aria-describedby="confirmPassword-error"
                aria-invalid="true"
                minLength={7}
              />
              {submitted && !user.confirmPassword && (

                <span id="confirmPassword-error" className="validate-tooltip">
                  Please provide valid Confirm Password.
                </span>


              )} <span className="lighting"></span>
            </div>

            <button disabled={isLoading} className="loginButton" id="singUp">
              {isLoading ? "Loading..." : "Sign Up"}
            </button>

            <div className="signup-wrappers mt-3">
              Already registered?{" "}
              <a href="/login" >
                <span className="text-primary">Login here</span>
              </a>
            </div>

          </form>
        </div>
      </div>
    </>

  );
}


export default withRouter(SignUp);
