import React, { Component } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  TabPane,
  TabContent,
  Button,
  CardTitle,
  CardText,
  NavLink,
  NavItem,
  Nav,
  Spinner,
  Container
} from "reactstrap";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Filter from "../components/Filter"


class Comparisons extends Component {
  state = {
    loading: false,
    activeTab: "1",
    semconData: [],
    dbPediaData: null
  };

  render() {
    // var daten_array = this.state.semconData;
    var daten_array = ["!","adsf"];

    return (
        <React.Fragment>
          <Navigation />
          {this.state.loading || daten_array == null ? (
              <Spinner className="windowCenter"></Spinner>
          ) : (
              <React.Fragment>
                <Container fluid>
                  <Row>
                    <Col>
                      <h3>Weitere Abfragen</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Filter />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <Table>
                        <thead>
                        <tr>
                          <th scope="row">Fluglinie</th>

                          <th scope="row">Durchschnittliche Verspätung</th>
                        </tr>
                        </thead>
                        <tbody>
                        {daten_array
                            .sort((x, y) => x.airline > y.airline)
                            .map(x => (
                                <tr key={x.airline}>
                                  <td>{x.airline}</td>
                                  <td>

                                  </td>
                                </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Container>
              </React.Fragment>
          )}
          <Footer creator="Franz Reischl" />
        </React.Fragment>
    );
  }
}

export default Comparisons;
