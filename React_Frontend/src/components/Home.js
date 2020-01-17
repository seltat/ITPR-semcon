import React, { Component } from "react";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import Footer from "./Footer";
import Navigation from "./Navigation";

class Home extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Container fluid>
          <Row>
            <Col>
              <h1>IT-Projekt Wirtschaftsinformatik</h1>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default Home;
