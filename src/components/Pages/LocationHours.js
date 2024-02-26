import React from "react";
import { withRouter } from "../../constants/WithRouter";

import { Container, Row, Col } from "react-bootstrap";

import "./Pages.css";
class LocationHours extends React.Component {


  render() {
    return (
      <div className="container-sm">
        <header className="sr-page-header">
          <h1>Location & Hours</h1>
         
          <p>We are fully open for all your rental and service needs.</p>
        </header>

        <section>
          <div
            style={{ height: "300px", border: "1px solid rgb(197, 197, 197)" }}
          >
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="https://maps.google.com/maps?q=4424%2016th%20ave%20NW&t=&z=17&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0" 
            ></iframe>
          </div>
          <br />
          <div style={{ width: "100%", height: "100%" }}>
            <h4>Shop Hours</h4>
            <Container>
              <Row>
                <Col xs={6}>Monday to Thursday</Col>
                <Col style={{ textAlign: "right" }}>10:00 AM</Col>
               - 
                <Col style={{ textAlign: "left" }}>7:00 PM</Col>
              </Row>
              <Row>
                <Col xs={6}>Friday</Col>
                <Col style={{ textAlign: "right" }}>10:00 AM</Col>
              -
                <Col style={{ textAlign: "left" }}>8:00 PM</Col>
              </Row>
              <Row>
                <Col xs={6}>Saturday & Sunday</Col>
                <Col style={{ textAlign: "right" }}>8:00 AM</Col>
                -
                <Col style={{ textAlign: "left" }}>8:00 PM</Col>
              </Row>
            </Container>
            <br />
            <h4>Holiday Hours 2022</h4>
            <Container>
              <Row>
                <Col xs={6}>December 24th</Col>
                <Col style={{ textAlign: "right" }}>6:00 AM</Col>
                -
                <Col style={{ textAlign: "left" }}>7:00 PM</Col>
              </Row>
              <Row>
                <Col xs={6}>December 25th</Col>
                <Col style={{ textAlign: "right" }}>Closed &nbsp;  &nbsp;</Col>
             
                <Col style={{ textAlign: "left" }}></Col>
              </Row>
              <Row>
                <Col xs={6}>December 26th</Col>
                <Col style={{ textAlign: "right" }}>6:00 AM</Col>
                -
                <Col style={{ textAlign: "left" }}>10:00 PM</Col>
              </Row>
              <Row>
                <Col xs={6}>December 31st</Col>
                <Col style={{ textAlign: "right" }}>6:00 PM</Col>
                -
                <Col style={{ textAlign: "left" }}>10:00 PM</Col>
              </Row>
            </Container>
            <p>
              Our hours change as fast as the weather! Check back for seasonal
              store hour changes.
            </p>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(LocationHours);
