import React from "react";
import AuthService from "../../Service/AuthService";
import { withRouter } from "../../constants/WithRouter";
import { User } from "../models/User";
import { images } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";


class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (AuthService.getCurrentUser()) {
      this.props.history.push("/");
      
    }

    this.state = {
      user: new User(""),
      submitted: false,
      loading: false,
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
    this.setState({ submitted: true });
    const { user } = this.state;

    // stop here if form is invalid
    if (!user.password && !user.confirmPassword) {
      return;
    }
    if (user.password !== user.confirmPassword) {
      this.setState({errorMessage: "Password doesn't match please re-enter",});
      return;
    }
    this.setState({ loading: true });
    AuthService.passwordResetToken(user.password, this.props.router.params.id)
    .then(() => {
        this.props.router.navigate("/");
        window.location.reload();
      },
      (error) => {
        console.log(error);
        this.setState({
          errorMessage: "Update password error. ",
          loading: false,
        });
      }
    );
  }
  render() {
    const { user, submitted, loading, errorMessage } = this.state;

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

                <h3 className="text-center">Update Password</h3>
                <p className="text-center">
                  Enter your email to update your password
                </p>
                <form name="form" onSubmit={(e) => this.resetPassword(e)}>
                  <div className="container-sm">
                    <div
                      className={
                        "form-group" +
                        (submitted && user.password ? "has-error" : "")
                      }
                    >
                      <label htmlFor="password">Your new password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={(e) => this.handleChange(e)}
                        minLength="7"
                      />
                      {submitted && !user.password && (
                        <div className="alert alert-danger" role="alert">
                          Password is required.
                        </div>
                      )}
                    </div>
                    <div
                      className={
                        "form-group" +
                        (submitted && user.password ? "has-error" : "")
                      }
                    >
                      <label htmlFor="confirmPassword">confirm new password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={(e) => this.handleChange(e)}
                        minLength="7"
                      />
                      {submitted && !user.confirmPassword && (
                        <div className="alert alert-danger" role="alert">
                          Confirm Password is required.
                        </div>
                      )}
                    </div>
                    <div className="text-center text-lg-start mt-2 login-actions">
                      <button
                        type="submit"
                        className=" sr-btn prim"
                        disabled={loading}
                      >
                        Update Password
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

export default withRouter(UpdatePassword);
