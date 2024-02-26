import React from "react";
import AuthService from "../../Service/AuthService";
import { withRouter } from "../../constants/WithRouter";
import { User } from "../models/User";
import { images } from "../../constants";

class ForgotPassword extends React.Component {
  
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (AuthService.getCurrentUser()) {
      this.props.history.push("/");
    }

    this.state = {
      user: new User(""),
      submitted: false,
      isDisabled: false,
      errorMessage: "",
    };
  }

  handleChange(e) {
    var { name, value } = e.target;
    var user = this.state.user;
    user[name] = value;
    this.setState({ user: user });
  }

  resetPassword(e) {
    e.preventDefault();
this.setState({isDisabled: true})

    this.setState({ submitted: true });
    const { user } = this.state;

    // stop here if form is invalid
    if (!user.email) {
      return;
    }

    this.setState({ isDisabled: true });
    AuthService.passwordReset(user.email)
    .then(() => {
        this.props.router.navigate("/resetConfirmation");
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.setState({
          errorMessage: "Email address doesn't exist. ",
          isDisabled: false,
        });
      }
    );
  }
  render() {
    const { user, submitted, isDisabled, errorMessage } = this.state;

    return (
      <div className="demo-container mb-4">
      <div className="container-xl">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mx-auto">
            <div className="text-center image-size-small position-relative">
                <img
                  src={images.password_reset}
                  className="rounded-circle p-3 bg-white"
                />
              
              </div>
              <div className="p-5 mt-3 bg-white rounded shadow-lg ">
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    <strong>Error! </strong> {errorMessage}
                  </div>
                )}

                <h3 className="text-center">Forgot Password</h3>
                <p className="text-center">
                  Enter your email we 'll send you a link to reset your password
                </p>
                <form name="form" onSubmit={(e) => this.resetPassword(e)}>
                  <div className="container-sm">
                    <div
                      className={
                        "form-group" +
                        (submitted && user.email ? "has-error" : "")
                      }
                    >
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={(e) => this.handleChange(e)}
                      />
                      {submitted && !user.email && (
                        <div className="alert alert-danger" role="alert">
                          Email is required.
                        </div>
                      )}
                    </div>
                    {/* <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form3Example3"> Enter valid Email address</label>
              <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" className="form-control form-control-lg" required
                placeholder="Enter email address" style={{ backgroundColor: "#eaedf0" }} />
            </div> */}
                    <div className="text-center text-lg-start mt-2 login-actions">
                      <button
                        type="submit"
                        className="sr-btn prim"
                        disabled={isDisabled}
                      >
                        Send Link
                      </button>
                    </div>
                    <p className="forgot-password text-center">
                      <a href="/login">Back to Login</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
