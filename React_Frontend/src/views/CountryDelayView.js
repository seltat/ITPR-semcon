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

var codes = [];
codes["AG"] = "Salomonen";
codes["AN"] = "Nauru";
codes["AY"] = "Papua-Neuguinea";
codes["BG"] = "Grönland";
codes["BI"] = "Island";
codes["BK"] = "Kosovo";
codes["C"] = "Kanada";
codes["DA"] = "Algerien";
codes["DB"] = "Benin";
codes["DF"] = "Burkina Faso";
codes["DG"] = "Ghana";
codes["DI"] = "Elfenbeinküste";
codes["DN"] = "Nigeria";
codes["DR"] = "Niger";
codes["DT"] = "Tunesien";
codes["DX"] = "Togo";
codes["EB"] = "Belgien";
codes["ED"] = "Deutschland";
codes["EE"] = "Estland";
codes["EF"] = "Finnland";
codes["EG"] = "Großbritannien";
codes["EH"] = "Niederlande";
codes["EI"] = "Irland";
codes["EK"] = "Dänemark";
codes["EL"] = "Luxemburg";
codes["EN"] = "Norwegen";
codes["EP"] = "Polen";
codes["ES"] = "Schweden";
codes["ET"] = "Deutschland";
codes["EV"] = "Lettland";
codes["EY"] = "Litauen";
codes["FA"] = "Südafrika";
codes["FB"] = "Botswana";
codes["FC"] = "Republik Kongo";
codes["FD"] = "Swasiland";
codes["FE"] = "Zentralafrikanische Republik";
codes["FG"] = "Äquatorialguinea";
codes["FH"] = "Ascension";
codes["FI"] = "Mauritius";
codes["FK"] = "Kamerun";
codes["FL"] = "Sambia";
codes["FM"] = "Komoren";
codes["FM"] = "Réunion und Madagaskar";
codes["FN"] = "Angola";
codes["FO"] = "Gabun";
codes["FP"] = "São Tomé und Príncipe";
codes["FQ"] = "Mosambik";
codes["FS"] = "Seychellen";
codes["FT"] = "Tschad";
codes["FV"] = "Simbabwe";
codes["FW"] = "Malawi";
codes["FX"] = "Lesotho";
codes["FY"] = "Namibia";
codes["FZ"] = "Demokratische Republik Kongo";
codes["GA"] = "Mali";
codes["GB"] = "Gambia";
codes["GC"] = "Kanarische Inseln";
codes["GE"] = "Melilla und Ceuta";
codes["GF"] = "Sierra Leone";
codes["GG"] = "Guinea-Bissau";
codes["GL"] = "Liberia";
codes["GM"] = "Marokko";
codes["GO"] = "Senegal";
codes["GQ"] = "Mauretanien";
codes["GS"] = "Westsahara";
codes["GU"] = "Guinea";
codes["GV"] = "Kap Verde";
codes["HA"] = "Äthiopien";
codes["HB"] = "Burundi";
codes["HC"] = "Somalia";
codes["HD"] = "Dschibuti";
codes["HE"] = "Ägypten";
codes["HH"] = "Eritrea";
codes["HK"] = "Kenia";
codes["HL"] = "Libyen";
codes["HR"] = "Ruanda";
codes["HS"] = "Sudan";
codes["HT"] = "Tansania";
codes["HU"] = "Uganda";
codes["K"] = "USA";
codes["LA"] = "Albanien";
codes["LB"] = "Bulgarien";
codes["LC"] = "Zypern";
codes["LD"] = "Kroatien";
codes["LE"] = "Spanien";
codes["LF"] = "Frankreich";
codes["LG"] = "Griechenland";
codes["LH"] = "Ungarn";
codes["LI"] = "Italien";
codes["LJ"] = "Slowenien";
codes["LK"] = "Tschechien";
codes["LL"] = "Israel";
codes["LM"] = "Malta";
codes["LN"] = "Monaco";
codes["LO"] = "Österreich";
codes["LP"] = "Portugal";
codes["LQ"] = "Bosnien und Herzegowina";
codes["LR"] = "Rumänien";
codes["LS"] = "Schweiz";
codes["LT"] = "Türkei";
codes["LU"] = "Moldau";
codes["LV"] = "Gazastreifen";
codes["LW"] = "Nordmazedonien";
codes["LX"] = "Gibraltar";
codes["LY"] = "Serbien und Montenegro";
codes["LZ"] = "Slowakei";
codes["MB"] = "Turks- und Caicosinseln";
codes["MD"] = "Dominikanische Republik";
codes["MG"] = "Guatemala";
codes["MH"] = "Honduras";
codes["MK"] = "Jamaika";
codes["MM"] = "Mexiko";
codes["MN"] = "Nicaragua";
codes["MP"] = "Panama";
codes["MR"] = "Costa Rica";
codes["MS"] = "El Salvador";
codes["MT"] = "Haiti";
codes["MU"] = "Kuba";
codes["MW"] = "Kaimaninseln";
codes["MY"] = "Bahamas";
codes["MZ"] = "Belize";
codes["NC"] = "Cookinseln";
codes["NF"] = "Fidschi und Tonga";
codes["NG"] = "Kiribati und Tuvalu";
codes["NI"] = "Niue";
codes["NL"] = "Wallis und Futuna";
codes["NS"] = "Samoa";
codes["NT"] = "Polynesien";
codes["NV"] = "Vanuatu";
codes["NW"] = "Neukaledonien";
codes["NZ"] = "Neuseeland";
codes["OA"] = "Afghanistan";
codes["OB"] = "Bahrain";
codes["OE"] = "Saudi-Arabien";
codes["OI"] = "Iran";
codes["OJ"] = "Jordanien";
codes["OK"] = "Kuwait";
codes["OL"] = "Libanon";
codes["OM"] = "Vereinigte Arabische Emirate";
codes["OO"] = "Oman";
codes["OP"] = "Pakistan";
codes["OR"] = "Irak";
codes["OS"] = "Syrien";
codes["OT"] = "Katar";
codes["OY"] = "Jemen";
codes["PA"] = "Alaska (USA)";
codes["PG"] = "Nördliche Marianen";
codes["PH"] = "Hawaii (USA)";
codes["PJ"] = "Johnstoninsel";
codes["PK"] = "Marshallinseln";
codes["PL"] = "Kiribati";
codes["PM"] = "Midwayinseln";
codes["PT"] = "Mikronesien";
codes["PW"] = "Wake";
codes["RC"] = "Republik China (Taiwan)";
codes["RJ"] = "Japan";
codes["RK"] = "Südkorea";
codes["RO"] = "Japan";
codes["RP"] = "Philippinen";
codes["SA"] = "Argentinien";
codes["SB"] = "Brasilien";
codes["SC"] = "Chile";
codes["SD"] = "Brasilien";
codes["SE"] = "Ecuador";
codes["SF"] = "Falklandinseln";
codes["SG"] = "Paraguay";
codes["SK"] = "Kolumbien";
codes["SL"] = "Bolivien";
codes["SM"] = "Suriname";
codes["SO"] = "Französisch-Guayana";
codes["SP"] = "Peru";
codes["SU"] = "Uruguay";
codes["SV"] = "Venezuela";
codes["SY"] = "Guyana";
codes["TA"] = "Antigua und Barbuda";
codes["TB"] = "Barbados";
codes["TD"] = "Dominica";
codes["TF"] = "Französische Antillen";
codes["TG"] = "Grenada";
codes["TI"] = "Virgin Islands";
codes["TJ"] = "Puerto Rico";
codes["TK"] = "St. Kitts und Nevis";
codes["TL"] = "St. Lucia";
codes["TN"] = "Aruba und Niederländische Antillen";
codes["TQ"] = "Anguilla";
codes["TR"] = "Montserrat";
codes["TT"] = "Trinidad und Tobago";
codes["TU"] = "Virgin Islands";
codes["TV"] = "St. Vincent und die Grenadinen";
codes["TX"] = "Bermuda";
codes["UA"] = "Kasachstan und Kirgisistan";
codes["UB"] = "Aserbaidschan";
codes["UD"] = "Armenien";
codes["UE"] = "Russische Föderation";
codes["UG"] = "Georgien";
codes["UH"] = "Russische Föderation";
codes["UI"] = "Russische Föderation";
codes["UK"] = "Ukraine";
codes["UL"] = "Russische Föderation";
codes["UM"] = "Weißrussland";
codes["UN"] = "Russische Föderation";
codes["UO"] = "Russische Föderation";
codes["UR"] = "Russische Föderation";
codes["US"] = "Russische Föderation";
codes["UT"] = "Tadschikistan, Turkmenistan und Usbekistan";
codes["UU"] = "Russische Föderation";
codes["UW"] = "Russische Föderation";
codes["VA"] = "Indien";
codes["VC"] = "Sri Lanka";
codes["VD"] = "Kambodscha";
codes["VE"] = "Indien";
codes["VG"] = "Bangladesch";
codes["VH"] = "Hongkong";
codes["VI"] = "Indien";
codes["VL"] = "Laos";
codes["VM"] = "Macau";
codes["VN"] = "Nepal";
codes["VO"] = "Indien";
codes["VQ"] = "Bhutan";
codes["VR"] = "Malediven";
codes["VT"] = "Thailand";
codes["VV"] = "Vietnam";
codes["VY"] = "Myanmar";
codes["WA"] = "Indonesien (Sulawesi, Irian Jaya)";
codes["WB"] = "Brunei, Sabah und Sarawak (Malaysia)";
codes["WI"] = "Indonesien (Java, Kalimantan)";
codes["WM"] = "Malaysia (Festland)";
codes["WP"] = "Osttimor";
codes["WR"] = "Indonesien (Bali, Lombok, Flores)";
codes["WS"] = "Singapur";
codes["Y"] = "Australien";
codes["Z"] = "Volksrepublik China";
codes["ZK"] = "Nordkorea";
codes["ZM"] = "Mongolei";

