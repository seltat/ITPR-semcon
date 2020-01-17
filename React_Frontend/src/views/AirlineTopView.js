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
  Spinner
} from "reactstrap";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

class AirlineTopView extends Component {
  state = {
    loading_semcon: true,
    loading_dbPedia: true,
    activeTab: "1",
    semconData: [],
    dbPediaData: []
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  componentDidMount() {
    const dbPediaQueries = [
      `select distinct ?nCountry (COUNT(*) AS ?nrAirports) 
    where { ?country dbo:longName ?nCountry. ?city dbo:country ?country. ?airport dbo:city ?city. ?airport dbo:icaoLocationIdentifier ?icao. 
    FILTER regex(?icao, "^....$"). FILTER regex(?icao, "^[A-Z]"). } 
    group by ?nCountry order by desc(?nrAirports)`
    ];
    const dbPediaDomain =
      "https://dbpedia.org/sparql?default-graph-uri=http://dbpedia.org&query=";
    const dbPediaFormat = "&format=application/json";
    this.dbPediaQuery(dbPediaDomain, dbPediaQueries, dbPediaFormat);

    const semConQueries = [
      `prefix cont:<http://www.jku.at/dke/semcon/departuredelays#>
      select distinct ?airport ?airline (COUNT(*) AS ?nrFlights)
      where {
      ?flight cont:isPerformedByCompany ?airline.
      ?flight cont:hasOrigin ?airport.
      }
      group by ?airport ?airline
      order by  ?airport desc(?nrFlights)`
    ];
    const semConDomain = "http://localhost:8080/sparql?query=";
    this.semConQueries(semConDomain, semConQueries);
  }

  semConQueries(domain, queries) {
    const urls = queries.map(query => domain + encodeURIComponent(query));
    Promise.all(
      urls.map(url =>
        fetch(url)
          .then(res => {
            console.log(res);
            return res.json();
          })
          .then(res => {
            return res.results.bindings;
          })
          .then(results => {
            return [].concat(...results);
          })
          .then(res =>
            this.setState({ semconData: res, loading_semcon: false })
          )
      )
    );
  }

  dbPediaQuery(domain, queries, format) {
    const urls = queries.map(
      query => domain + encodeURIComponent(query) + format
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
          .then(res =>
            this.setState({ dbPediaData: res, loading_dbPedia: false })
          )
      )
    );
  }

  render() {
    var daten = {};
    var counter = 0;
    var oldEntry = null;
    var repCounter = 0;
    this.state.semconData.forEach(element => {
      var entry = {
        airport: element.airport.value,
        airline: element.airline.value,
        amount: element.nrFlights.value
      };
      if (counter > 0) {
        if (oldEntry.airport === entry.airport) {
          repCounter++;
          if (repCounter < 3) {
            daten[counter] = entry;
            counter++;
            oldEntry = entry;
          }
        } else {
          repCounter = 1;
          daten[counter] = entry;
          oldEntry = entry;
          counter++;
        }
      } else {
        daten[counter] = entry;
        counter++;
        oldEntry = entry;
      }
    });
    var daten_array = [];
    Object.keys(daten).forEach((k, index) => {
      daten_array[index] = daten[k];
    });
    return (
      <React.Fragment>
        <Navigation />
        {this.state.loading_semcon || this.state.loading_dbPedia ? (
          <Spinner className="windowCenter"></Spinner>
        ) : (
          <React.Fragment>
            <Nav tabs>
              <NavItem>
                <NavLink
                  onClick={() => {
                    this.toggleTab("1");
                  }}
                >
                  Flughäfen
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
                          <th scope="row">Flughafen</th>
                          <th scope="row">Fluglinie</th>
                          <th scope="row">Anzahl Flüge</th>
                        </tr>
                      </thead>
                      <tbody>
                        {daten_array.map(x => (
                          <tr>
                            <td>{x.airport}</td>
                            <td>{x.airline}</td>
                            <td>{x.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </React.Fragment>
        )}
        <Footer creator="Christoph Großauer" />
      </React.Fragment>
    );
  }
}

export default AirlineTopView;
