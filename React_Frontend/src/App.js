import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import CountryDelayView from "./views/CountryDelayView";
import AirportDelayView from "./views/AirportDelayView";
import AirlineDelayView from "./views/AirlineDelayView";
import AirlineTopView from "./views/AirlineTopView";
import ComparisonsAvgDelayMonthView from "./views/ComparisonsAvgDelayMonthView";
import ComparisonsAvgDelayMonthWeekdayView from './views/ComparisonsAvgDelayMonthWeekdayView'

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
        <Route exact path="/delay/airline/">
          <AirlineDelayView />
        </Route>
        <Route exact path="/top/airline/">
          <AirlineTopView />
        </Route>
        <Route exact path="/comparisons/avgdelaymonth">
          <ComparisonsAvgDelayMonthView />
        </Route>
        <Route exact path="/comparisons/avgdelaymonthweekday">
          <ComparisonsAvgDelayMonthWeekdayView />
        </Route>
        <Route exact path="/comparisons/avgdelayyearweekday">
          <ComparisonsAvgDelayMonthView />
        </Route>
        <Route exact path="/comparisons/avgdelayhourmonth">
          <ComparisonsAvgDelayMonthView />
        </Route>
        <Route exact path="/comparisons/sumdelaymonth">
          <ComparisonsAvgDelayMonthView />
        </Route>
        <Route exact path="/comparisons/avgdelayyear">
          <ComparisonsAvgDelayMonthView />
        </Route>
      </div>
    </Router>
  );
}

export default App;
