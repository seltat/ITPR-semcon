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

class AirlineDelayView extends Component {
  state = {
    loading: true,
    activeTab: "1",
    semconData: [],
    dbPediaData: null
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
              var y = {};

              y.delay = parseFloat(x.delay.value);
              y.count = x.count.value;
              y.airline = x.airline.value;
              return y;
            });
          })
          .then(res => this.setState({ semconData: res, loading: false }))
      )
    );
  }

  componentDidMount() {
    var fusekiQueries = [
      `Prefix cont: <http://www.jku.at/dke/semcon/departuredelays#>
    Prefix xsd: <http://www.w3.org/2001/XMLSchema#>
    Select distinct ?airline (AVG(minutes(?depDelay)) AS ?delay) (COUNT(?depDelay) AS ?count)
    where {
    ?flight cont:hasDepartureDelay ?depDelay.
    ?flight cont:isPerformedByCompany ?airline.
    }
    GROUP BY ?airline`
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
    var daten_array = this.state.semconData;

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
                  <h3>Durchschnittliche Verspätung pro Airline</h3>
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
                              {this.pad(x.delay - (x.delay % 1), 2)} Minuten{" "}
                              {this.pad(Math.round((x.delay % 1) * 60), 2)}{" "}
                              Sekunden {"    "}({x.count}{" "}
                              {x.count > 1 || x.count === 0 ? "Flüge" : "Flug"})
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
        <Footer creator="Felix Winterleitner" />
      </React.Fragment>
    );
  }
}

export default AirlineDelayView;
