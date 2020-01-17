import React, { Component } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ZAxis
} from "recharts";
import LoadingText from "./LoadingText";

class AiportCounter extends Component {
  state = { data: null };

  semconQuery(semcon_endpoint, queries) {
    const urls = queries.map(
      query => semcon_endpoint + "?query=" + encodeURIComponent(query)
    );
    console.log(urls);
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
          .then(res => this.setState({ data: res }))
      )
    );
  }

  componentDidMount() {
    var query = `Prefix cont: <http://www.jku.at/dke/semcon/departuredelays#>
    Select distinct ?origin
    where {
    ?flight cont:hasOrigin ?origin.
    }`;
    var queries = [query];
    this.semconQuery("http://localhost:8080/sparql", queries);
  }

  render() {
    return (
      <React.Fragment>
        <table>
          {this.state.data != null ? (
            this.state.data
              .sort((a, b) => a.origin.value < b.origin.value)
              .map(x => {
                return (
                  <tr>
                    <td>{x.origin.value}</td>
                  </tr>
                );
              })
          ) : (
            <LoadingText text="Loading" filler="." length="5" interval="500" />
          )}
        </table>
      </React.Fragment>
    );
  }
}

export default AiportCounter;
