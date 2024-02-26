import React from "react";
import Button from "react-bootstrap/Button";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { withRouter } from "../../constants/WithRouter";

import "./Pages.css";
class ContactUs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-sm">
        <header className="sr-page-header">
          <h1>Contact Us</h1>
        
          <p>Have any questions? We'd love to hear from you.</p>
        </header>

        <section className="sr-section">
          <div className="div-2">
            <form name="form">
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <div>
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div>
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="firstName"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div>
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div>
                      <label>Message</label>
                      <textarea
                        className="form-control"
                        rows={10}
                        name="message"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col btn-send">
                    <button type="submit" className="sr-btn prim">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="div-contact" style={{ flexGrow: "5" }}>
            <h4>Contact Information</h4>
            <p>
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
              <span style={{ marginLeft: "10px" }}>
                Call : <a href="tel: +14032920077">+1 403.292.0077</a>
              </span>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              <span style={{ marginLeft: "10px" }}>
                Email :
                <a href="mailto:info@sportsrent.ca"> info@sportsrent.ca</a>
              </span>
            </p>
          </div>
        </section>

        {/* <div>
          <h3 className="mb-2 pt-5">Contact Us</h3>
          <p>Have any questions? We'd love to hear from you.</p>
        </div> */}

        {/* <div className="contact-div" style={{}}>
          <div className="div-sendmsg">
            <form>
              <div>
                <div className="flex-direction-column">
                  <label>First Name</label>
                  <input type="text"></input>
                </div>
                <div
                  className="flex-direction-column"
                  style={{ marginLeft: "10px" }}
                >
                  <label>Last Name</label>
                  <input type="text"></input>
                </div>
              </div>
              <div>
                <div className="flex-direction-column">
                  <label>Phone Number</label>
                  <input type="text"></input>
                </div>
              </div>
              <div>
                <div className="flex-direction-column">
                  <label>Email</label>
                  <input type="email"></input>
                </div>
              </div>
              <div>
                <div className="flex-direction-column">
                  <label>Message</label>
                  <textarea cols={6}></textarea>
                </div>
              </div>
              <div>
                <Button variant="primary">Send Message</Button>
              </div>
            </form>
          </div>

          <div className="contact-info">
            <h5>Contact Information</h5>
            <p>
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
              <span style={{ marginLeft: "10px" }}>
                Call : <a href="tel: +14032920077">+1 403.292.0077</a>
              </span>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              <span style={{ marginLeft: "10px" }}>
                Email :
                <a href="mailto:info@sportsrent.ca"> info@sportsrent.ca</a>
              </span>
            </p>
          </div>
        </div> */}
      </div>
    );
  }
}
export default withRouter(ContactUs);
