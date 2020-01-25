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

  sparqlQuery1="prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
      "prefix xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
      "prefix f:   <http://www.jku.at/dke/semcon/departuredelays#>\n" +
      "\n" +
      "SELECT \n" +
      "    ?year \n" +
      "    ?month \n" +
      "    (COUNT(DISTINCT ?flight) as ?count) \n" +
      "    (AVG(?delayMinutes) as ?avgDelay)\n" +
      "    (MIN(?delayMinutes) as ?minDelay)\n" +
      "    (MAX(?delayMinutes) as ?maxDelay)\n" +
      "WHERE {\n" +
      "    ?flight rdf:type f:flight .\n" +
      "    ?flight f:hasPlannedDeparture ?plannedDeparture .\n" +
      "    ?flight f:hasDepartureDelay ?delay .\n" +
      "    BIND( hours(?delay)*60+ minutes(?delay) AS ?delayMinutes)\n" +
      "    {filter}" +
      "    BIND(year(?plannedDeparture) AS ?year)\n" +
      "    BIND(month(?plannedDeparture) AS ?month)\n" +
      "} \n" +
      "GROUP BY ?year ?month\n";

  state = {
    loading: false,
    activeTab: "1",
    semconData: [],
    filter: '',
    dbPediaData: null
  };

  filterCallback = (filterData) =>{
    this.setState({filter: filterData});
    console.log("Comparision view got Filter: "+filterData);


  }

  getFilteredQuery(query,filter){
    return query.replace("{filter}",filter)
  }


  semconQuery(semcon_endpoint, queries) {
    const urls = queries.map(
        query => semcon_endpoint + "?query=" + encodeURIComponent(query)
    );
    Promise.all(
        urls.map(url =>
            fetch(url)
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  return res.results.bindings;
                })
                .then(results => {
                  return [].concat(...results);
                })
                .then(res => {
                  return res.map(x => {
                    var y = {};
                    y.year = x.year.value;
                    y.month = x.month.value;
                    y.count = x.count.value;
                    y.avgDelay = parseFloat(x.avgDelay.value);
                    y.minDelay = parseFloat(x.minDelay.value);
                    y.maxDelay = parseFloat(x.maxDelay.value);
                    console.log(y);
                    return y;
                  });
                })
                .then(res => this.setState({ semconData: res, loading: false }))
        )
    );
  }

  componentDidMount() {
    this.semconQuery("http://localhost:8080/sparql",
        new Array(this.getFilteredQuery(this.sparqlQuery1, this.state.filter)))
  }

  pad = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };


  render() {
    var daten_array = this.state.semconData;
    console.log(daten_array);

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
                      <Filter parentCallback={this.filterCallback}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <Table>
                        <thead>
                        <tr>
                          <th scope="row">Jahr</th>
                          <th scope="row">Monat</th>
                          <th scope="row">Anzahl</th>
                          <th scope="row">Avg Verspätung</th>
                          <th scope="row">Min Verspätung</th>
                          <th scope="row">Max Verspätung</th>
                        </tr>
                        </thead>
                        <tbody>
                        {daten_array
                            .sort((x, y) => x.month > y.month)
                            .map(x => (

                                <tr key={x.month}>
                                  <td>{x.year}</td>
                                  <td>{x.month}</td>
                                  <td>{x.count}</td>
                                  <td>{x.avgDelay}</td>
                                  <td>{x.minDelay}</td>
                                  <td>{x.maxDelay}</td>
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
