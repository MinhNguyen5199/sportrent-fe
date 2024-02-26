import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../Service/UserService";
import authService from "../../../Service/AuthService";
// notifier
import { toast } from "react-toastify";

const Customers = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const cancel = (e) => {
    navigate("/ManagerLayout/CustomerList");
  };
  //Create or update user account
  const [isDisabled, setDisabled] = useState(false);
  const createOrUpdateUser = (e) => {
    e.preventDefault();
    setDisabled(true);
    
    const user = {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
    };

    if (id) {
      UserService.updateUser(id, user)
        .then((response) => {
          toast.success("User Updated Successfully");
          navigate("/ManagerLayout/customerList");
        })
        .catch((error) => {
          toast.error("Error, User Update was is not successful"+ error);
        });
    } else {
      authService.register(user)
        .then((response) => {
          toast.success("User Created Successfully");
          navigate("/ManagerLayout/customerList");
        })
        .catch((error) => {
          toast.error("Error, User create was is not successful"+ error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      UserService.getUserById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phoneNumber);
          setUsername(response.data.username);
          setPassword(response.data.password);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const title = () => {
    if (id) {
      return (<h5 className="text-CamelCase text-left mb-1">Update User Account</h5>);
    } else {
      return (<h5 className="text-CamelCase text-left mb-1">  Create a New User Account</h5> );
    }
  };

  return (
    <div className="container-md">
    <div className="row">
      <div className="col-sm-12 mt-4 mb-1">
        {" "}
          <p className="mb-3"> {title()}</p>
        </div>
      </div>
      <div className="container ml-5 mr-5">
      <form className="needs-validation" name="form">
        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div className="col-md-5 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <div className="invalid-feedback">Valid last name is required.</div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="username">Username</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
              />
              <div className="invalid-feedback">Your username is required.</div>
            </div>
          </div>

          <div className="col-md-5 mb-3">
            <label htmlFor="email">
              Email <span className="text-muted"></span>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mb-3">
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input
              type="number"
              className="form-control"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="000-000-0000"
              required
            />
            <div className="invalid-feedback">
              Please enter your Phone Number.
            </div>
          </div>

          <div className="col-md-5 mb-3">
            <label htmlFor="Status">Status</label>
            <div className="input-group">
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select Status</option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
             </select>
               </div>
            <div className="invalid-feedback">
              Please select a valid Status.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mb-3">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="invalid-feedback">
            Please enter your Password.
          </div>
        </div>
        </div>
        <hr  className="col-md-10 mb-3"/>


        <div className="row">
          <div className="col-md-10 mb-3">
        <h5 className="mb-3">Billing address</h5>
        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="1234 Main St"
            required
          />
          <div className="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>
        </div>
        </div>
        <div className="row">
          <div className="col-md-10 mb-3">
        <div className="mb-3">
          <label htmlFor="address2">
            Address 2 <span className="text-muted">(Optional)</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="address2"
            placeholder="Apartment or suite"
          />
        </div>
        </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="country">Country</label>
            <div className="input-group">
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select Country</option>
              <option value="1">Canada</option>
              <option value="2">United State</option>
             </select>
               </div>
            <div className="invalid-feedback">
              Please select a valid country.
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="state">State</label>
            <div className="input-group">
            <select className="form-select" aria-label="Default select example">
              <option selected>Open this select Status</option>
              <option value="1">Calgary</option>
              <option value="2">Edmonton</option>
             </select>
               </div>
            <div className="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
          <div className="col-md-2 mb-3">
            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              placeholder=""
              required
            />
            <div className="invalid-feedback">Zip code required.</div>
          </div>
        </div>
        <br />

        <div className="row">
            <div className="col-md-3 mb-2 mr-5">
              <button
                className="btn btn-secondary btn-md btn-block"
                type="submit"
                onClick={(e) => cancel(e)}
              >
                Cancel
              </button>
            </div>
            <div className="col-md-3 mb-2">
              <button
                className="btn btn-primary btn-md btn-block"
                type="submit"
                onClick={(e) => createOrUpdateUser(e)}
                disabled={isDisabled}
              >
                Submit
              </button>
            </div>
          </div>

      </form>
      </div>
    </div>
  );
};

export default Customers;
