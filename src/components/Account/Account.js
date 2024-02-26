import React, { useEffect, useState } from "react";
import UserService from "../../Service/AuthService";
import { User } from "../models/User";
import AuthService from "../../Service/AuthService";
import { withRouter } from "../../constants/WithRouter";
import { toast } from "react-toastify";

import './Account.css'

const Account = ({ router }) => {
    // Sign up state
    const [user, setUser] = useState(new User("", "", "", "", "", ""));
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

    // Sign in state
    const [signInUser, setSignInUser] = useState(new User("", ""));
    const [signInSubmitted, setSignInSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [signInErrorMessage, setSignInErrorMessage] = useState("");

    useEffect(() => {
        // Redirect to home if already logged in
        if (UserService.getCurrentUser()) {
            router.navigate("/");
        }
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignInUser((prevUser) => ({ ...prevUser, [name]: value }));
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
            setIsLoading(false);
            return;
        }

        if (user.password !== user.confirmPassword) {
            setSignUpErrorMessage("Password confirmation doesn't match, please re-enter.");
            setIsLoading(false);
            return;
        }

        try {
            await UserService.register(user);
            toast.success("Congratulation your account has successfully created");
            router.navigate("/login");
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setSignUpErrorMessage(error.response.data.message);
            } else if (error.message) {
                setSignUpErrorMessage("Unexpected error occurred: " + (error.message || error.toString()));
            } else {
                setSignUpErrorMessage("Unexpected error occurred.");
            }
            setIsLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setSignInSubmitted(true);
        setLoading(true);
        if (!(signInUser.signInUserName && signInUser.signInPassWord)) {
            setLoading(false);
            return;
        }

        AuthService.login(signInUser.signInUserName, signInUser.signInPassWord)
            .then(() => {
                router.navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                setSignInErrorMessage("Incorrect login or password.");
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
        <div className="k-page--default">
            <h1>Sign in</h1>
            <div className="kld-wrapper">
                <div className="kld-content">
                    <div className="klpia-form">
                        <h3>Create Your Account</h3>
                        <p className='account-desc'>
                            If you don't have an account already, please enter your information to create a new account.
                        </p>

                        <div className="wrapper-account signUp">
                            <div className="inner-wrappers text-center">
                                {signUpErrorMessage && (
                                    <div className="alert alert-danger mt-2" role="alert">
                                        <strong>Error! </strong> {signUpErrorMessage}
                                    </div>
                                )}
  {/* Component to create a new account  start here */}        
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
                                </form>
{/* Component to create a new account  End here */}

                            </div>
                        </div>

                       
                    </div>
                </div>
                {/* Login code start here */}
                <div className="kld-divider"></div>
                <div id="login-dedicated-form" className="kld-form">
                    <h3>Welcome back</h3>
                    <p className='account-desc'>
                        To sign into the site, you will first need to create your account. If you have already done so, please login using your credentials associated with your account.
                    </p>

                    <div className="wrapper-account">
                        <div className="inner-wrappers text-center">
                            {signInErrorMessage && (
                                <div className="alert alert-danger mt-2" role="alert">
                                    <strong>Error! </strong> {signInErrorMessage}
                                </div>
                           )}

                            <form action="" id="formvalidate" noValidate="novalidate" onSubmit={handleLogin}>
                                
                                <div className="input-group ">
                                    <label className="palceholder" htmlFor="userName">
                                        User Name
                                    </label>
                                    <input
                                        className="form-control validate-tooltip"
                                        name="signInUserName"
                                        value={signInUser.signInUserName}
                                        onChange={handleSignInChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        id="signInUserName"
                                        type="text"
                                        placeholder=""
                                        aria-required="true"
                                        aria-describedby="signInUserName-error"
                                        aria-invalid="true"
                                    />
                                    {signInSubmitted && !signInUser.signInUserName && (

                                        <span id="signInUserName-error" className="validate-tooltip">
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
                                        name="signInPassWord"
                                        value={signInUser.signInPassWord}
                                        onChange={handleSignInChange}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        id="signInPassWord"
                                        type="password"
                                        placeholder=""
                                        aria-required="true"
                                        aria-describedby="signInPassWord-error"
                                        aria-invalid="true"
                                    />
                                    {signInSubmitted && !signInUser.signInPassWord && (

                                        <span id="signInPassWord-error" className="validate-tooltip">
                                            Incorrect login or password.
                                        </span>


                                    )} <span className="lighting"></span>
                                </div>
                                <button disabled={loading} className="loginButton" id="login">Login</button>
                                <div className="clearfix supporter mt-3">
                                    <div className="pull-left remember-me">
                                        <input id="rememberMe" type="checkbox" />
                                        <label htmlFor="rememberMe">Remember Me</label>
                                    </div>
                                    <a href="/ForgotPassword" className="forgot pull-right">
                                        Forgot Password?
                                    </a>
                                </div>
                            </form>

                        </div>
                    </div>


                    {/* <SignIn /> */}
                </div>

            </div>

        </div>
    )
}
export default withRouter(Account);