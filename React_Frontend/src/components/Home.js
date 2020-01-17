import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
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
          <Row>
            <Col>
              <block>
                Dieses Projekt stellt das Workpackage 3 des Kurses IT-Projekt
                Wirtschaftsinformatik am DKE-Institut der JKU im Wintersemester
                2019/2020 dar. Die Ausarbeitung erfolgte durch Andreas Bachl,
                Christoph Großauer, Franz Reischl und Felix Winterleitner. Die
                Lösungen sind im Menüpunkt "Seiten" zu finden.
              </block>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default Home;
