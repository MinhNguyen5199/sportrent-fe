import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthService from "../../Service/AuthService";
import UserService from "../../Service/UserService";

const PasswordUpdate = () => {
  const currentUser = AuthService.getCurrentUser().id;
  const [submitted, setSubmitted] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !(
        passwordData.currentPassword &&
        passwordData.confirmPassword &&
        passwordData.newPassword
      )
    ) {
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    setIsUpdating(true); // Start the update operation

    UserService.updatePassword(currentUser, passwordData)
      .then((response) => {
        toast.success("Password updated successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        toast.error("Error updating password: " + error.message);
      })
      .finally(() => {
        setIsUpdating(false); // Update operation completed (success or error)
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
    <div className="mt-5 ml-5">
      <h3 className="text-center mb-3"><strong>Account</strong></h3>

      <form onSubmit={handleSubmit}>
        <h5 className="mb-4"><strong>*Change Password</strong></h5>

        <div className="input-group " style={{ maxWidth: "400px" }}>
          <label className="palceholder" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            className="form-control validate-tooltip"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            id="currentPassword"
            type="Password"
            placeholder=""
            aria-required="true"
            aria-describedby="currentPassword-error"
            aria-invalid="true"
            minLength={7}
          />
          {submitted && !passwordData.currentPassword && (
            <span id="currentPassword-error" className="validate-tooltip">
              Please provide valid current Password.
            </span>
          )}
          <span className="lighting"></span>
        </div>

        <div className="input-group " style={{ maxWidth: "400px" }}>
          <label className="palceholder" htmlFor="newPassword">
            New Password
          </label>
          <input
            className="form-control validate-tooltip"
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder=""
            aria-required="true"
            aria-describedby="newPassword-error"
            aria-invalid="true"
            minLength={7}
          />
          {submitted && !passwordData.newPassword && (
            <span id="newPassword-error" className="validate-tooltip">
              Please provide valid New Password.
            </span>
          )}
          <span className="lighting"></span>
        </div>

        <div className="input-group " style={{ maxWidth: "400px" }}>
          <label className="palceholder" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form-control validate-tooltip"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder=""
            aria-required="true"
            aria-describedby="confirmPassword-error"
            aria-invalid="true"
            minLength={7}
          />
          {submitted && !passwordData.confirmPassword && (
            <span id="confirmPassword-error" className="validate-tooltip">
              Please provide valid Confirm Password.
            </span>
          )}
          <span className="lighting"></span>
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-black  pl-3 pe-3"
          disabled={isUpdating} // Disable the button when update is in progress
        >
          {isUpdating ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Update Password in Progress
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;





{/* <div className="form-group">
<label htmlFor="currentPassword">Current Password</label>
<input
  type="password"
  id="currentPassword"
  name="currentPassword"
  value={passwordData.currentPassword}
  className="form-control"
  style={{ maxWidth: "500px" }}
  onChange={handleChange}
/>
</div>
<div className="form-group">
<label htmlFor="newPassword">New Password</label>
<input
  type="password"
  id="newPassword"
  name="newPassword"
  value={passwordData.newPassword}
  className="form-control"
  style={{ maxWidth: "500px" }}
  onChange={handleChange}
/>
</div>
<div className="form-group">
<label htmlFor="confirmPassword">Confirm Password</label>
<input
  type="password"
  id="confirmPassword"
  name="confirmPassword"
  value={passwordData.confirmPassword}
  className="form-control"
  style={{ maxWidth: "500px" }}
  onChange={handleChange}
/>
</div> */}
