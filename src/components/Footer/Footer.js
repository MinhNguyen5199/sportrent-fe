import React, { Component } from "react";
import "./FooterStyles.css";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Footer extends Component {
  render() {
    return (
      <footer className="sr-footer">
        <div>
          <div className="sr-footer-links">
          
            <div className="sr-footer-links-item">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/Location-Hours">Location</a>
                </li>
                <li>
                  <a href="/contact-us">contact Us</a>
                </li>
                <li>
                  <a href="/">Terms of service</a>
                </li>
                <li>
                  <a href="">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div className="sr-footer-links-item">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <a href="/Rentals/4"> Bike Rental Calgary</a>
                </li>
                <li>
                  <a href="/Rentals/10">Ski Rentals</a>
                </li>
                <li>
                  <a href="/Rentals/2">Raft Rental</a>
                </li>
                <li>
                  <a href="/Rentals/10">Seasonal Ski Rentals</a>
                </li>
                <li>
                  <a href="/Rentals/4">Specialized E-Bikes</a>
                </li>
                <li>
                  <a href="/Rentals/134">Bow River Float Times</a>
                </li>
                <li>
                  <a href="/Rentals/3">Stand Up Paddle Board Rental Calgary</a>
                </li>
                <li>
                  <a href="/Rentals/4">Calgary Area Bike Trails</a>
                </li>
                <li>
                  <a href="#">Fall Sale</a>
                </li>
              </ul>
            </div>

            <div className="sr-footer-links-item">
              <h4>Contact Us</h4>
              <p>
                4424 16th ave NW <br /> Calgary,AB
                <br /> Canada <br />
                <br />
                <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                <span style={{ marginLeft: "10px" }}>+1 (403) 292 0077</span>
                <br />
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                <span style={{ marginLeft: "10px" }}>Info@sportsrent.ca</span>
                <br />
              </p>
            </div>
            <div className="sr-footer-links-item">
              <h4>About Sports Rent</h4>
              <p>
                Come check out our huge inventory of Inflatable Paddle Boards
                for rent!
              </p>
              <div className="social-links mt-3">
                <a href="#" className="twitter"></a>
                <a href="#" className="facebook">
                  <i className="bx bxl-facebook"></i>
                </a>
                <a href="#" className="instagram">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="sr-footer-copy">
          <div>
            <span>
              &copy; Copyright 2022 <strong>Sports Rent</strong>. All Rights
              Reserved
            </span>
          </div>
          <div> 
            <span>Designed by: SAIT Students</span>
          </div>
        </div>
      </footer>
    );
  }
}
