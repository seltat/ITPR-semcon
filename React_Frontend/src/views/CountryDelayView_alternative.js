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

class CountryDelayView_alternative extends Component {
  state = {
    loading: true,
    activeTab: "2",
    semconData: [],
    data: [
      { name: "Österreich", delay: "439" },
      { name: "Deutschland", delay: "10" }
    ]
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

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
              var ret = {};
              ret.delay = parseFloat(x.delay.value);
              ret.country = x.country.value;
              ret.country_name = x.countryname.value;
              ret.latitude = x.countrylocation.value.split(" ")[0];
              ret.longitude = x.countrylocation.value.split(" ")[1];
              ret.pos = [ret.latitude, ret.longitude];
              return ret;
            });
          })
          .then(res => {
            var ret = {};
            res.forEach(r => {
              ret[r.country] = r;
            });
            var daten_array = [];
            Object.keys(ret).forEach(k => {
              daten_array.push(ret[k]);
            });
            return daten_array;
          })
          .then(res => this.setState({ semconData: res, loading: false }))
      )
    );
  }

  componentDidMount() {
    var fusekiQueries = [
      `Prefix cont: <http://www.jku.at/dke/semcon/departuredelays#>
      Prefix georss: <http://www.georss.org/georss/>
      Prefix dbo: <http://dbpedia.org/ontology/>
      Prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
      Prefix foaf: <http://xmlns.com/foaf/0.1/>
      Select distinct ?country ?countrylocation ?countryname (AVG(minutes(?depDelay)) AS ?delay)
      where {
          ?flight cont:hasOrigin ?origin.
          BIND(STR(?origin) AS ?icaocode).
          ?flight cont:hasDepartureDelay ?depDelay.
        SERVICE<https://dbpedia.org/sparql>{
          ?country georss:point ?countrylocation.
          ?country dbo:longName ?countryname.
          ?city dbo:country ?country.
          ?airport dbo:city ?city.
          ?airport dbo:icaoLocationIdentifier ?icaocode.
        }
          
      }
      group by ?country ?countrylocation ?countryname
      order by asc(?delay)`
    ];
    this.semconQuery("http://localhost:4040/rdf/sparql", fusekiQueries);  //<-- For use with Semantic container RDF Endpoint on Port 4040 (requires disabling CORS in Browser)
    //this.semconQuery("http://localhost:8080/sparql", fusekiQueries);    //<-- For use with MetaService on Port 8080
  }
  pad = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };

  render() {
    const position = [51.505, -0.09];
    return (
      <React.Fragment>
        <Navigation />
        {this.state.loading ? (
          <Spinner className="windowCenter"></Spinner>
        ) : (
          <React.Fragment>
            <Container fluid>
              <Row>
                <Col>
                  <h3>Durchschnittliche Verspätung pro Land</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          this.toggleTab("1");
                        }}
                      >
                        Tabelle
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => {
                          this.toggleTab("2");
                        }}
                      >
                        Karte
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <Table>
                            <thead>
                              <tr>
                                <th scope="row">Land/Region</th>

                                <th scope="row">
                                  Durchschnittliche Verspätung
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.semconData.map(x => (
                                <tr key={x.country}>
                                  <td>{x.country_name}</td>
                                  <td>
                                    {this.pad(x.delay - (x.delay % 1), 2)}{" "}
                                    Minuten{" "}
                                    {this.pad(
                                      Math.round((x.delay % 1) * 60),
                                      2
                                    )}{" "}
                                    Sekunden
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Map className="map" center={position} zoom={6}>
                        <TileLayer
                          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {this.state.semconData.map(country =>
                          country.pos != null ? (
                            <Marker
                              position={country.pos}
                              key={country.country}
                            >
                              <Popup>
                                {country.country_name}:{" "}
                                {this.pad(
                                  country.delay - (country.delay % 1),
                                  2
                                )}{" "}
                                Minuten{" "}
                                {this.pad(
                                  Math.round((country.delay % 1) * 60),
                                  2
                                )}{" "}
                                Sekunden
                              </Popup>
                            </Marker>
                          ) : null
                        )}
                      </Map>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        )}
        <Footer creator="Felix Winterleitner" />
      </React.Fragment>
    );
  }
}

export default CountryDelayView_alternative;
