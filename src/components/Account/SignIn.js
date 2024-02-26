import React, { useState, useEffect } from "react";
import AuthService from "../../Service/AuthService";
import { User } from "../models/User";
import { withRouter } from "../../constants/WithRouter";
import images from "../../constants/images";
import "../../components/Common.css";

const SignIn = ({ router }) => {
  const [user, setUser] = useState(new User("", ""));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // redirect to home if already logged in
    if (AuthService.getCurrentUser()) {
      router.navigate("/");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    // stop here if form is invalid
    if (!(user.username && user.password)) {
      return;
    }

    setLoading(true);
    AuthService.login(user.username, user.password)
      .then(() => {
        router.navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Incorrect login or password.");
        setLoading(false);
      });
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
      <div className="wrappers">
        <div className="inner-wrappers text-center">
          <img
            className="img-fluid centered sbux-logo"
            alt="SportsRent logo"
            src={images.icon}
          />
          <h2 className="title">Login to your account</h2>
          {errorMessage && (
            <div className="alert alert-danger mt-2" role="alert">
              <strong>Error! </strong> {errorMessage}
            </div>
          )}
          <form
            action=""
            id="formvalidate"
            noValidate="novalidate"
            onSubmit={handleLogin}
          >
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
              />
              {submitted && !user.username && (
              
                  <span id="userName-error" className="validate-tooltip">
                    Please provide valid username.
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
              />
              {submitted && !user.password && (
                
                  <span id="userPassword-error" className="validate-tooltip">
                    Incorrect login or password.
                  </span>
                 
               
              )} <span className="lighting"></span>
            </div>
            <button disabled={loading} className="loginButton" id="login">Login</button>
            <div className="clearfix supporter">
              <div className="pull-left remember-me">
                <input id="rememberMe" type="checkbox" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <a href="/ForgotPassword" className="forgot pull-right">
                Forgot Password?
              </a>
            </div>
          </form>
          <div className="signup-wrappers">
            <a href="/add-user">
              Don't have an account? <span className="text-primary">Create One</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(SignIn);
