import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./pages.css";
// import DatePicker from "../../../constants/DatePicker";

export class NewReservation extends Component {
  render() {
    return (
      <div className="container-md ">
        <h5 className="text-CamelCase text-left ">New Reservation</h5>
        <div className="sr-container">
          <div className="sr-pg-entries">
            <h6 className="text-CamelCase text-left ">Renters Information</h6>
            <div className="row">
              <div className="col-md-5 mb-0">
                {/* <DatePicker /> */}
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="col-md-5 mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  Last
                  Name
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  required
                />
                <div className="invalid-feedback">
                  Valid Item No is required.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-10 mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="City">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="City"
                  placeholder="City"
                  required
                />
              </div>
              <div className="col-md-5 mb-3">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  Last
                  Name
                  className="form-control"
                  placeholder="Postal Code"
                  name="postalCode"
                  required
                />
                <div className="invalid-feedback">
                  Valid Item No is required.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 mb-0">
                <label htmlFor="driverLicense">Drivers License</label>
                <input
                  type="text"
                  className="form-control"
                  name="driverLicense"
                  placeholder="Drivers License"
                  required
                />
              </div>
              <div className="col-md-5 mb-3">
                <label htmlFor="dlProvice">Province</label>
                <select
                  className="form-select mb-0"
                  aria-label="Default select example"
                >
                  <option selected>Select Province</option>
                  <option>AB</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 mb-0">
                <label htmlFor="carLicense">Car License</label>
                <input
                  type="text"
                  className="form-control"
                  name="carLicense"
                  placeholder="Car License"
                  required
                />
              </div>
              <div className="col-md-5 mb-3">
                <label htmlFor="clProvince">Province</label>
                <select
                  className="form-select mb-0"
                  aria-label="Default select example"
                >
                  <option selected>Select Province</option>
                  <option>AB</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h6 className="text-CamelCase text-left ">Skier Information</h6>
            <Tabs
              defaultActiveKey="rentals"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="rentals" title="Rentals">
                <a>
                  <button>Add Skier</button>
                </a>
                <Tabs
                  defaultActiveKey="sk-1"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <a>
                    <button>Add New Reservation</button>
                  </a>
                  <Tab eventKey="sk-1" title="Skier 01">
                    <div className="row">
                      <div className="col-md-8 mb-3">
                        <label htmlFor="skiersName">Skiers Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="skiersName"
                          placeholder="Skiers Name"
                          required
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="age">Age</label>
                        <input
                          type="number"
                          className="form-control"
                          name="age"
                          placeholder="Age"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 mb-3">
                        <label htmlFor="Type">Type</label>
                        <select className="form-select mb-0" aria-label="---">
                          <option selected>I</option>
                          <option>II</option>
                        </select>
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="weight">Weight (lbs)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="Weight"
                          placeholder="Weight"
                          required
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="height">Height (ft)</label>
                        <input
                          type="number"
                          className="form-control"
                          name="height"
                          placeholder="Height"
                          required
                        />
                      </div>
                    </div>
                    <h6 className="text-CamelCase text-left ">Boots</h6>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="bootsModel">Model</label>
                        <input
                          type="text"
                          className="form-control"
                          name="bootsModel"
                          placeholder="Boots Model"
                          required
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="bootsCode">Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="bootsCode"
                          placeholder="Code"
                          required
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="bootSize">Size</label>
                        <input
                          type="number"
                          className="form-control"
                          name="bootSize"
                          placeholder="Size"
                          required
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="bootLength">Length</label>
                        <input
                          type="number"
                          className="form-control"
                          name="bootLength"
                          placeholder="Length"
                          required
                        />
                      </div>
                    </div>
                    <h6 className="text-CamelCase text-left ">Skis</h6>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="skiModel">Model</label>
                        <input
                          type="text"
                          className="form-control"
                          name="skiModel"
                          placeholder="Ski Model"
                          required
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="skiCode">Code</label>
                        <input
                          type="text"
                          className="form-control"
                          name="skiCode"
                          placeholder="Code"
                          required
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="skiSize">Size</label>
                        <input
                          type="number"
                          className="form-control"
                          name="skiSize"
                          placeholder="Size"
                          required
                        />
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="skiLength">Length</label>
                        <input
                          type="number"
                          className="form-control"
                          name="skiLength"
                          placeholder="Length"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label htmlFor="bindingModel">Binding Model</label>
                        <input
                          type="text"
                          className="form-control"
                          name="bindingModel"
                          placeholder="Binding Model"
                          required
                        />
                      </div>
                    </div>{" "}
                    <div className="row">
                      <div className="col-md-5 mb-3">
                        <input type="checkbox" name="polesLength" />
                        <label htmlFor="polesLength">&nbsp; Poles Length</label>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Tab>
              <Tab eventKey="additionals" title="Additionals">
                <div className="row">
                  <div className="col-md-10 mb-3">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="code">Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="code"
                      placeholder="Code"
                    />
                  </div>
                  <div className="col-md-5 mb-3">
                    <label htmlFor="fee">Fee</label>
                    <input
                      type="number"
                      className="form-control"
                      name="fee"
                      placeholder="Fee"
                      value={0.0}
                    />
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <button
                    className="btn btn-primary btn-md btn-block"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
                <table className="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th>Description</th>
                      <th>Fee</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </Tab>
            </Tabs>
          </div>
          <br />
          <div className="col-md-3 mb-2 ">
            <button className="btn btn-primary btn-md btn-block" type="submit">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewReservation;