class CountryDelayView extends Component {
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

  findCountry(icao) {
    var search = icao.substr(0, 2);
    if (codes[search] != null) {
      return codes[search];
    } else {
      search = icao.substr(0, 1);
      if (codes[search] != null) {
        return codes[search];
      }
    }
    return icao + "(Unbekannt)";
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
              x.delay.value = parseFloat(x.delay.value);
              x.count.value = parseInt(x.count.value);
              x.region = this.findCountry(x.origin.value);
              return x;
            });
          })
          .then(res => this.setState({ semconData: res, loading: false }))
      )
    );
  }
  dbPediaQuery = queries => {
    var format = "&format=application/json";

    const urls = queries.map(
      query =>
        "http://dbpedia.org/sparql?query=" + encodeURIComponent(query) + format
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
      )
    )
      .then(results => {
        return [].concat(...results);
      })
      .then(res => {
        var obj = {};
        res.forEach(x => {
          var ret = {};
          var coord = x.countrylocation.value.split(" ");
          var lat = coord[0];
          var long = coord[1];
          var pos = [lat, long];
          ret.country_local = this.findCountry(x.icao.value);
          ret.country = x.country.value;
          ret.location = pos;

          if (ret.country_local != null && obj[ret.country_local] == null)
            obj[ret.country_local] = ret;
        });
        console.log(obj);
        return obj;
      })
      .then(res => this.setState({ dbPediaData: res }));
  };

  componentDidMount() {
    const dbPediaQueries = [
      `Prefix georss: <http://www.georss.org/georss/>
        select distinct ?icao, ?country, ?countrylocation
      where {
      ?country georss:point ?countrylocation.      
      ?country dbo:longName ?name.
      ?city dbo:country ?country.
      ?airport dbo:city ?city.
      ?airport dbo:icaoLocationIdentifier ?icao.
      FILTER regex(?icao, "^....$").
      FILTER regex(?icao, "^[A-R]") 
      }
      order by asc(?icao)`,

      `Prefix georss: <http://www.georss.org/georss/>
        select distinct ?icao, ?country, ?countrylocation
      where {
      ?country georss:point ?countrylocation.
      ?country dbo:longName ?name.
      ?city dbo:country ?country.
      ?airport dbo:city ?city.
      ?airport dbo:icaoLocationIdentifier ?icao.
      FILTER regex(?icao, "^....$").
      FILTER regex(?icao, "^[S-Z]") 
      }
      order by asc(?icao)`
    ];
    this.dbPediaQuery(dbPediaQueries);
    var fusekiQueries = [
      `Prefix cont: <http://www.jku.at/dke/semcon/departuredelays#>
    Prefix xsd: <http://www.w3.org/2001/XMLSchema#>
    Select distinct ?origin (AVG(minutes(?depDelay)) AS ?delay) (COUNT(?depDelay) AS ?count)
    where {
    ?flight cont:hasOrigin ?origin.
    ?flight cont:hasDepartureDelay ?depDelay.
    }
    GROUP BY ?origin`
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
    var daten = {};
    this.state.semconData.forEach(element => {
      var entry = {
        delay: element.delay.value,
        region: element.region,
        count: element.count.value
      };
      const reg_daten = daten[element.region];
      if (reg_daten != null) {
        const total_count = entry.count + reg_daten.count;
        const current = entry.delay * entry.count;
        const previous = reg_daten.delay * reg_daten.count;
        const total = (current + previous) / total_count;
        entry.delay = total;
        entry.count = total_count;
      }
      if (this.state.dbPediaData != null) {
        entry.location = this.state.dbPediaData[entry.region];
      }
      daten[element.region] = entry;
    });
    var daten_array = [];
    Object.keys(daten).forEach(k => {
      daten_array.push(daten[k]);
    });

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
                              {daten_array.map(x => (
                                <tr key={x.region}>
                                  <td>{x.region}</td>
                                  <td>
                                    {this.pad(x.delay - (x.delay % 1), 2)}{" "}
                                    Minuten{" "}
                                    {this.pad(
                                      Math.round((x.delay % 1) * 60),
                                      2
                                    )}{" "}
                                    Sekunden {"    "}({x.count}{" "}
                                    {x.count > 1 || x.count === 0
                                      ? "Flüge"
                                      : "Flug"}
                                    )
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      {this.state.dbPediaData == null ? (
                        <Spinner className="windowCenter"></Spinner>
                      ) : (
                        <Map className="map" center={position} zoom={6}>
                          <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          {daten_array.map(country =>
                            country.location != null ? (
                              <Marker
                                position={country.location.location}
                                key={country.region}
                              >
                                <Popup>
                                  {country.region}:{" "}
                                  {this.pad(
                                    country.delay - (country.delay % 1),
                                    2
                                  )}{" "}
                                  Minuten{" "}
                                  {this.pad(
                                    Math.round((country.delay % 1) * 60),
                                    2
                                  )}{" "}
                                  Sekunden {"    "}({country.count}{" "}
                                  {country.count > 1 || country.count === 0
                                    ? "Flüge"
                                    : "Flug"}
                                  )
                                </Popup>
                              </Marker>
                            ) : null
                          )}
                        </Map>
                      )}
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

export default CountryDelayView;
