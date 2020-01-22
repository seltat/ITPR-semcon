import React from "react";
import L from "leaflet";

import "../App.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Container, Row, Col } from "reactstrap";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

var myIcon = L.icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

export default class AirportDelayView extends React.Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
    airports: [],
    delays: []
  };

  componentDidMount() {
    var query1 = `&query=Select distinct ?icao ?name ?lat ?long
        Where {
            ?airport dbo:icaoLocationIdentifier ?icao.
            ?airport geo:lat ?lat.
            ?airport geo:long ?long.
            ?airport foaf:name ?name.
            FILTER regex(?icao, "^....$").
            FILTER regex(?icao, "^[A-R]") 
        }
        order by asc(?icao)`;

    var query2 = `&query=Select distinct ?icao ?name ?lat ?long
        Where {
            ?airport dbo:icaoLocationIdentifier ?icao.
            ?airport geo:lat ?lat.
            ?airport geo:long ?long.
            ?airport foaf:name ?name.
            FILTER regex(?icao, "^....$").
            FILTER regex(?icao, "^[S-Z]") 
        }
        order by asc(?icao)`;

    var departureDelay = `Prefix cont: <http://www.jku.at/dke/semcon/departuredelays#> 
        Select distinct ?origin (AVG( minutes(?depDelay)) AS ?delay)
        Where {
            ?flight cont:hasOrigin ?origin.
            ?flight cont:hasDepartureDelay ?depDelay
        }
        Group By ?origin 
        Order By desc(?delay)`;

    fetch(
       "http://localhost:4040/rdf/sparql?query=" + encodeURIComponent(departureDelay) //<-- For use with Semantic container RDF Endpoint on Port 4040 (requires disabling CORS in Browser)  //"http://localhost:8080/sparql?query=" + encodeURIComponent(departureDelay) //<-- For use with MetaService on Port 8080
    )
      .then(res => res.json())
      .then(results =>
        results.results.bindings.map(x => {
          return {
            icao: x.origin.value.split("/").slice(-1)[0],
            delay: x.delay.value.split("/").slice(-1)[0]
          };
        })
      )
      .then(results => {
        this.setState({ delays: results });
      });

    var format = "&format=application/json";

    const urls = [
      "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org" +
        encodeURI(query1) +
        encodeURI(format),
      "http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org" +
        encodeURI(query2) +
        encodeURI(format)
    ];

    Promise.all(
      urls.map(url =>
        fetch(url)
          .then(res => res.json())
          .then(res => res.results.bindings)
      )
    )
      .then(results => {
        return [].concat(...results);
      })
      .then(results =>
        results.map(x => {
          return {
            icao: x.icao.value.split("/").slice(-1)[0],
            lat: x.lat.value.split("/").slice(-1)[0],
            long: x.long.value.split("/").slice(-1)[0],
            name: x.name.value.split("/").slice(-1)[0]
          };
        })
      )
      .then(results => {
        this.setState({ airports: results });
      });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    var airportMap = {};
    if (Array.isArray(this.state.airports)) {
      this.state.airports.forEach(x => {
        var content = { lat: x.lat, long: x.long, name: x.name };
        airportMap[x.icao] = content;
      });
      console.log(airportMap);
    }
    return (
      <React.Fragment>
        <Navigation />
        <Container fluid>
          <Row>
            <Col>
              <h3>Durchschnittliche Verspätung pro Flughafen</h3>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Map className="map" center={position} zoom={this.state.zoom}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {airportMap != null
                  ? this.state.delays.map(airportDelay =>
                      airportMap[airportDelay.icao] != null &&
                      airportMap[airportDelay.icao].lat != null &&
                      airportMap[airportDelay.icao].long != null &&
                      airportMap[airportDelay.icao].name != null ? (
                        <Marker
                          position={[
                            airportMap[airportDelay.icao].lat,
                            airportMap[airportDelay.icao].long
                          ]}
                          icon={myIcon}
                        >
                          <Popup>
                            Airport: {airportMap[airportDelay.icao].name} with
                            ICAO Code: {airportDelay.icao} <br /> Average
                            Departure Delay:
                            {airportDelay.delay}
                          </Popup>
                        </Marker>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </Map>
            </Col>
          </Row>
        </Container>
        <Footer creator="Andreas Bachl" />
      </React.Fragment>
    );
  }
}
