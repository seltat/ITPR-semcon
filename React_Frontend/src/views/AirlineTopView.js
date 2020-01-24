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
  data = {
   country: [],
   airport: []
  }
  state = {
    render_counter: 0,
    init_executed: false,
    loading_semcon: true,
    loading_dbPedia: true,
    activeTab: "1",
    semconData: [],
    dbPediaData: [],
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  componentDidMount() {
    const dbPediaQueries = [
      `select distinct ?country ?icao AS ?airport
      where { 
      ?country dbo:longName ?nCountry. 
      ?city dbo:country ?country. 
      ?airport dbo:city ?city. 
      ?airport dbo:icaoLocationIdentifier ?icao. 
      FILTER regex(?icao, "^....$"). 
      FILTER regex(?icao, "^[A-Z]"). }
      GROUP BY ?nCountry
      ORDER BY desc(?country)`
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

  fillTable(){
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
        //filter top three
        if (counter > 0) {
          if (oldEntry.airport === entry.airport) {
            repCounter++;
            if (repCounter < 3) {
              daten[counter] = entry;
              counter++;
              oldEntry = entry;
            }
          } else {
            repCounter = 0;
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

      Object.keys(daten).forEach(k => {
        this.data.airport.push(daten[k]);
      });

      var countryList = [];
      var dbPData = this.state.dbPediaData;
      var semcData = this.state.semconData;

      //merge
      for(var i in semcData){
        var obj = {
          airport: semcData[i].airport.value, 
          airline: semcData[i].airline.value, 
          amount: semcData[i].nrFlights.value
        };

        for(var k in dbPData){
          if(semcData[i].airport.value === dbPData[k].airport.value){
            obj.country = dbPData[k].country.value;
          }
        }
        obj.country = obj.country || 'undefined';
        if(obj.country !== 'undefined'){
          countryList.push(obj);
        } 
      }

      //group by country, airline
      const groupBy = keys => array =>
        array.reduce((objectsByKeyValue, obj) => {
          const value = keys.map(key => obj[key]).join('-');
          objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
          return objectsByKeyValue;
        }, {});

      const groupByCountry = groupBy(['country','airline']);

      const groupedWithCountries = [];
      //translate to array
      Object.values(groupByCountry(countryList)).forEach(value => {
        var counter = 0;
        for(var i = 0; i < value.length; i++){
          counter += parseInt(value[i].amount);
        }
        var obj = {
          country: value[0].country,
          airline: value[0].airline,
          amount: counter
        };    
        groupedWithCountries.push(obj);    
      });
      //sort
      groupedWithCountries.sort(function(a,b){
        if(a.country < b.country) {return -1; }
        if(a.country > b.country) {return 1; }
        if(a.amount > b.amount) {return -1; }
        if(a.amount < b.amount) {return 1; }
        return 0;
      });

      var prev = {
        country: "",
        airline: "",
        amount: 0
      };
      var counter = 0;
      var sortedList = [];

      //Filter top 3
      groupedWithCountries.forEach(x => {
        if(prev.country === x.country){
          counter++;
          if(counter < 3){
            sortedList.push(x);
          }
        }else{
          sortedList.push(x);
          prev = x;
          counter = 0;
        }
        prev = x;
      });

      sortedList.forEach(x => {
        x.country = x.country.substring(x.country.lastIndexOf("/")+1);
        this.data.country.push(x);
      });
      this.setState({
        init_executed: true
      });
  }

  render() {
    if(!this.state.init_executed && !this.state.loading_semcon && !this.state.loading_dbPedia){
      this.fillTable();
    };
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
              <NavItem>
                <NavLink
                  onClick={() => {
                    this.toggleTab("2");
                  }}
                >
                  Länder
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
                        {this.data.airport.map(x => (
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
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Table>
                      <thead>
                        <tr>
                          <th scope="row">Land</th>
                          <th scope="row">Fluglinie</th>
                          <th scope="row">Anzahl Flüge</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.data.country.map(x => (
                          <tr>
                            <td>{x.country}</td>
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
