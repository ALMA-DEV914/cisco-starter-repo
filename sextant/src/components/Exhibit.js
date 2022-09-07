import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Banner from "./Banner";
import GetUserv4Info from "./v4ipAddress";
import GetUserv6Info from "./v6IpAddress";

class Exhibit extends Component {
  render() {
    return (
      <>
        <div className="main">
          <Banner />
        </div>
        <Container className="mt-4">
          <Row>
            <Col className="col-6">
              <Card>
                <Card.Header>User v4 Ip address</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    <GetUserv4Info />
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-6">
              <Card>
                <Card.Header>User v6 Ip Address</Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    <GetUserv6Info />
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Exhibit;
