import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

import UserService from "../../Service/UserService";
import AuthService from "../../Service/AuthService";
import "./Profile.css";
const Profile = () => {
  // current user login
  const currentUser = AuthService.getCurrentUser().id;
  const [isUpdating, setIsUpdating] = useState(false);
  // User Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // User Address
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [message, setMessage] = useState("");

  const cancel = (e) => {
    // navigate("/Profile");
  };
  // ...

  // Update user account

  const UpdateProfile = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      phoneNumber,
    };

    const userAddress = {
      address,
      city,
      country,
      province,
      zipCode,
    };

    if (currentUser) {
      setIsUpdating(true); // Start the update operation
      UserService.updateUserProfile(currentUser, user)
        .then(() => {
          UserService.updateAddress(currentUser, userAddress)
            .then(() => {
              toast.success("Personal Detail & Address of Profile Successfully Updated");
            })
            .catch((error) => {
              toast.error("User Address Profile Update failed: " + error.message);
            })
            .finally(() => {
              setIsUpdating(false); // Update operation completed (success or error)
            });
        })
        .catch((error) => {
          toast.error("User Profile Update failed: " + error.message);
          setIsUpdating(false); // Update operation completed with error
        });
    }
  };

  // ...

  useEffect(() => {
    if (currentUser) {
      // User basic info
      UserService.getUserProfileById(currentUser)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
        })
        .catch((error) => {
          setMessage("User Info Fail to Retrieved");
        });
      // // User address
      UserService.getUserAddress(currentUser)
        .then((response) => {
          setAddress(response.data.address);
          setCity(response.data.city);
          setProvince(response.data.province);
          setCountry(response.data.country);
          setZipCode(response.data.zipCode);
        })
        .catch((error) => {
          toast.error("User Address Info Fail to Retrieved");
        });
    }
  }, [currentUser]);

  // user to activate or deactivate the account
  const active = useRef(null);
  const inactive = useRef(null);

 // Confirmation modal state
 const [showConfirmationModal, setShowConfirmationModal] = useState(false);
 const [confirmationModalMessage, setConfirmationModalMessage] = useState("");
 const [confirmationModalAction, setConfirmationModalAction] = useState(null);

 // Other functions

 const handleClickActive = (e) => {
   e.preventDefault();
   if (currentUser) {
     setConfirmationModalMessage("Are you sure you want to Activate your account?");
     setConfirmationModalAction(() => () => {
       UserService.changeStatus(currentUser, "Active")
         .then((response) => {
           toast.success("User status successfully Activated");
         })
         .catch((error) => {
           toast.error("Error updating user profile status: " + error);
         });
     });
     setShowConfirmationModal(true);
   }
 };

 const handleClickInactive = (e) => {
   e.preventDefault();
   if (currentUser) {
     setConfirmationModalMessage("Are you sure you want to Deactivate your account?");
     setConfirmationModalAction(() => () => {
       UserService.changeStatus(currentUser, "Inactive")
         .then((response) => {
           toast.success("User status successfully Deactivated");
         })
         .catch((error) => {
           toast.error("Error updating user profile status: " + error);
         });
     });
     setShowConfirmationModal(true);
   }
 };

 const handleConfirmationModalClose = () => {
   setShowConfirmationModal(false);
   setConfirmationModalAction(null);
 };

 const handleConfirmationModalConfirm = () => {
   if (confirmationModalAction) {
     confirmationModalAction();
   }
   handleConfirmationModalClose();
 };

  return (
    <>
      <div className="container-sm">
        <div className="row gutters">
          {/* profile info*/}
          <div className="row">
            {message === "Personal Detail & Address of Profile Successfully Updated" && (
              <div className="alert alert-success text-center" role="alert">
                <strong> </strong> {message}
              </div>
            )}
            {message === "User Info Fail to Retrieved" && (
              <div className="alert alert-danger text-center" role="alert">
                <strong> </strong> {message}
              </div>
            )}
            {message === "Profile Update fail" && (
              <div className="alert alert-danger text-center" role="alert">
                <strong> </strong> {message}
              </div>
            )}

          </div>
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mb-4">
            <div className="cards h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="User"
                      />
                    </div>
                    <h5 className="user-name">{firstName}</h5>
                    <h6 className="user-email">{email}</h6>
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-primary"
                      onClick={(e) => cancel(e)}
                    >
                      Change Image
                    </button>
                  </div>
                  <div className="about">
                    <h5>About</h5>
                    <p>In progress.</p>
                    {/* Deactivate user account */}
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <form id="active" onSubmit={handleClickActive}>
                          <input
                            style={{ display: "none" }}
                            ref={active}
                            defaultValue={currentUser + "Active"}
                          />

                          <button
                            form="active"
                            type="submit"
                            id="submit"
                            name="submit"
                            className="btn btn-success m6-5"
                          >
                            Activate
                          </button> </form>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <form id="inactive" onSubmit={handleClickInactive}>
                          <input
                            style={{ display: "none" }}
                            ref={inactive}
                            defaultValue={currentUser + "Inactive"}
                          />

                          <button
                            form="inactive"
                            type="submit"
                            id="submit"
                            name="submit"
                            className="btn btn-danger"
                          >
                            Deactivate
                          </button> </form>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  user account information and personal info */}
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 mb-4">
            <div className="cards h-100">
              <div className="cards-body">
                <form onSubmit={UpdateProfile}>

                  <div className="row gutters">

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2 text-primary">Personal Details</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="firstName text-black">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter First name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="lastName">last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="form-control"
                          id="lastName"
                          placeholder="Enter Last name"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="eMail">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="000-000-0000"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mt-3 mb-2 text-primary">Billing Information</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="Street">Street</label>
                        <input
                          type="name"
                          className="form-control"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          id="Street"
                          placeholder="Enter Street"
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="ciTy">City</label>
                        <input
                          type="name"
                          className="form-control"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          id="city"
                          placeholder="Enter City"
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                      <div className="form-group">
                        <label htmlFor="Province">Province</label>
                        <input
                          type="text"
                          className="form-control"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          id="Province"
                          placeholder="Enter Province"
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                      <div className="form-group">
                        <label htmlFor="Province">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          id="country"
                          placeholder="Enter Country"
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                      <div className="form-group">
                        <label htmlFor="zIp">Zip Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          id="zIp"
                          placeholder="Zip Code"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row gutters mt-5">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-3">
                      <div className="text-left flex">
                        <button
                          type="submit"
                          className="btn btn-primary bg-black me-5 pl-3 pe-3"
                          disabled={isUpdating} // Disable the button when update is in progress
                        >
                          {isUpdating ? (
                            <> <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Update in Progress</>
                          ) : (
                            "Update Profile"
                          )}
                        </button>

                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn btn-secondary"
                          onClick={(e) => cancel(e)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Confirmation Modal */}
       <Modal show={showConfirmationModal} onHide={handleConfirmationModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
          <h5> <strong>Account Status Change</strong></h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmationModalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirmationModalClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmationModalConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
