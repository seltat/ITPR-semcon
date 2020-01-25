import React, { Component } from "react";
import {
  Table,
  Row,
  Col,
  Spinner,
  Container
} from "reactstrap";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Filter from "../components/Filter";


class ComparisonsAvgDelayMonthWeekdayView extends Component {

  sparqlQuery2="prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
      "prefix xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
      "prefix f:   <http://www.jku.at/dke/semcon/departuredelays#>\n" +
      "\n" +
      "SELECT \n" +
      "    ?year \n" +
      "    ?month \n" +
      "    ?dayName\n" +
      "    (COUNT(DISTINCT ?flight) as ?count) \n" +
      "    (AVG(?delayMinutes) as ?avgDelay)\n" +
      "    (MIN(?delayMinutes) as ?minDelay)\n" +
      "    (MAX(?delayMinutes) as ?maxDelay)\n" +
      "WHERE {\n" +
      "    ?flight rdf:type f:flight .\n" +
      "    ?flight f:hasPlannedDeparture ?plannedDeparture .\n" +
      "    ?flight f:hasDepartureDelay ?delay .\n" +
      "    BIND( hours(?delay)*60+ minutes(?delay) AS ?delayMinutes)\n" +
      "    BIND(year(?plannedDeparture) AS ?year)\n" +
      "    BIND(month(?plannedDeparture) AS ?month)\n" +
      "\n" +
      "    BIND (?plannedDeparture - \"1900-01-01\"^^xsd:date AS ?dayOffset)\n" +
      "    BIND (xsd:integer(day(?dayOffset)) as ?dayLiteral)\n" +
      "    BIND (xsd:integer(floor(?dayLiteral - (7 * floor(?dayLiteral/7)))) AS ?mod)\n" +
      "    VALUES (?mod ?dayName) {\n" +
      "         (0    \"Monday\")\n" +
      "         (6    \"Tuesday\")\n" +
      "         (5    \"Wednesday\")\n" +
      "         (4    \"Thursday\")\n" +
      "         (3    \"Friday\")\n" +
      "         (2    \"Saturday\")\n" +
      "         (1    \"Sunday\")\n" +
      "  }\n" +
      "  {filter}\n" +
      "} \n" +
      "GROUP BY ?year ?month ?dayName \n" +
      "ORDER BY ?year ?month ?dayName";

  state = {
    loading: false,
    activeTab: "1",
    semconData: [],
    filter: '',
    dbPediaData: null
  };

  filterCallback = (filterData) =>{
    console.log("Comparision view got Filter: "+filterData);
    this.setState({filter: filterData});
    this.callSemconQuery(filterData)
  }

  getFilteredQuery(query,filter){
    return query.replace("{filter}",filter)
  }

  callSemconQuery(filter=''){
    this.semconQuery("http://localhost:8080/sparql",
        new Array(this.getFilteredQuery(this.sparqlQuery2, filter)))
  }

  semconQuery(semcon_endpoint, queries) {
    console.log(queries[0]);

    const urls = queries.map(
        (query)=>{
            // Workaround for '*' not being URL-encoded:
            const workaroundQuery =  encodeURIComponent(query).split('*').join('%2A');

            return  semcon_endpoint + "?query=" + workaroundQuery
          });
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
                    y.day = x.dayName.value;
                    y.avgDelay = parseFloat(x.avgDelay.value);
                    y.minDelay = parseFloat(x.minDelay.value);
                    y.maxDelay = parseFloat(x.maxDelay.value);
                    return y;
                  });
                })
                .then(res => this.setState({ semconData: res, loading: false }))
        )
    );
  }

  componentDidMount() {
    this.callSemconQuery()
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
                      <h3>Verspätung nach Wochentag je Monat und Jahr</h3>
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
                          <th scope="row">Wochentag</th>
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
                                  <td>{x.day}</td>
                                  <td>
                                  {this.pad(x.avgDelay - (x.avgDelay % 1), 2)} Minuten{" "}
                                  {this.pad(Math.round((x.avgDelay % 1) * 60), 2)}{" "}
                                  Sekunden
                                  </td>
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

export default ComparisonsAvgDelayMonthWeekdayView;
