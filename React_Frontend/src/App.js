import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import CountryDelayView from "./views/CountryDelayView";
import AirportDelayView from "./views/AirportDelayView";
import AirlineDelayView from "./views/AirlineDelayView";
import AirlineTopView from "./views/AirlineTopView";
import CountryDelayView_alternative from "./views/CountryDelayView_alternative";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/delay/airport">
          <AirportDelayView />
        </Route>
        <Route exact path="/delay/country/">
          <CountryDelayView />
        </Route>
        <Route exact path="/delay/country-alternative/">
          <CountryDelayView_alternative />
        </Route>
        <Route exact path="/delay/airline/">
          <AirlineDelayView />
        </Route>
        <Route exact path="/top/airline/">
          <AirlineTopView />
        </Route>
      </div>
    </Router>
  );
}

export default App;
