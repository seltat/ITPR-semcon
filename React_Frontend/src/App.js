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
import ComparisonsAvgDelayYearWeekdayView from "./views/ComparisonsAvgDelayYearWeekdayView";
import ComparisonsAvgDelayHourMonthView from "./views/ComparisonsAvgDelayHourMonthView";
import ComparisonsSumDelayMonthView from "./views/ComparisonsSumDelayMonthView";
import ComparisonsAvgDelayYearView from "./views/ComparisonsAvgDelayYearView";

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
          <ComparisonsAvgDelayYearWeekdayView />
        </Route>
        <Route exact path="/comparisons/avgdelayhourmonth">
          <ComparisonsAvgDelayHourMonthView />
        </Route>
        <Route exact path="/comparisons/sumdelaymonth">
          <ComparisonsSumDelayMonthView />
        </Route>
        <Route exact path="/comparisons/avgdelayyear">
          <ComparisonsAvgDelayYearView />
        </Route>
      </div>
    </Router>
  );
}

export default App;
