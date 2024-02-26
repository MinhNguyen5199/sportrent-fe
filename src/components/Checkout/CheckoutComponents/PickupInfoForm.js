import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const styles = {
    error: {
        marginTop: '-1rem', // Adjust the top margin as needed

    },
    input: {
        height: '2.3rem', // Adjust the bottom margin as needed
    },
    label: {
        fontSize: '14px',
        color: 'light-gray',
    },
};
// Reusable component: PickupInfoForm
export const PickupInfoForm = ({
    paymentOption,
    pickupFullName,
    address,
    city,
    country,
    province,
    zip,
    setPaymentOption,
    setPickupFullName,
    setAddress,
    setCity,
    setCountry,
    setProvince,
    setZip,
    showError,
    CanProvince,
    showButton,
    isDisabled,
    SaveReservation,
}) => {
    const { cart } = useSelector((state) => state.cart);

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (paymentOption && pickupFullName && address && city && country && province && zip) {
            SaveReservation(e);
        }
    };
    let reservation_Status = cart[0].product.season ;

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="reservationOption" className="form-label" style={styles.label}>
                            *Reservation Option
                        </label>
                        <select
                            className={`form-select ${submitted && !paymentOption ? "is-invalid" : ""}`}
                            value={paymentOption}
                            style={styles.input}
                            onChange={(e) => setPaymentOption(e.target.value)}
                            required
                        >
                            <option value="">Choose...</option>
                            {reservation_Status === "Sales" ? (
                                <option value="Paid">Reserve and Payment</option>
                            ) : (
                                <>
                                    <option value="Not-Paid">Save without Payment</option>
                                    <option value="Paid">Reserve and Payment</option>
                                </>
                            )}

                        </select>
                        {submitted && !paymentOption && (
                            <div className="invalid-feedback " style={styles.error}>Please provide a valid Reservation Option.</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="pickupFullName" className="form-label" style={styles.label}>
                            Picker Full Name
                        </label>
                        <input
                            type="text"
                            className={`form-control ${submitted && !pickupFullName ? "is-invalid" : ""}`}
                            placeholder=""
                            value={pickupFullName}
                            onChange={(e) => setPickupFullName(e.target.value)}
                            required
                            style={styles.input}
                        />
                        {submitted && !pickupFullName && (
                            <div className="invalid-feedback" style={styles.error}>Please provide a valid Full Name.</div>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="address" className="form-label" style={styles.label}>
                            Address
                        </label>
                        <input
                            type="text"
                            className={`form-control ${submitted && !address ? "is-invalid" : ""}`}
                            placeholder="1234 Center St"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            style={styles.input}
                        />
                        {submitted && !address && (
                            <div className="invalid-feedback" style={styles.error}>Please provide a valid Address.</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="city" className="form-label" style={styles.label}>
                            City
                        </label>
                        <input
                            type="text"
                            className={`form-control ${submitted && !city ? "is-invalid" : ""}`}
                            placeholder="Calgary"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            style={styles.input}
                        />
                        {submitted && !city && (
                            <div className="invalid-feedback" style={styles.error}>Please provide a valid City.</div>
                        )}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="country" className="form-label" style={styles.label}>
                            Country
                        </label>
                        <select
                            className={`form-select ${submitted && !country ? "is-invalid" : ""}`}
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            style={styles.input}
                        >
                            <option value="">Choose...</option>
                            <option value="Canada">Canada</option>
                            <option value="United States">United States</option>
                            <option value="Mexico">Mexico</option>
                        </select>
                        {submitted && !country && (
                            <div className="invalid-feedback" style={styles.error}>Please provide a valid Country.</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="province" className="form-label" style={styles.label}>
                            Province
                        </label>
                        <select
                            className={`form-select ${submitted && !province ? "is-invalid" : ""}`}
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            required
                            style={styles.input}
                        >
                            <option value="">Choose...</option>
                            {CanProvince.map((prov) => (
                                <option value={prov} key={prov}>
                                    {prov}
                                </option>
                            ))}
                        </select>
                        {submitted && !province && (
                            <div className="invalid-feedback" style={styles.error}>Please provide a valid Province.</div>
                        )}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="zip" className="form-label" style={styles.label}>
                            Zip
                        </label>
                        <input
                            type="text"
                            className={`form-control ${submitted && !zip ? "is-invalid" : ""}`}
                            placeholder=""
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                            style={styles.input}
                        />
                        {submitted && !zip && (
                            <div className="invalid-feedback" style={styles.error}>Please provide a valid Zip Code.</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="save-info" />
                <label className="form-check-label" htmlFor="save-info">
                    Save this information for next time
                </label>
            </div>

            {showButton && (
                <div className="saveButton">
                    <button
                        className="btn btn-primary bg-black btn-black"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isDisabled}
                    >
                        Save Reservation without Payment
                    </button>
                </div>
            )}
        </>
    );
};

PickupInfoForm.propTypes = {
    paymentOption: PropTypes.string,
    pickupFullName: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    province: PropTypes.string,
    zip: PropTypes.string,
    setPaymentOption: PropTypes.func,
    setPickupFullName: PropTypes.func,
    setAddress: PropTypes.func,
    setCity: PropTypes.func,
    setCountry: PropTypes.func,
    setProvince: PropTypes.func,
    setZip: PropTypes.func,
    showError: PropTypes.bool,
    CanProvince: PropTypes.arrayOf(PropTypes.string),
    showButton: PropTypes.bool,
    isDisabled: PropTypes.bool,
    saveReservation: PropTypes.func,
};

