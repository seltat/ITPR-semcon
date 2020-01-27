import React, { Component } from "react";
// import Checkbox from './Checkbox';
import {
  // Button,
  // Form,
  //   Input,
  //   Label,
  Container
} from "reactstrap";

class Filter extends Component{


  constructor() {
    super();
    this.state = {
      filter1Selected: '',
      filter2Selected: '',
      filter3Selected: '',
      filter4Selected: '',
      filter1Year1: null,
      filter1Year2: null,
      filter2MinDelay: null,
      filter3Origin: null,
      filter4Year1: null,
      filter4Year2: null,
      filter: ''
    };
    this.handleFilter1SelectChange = this.handleFilter1SelectChange.bind(this);
    this.handleFilter2SelectChange = this.handleFilter2SelectChange.bind(this);
    this.handleFilter3SelectChange = this.handleFilter3SelectChange.bind(this);
    this.handleFilter4SelectChange = this.handleFilter4SelectChange.bind(this);
    this.handleFilter1Year1Change = this.handleFilter1Year1Change.bind(this);
    this.handleFilter1Year2Change = this.handleFilter1Year2Change.bind(this);
    this.handleFilter2MinDelayChange = this.handleFilter2MinDelayChange.bind(this);
    this.handleFilter3OriginChange = this.handleFilter3OriginChange.bind(this);
    this.handleFilter4Year1Change = this.handleFilter4Year1Change.bind(this);
    this.handleFilter4Year2Change = this.handleFilter4Year2Change.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    console.log(this.state);
  }

  // Define SPARQL Filters
  // Filter 1: Von-bis Jahr
  filerYearRange = 'FILTER(?year >= {year1} && ?year <= {year2})';

  // Filter 2: Verspätungen > X
  filterMinDelayMinutes = 'FILTER(?delayMinutes > {min})';

  // Filter 3: Nach Flughafen by ICAO Code
  filterOrigin = '?flight f:hasOrigin ?origin .\n' +
      'FILTER regex(str(?origin), "{origin}")';

  // # Filter 4: Vergleich Jahr X zu Jahr Y
  filterYearCompare = 'FILTER(?year = "{year1}"^^xsd:integer || ?year = "{year2}"^^xsd:integer)';

  updateFilter(e){
    console.log(this.state);
    let filter = "";
    // Filter 1:
    if(this.state.filter1Selected){
      let filter1 = this.filerYearRange;
      filter1 = filter1.replace("{year1}",this.state.filter1Year1);
      filter1 = filter1.replace("{year2}",this.state.filter1Year2);
      filter = filter + "\n" + filter1;
      // console.log(filter);
    }
    // Filter 2:
    if(this.state.filter2Selected){
      let filter2 = this.filterMinDelayMinutes;
      filter2 = filter2.replace("{min}",this.state.filter2MinDelay);
      filter = filter + "\n" + filter2;
      // console.log(filter);
    }
    // Filter 3:
    if(this.state.filter3Selected){
      let filter3 = this.filterOrigin;
      filter3 = filter3.replace("{origin}", this.state.filter3Origin.toUpperCase());
      filter = filter + "\n" + filter3;
      // console.log(filter);
    }
    // Filter 4:
    if(this.state.filter4Selected){
      let filter4 = this.filterYearCompare;
      filter4 = filter4.replace("{year1}",this.state.filter4Year1);
      filter4 = filter4.replace("{year2}",this.state.filter4Year2);
      filter = filter + "\n" + filter4;
      // console.log(filter);
      this.setState({filter: filter});
    }

    function getFilter(){return this.state.filter}


    e.preventDefault();
    // if()
    this.forceUpdate()
    this.props.parentCallback(filter);
    return false;
  }

  handleFilter1SelectChange(e){
    if(e.target.checked )
      this.setState({filter4Selected: ''});
    this.setState({filter1Selected: e.target.checked?'checked':''});
  }
  handleFilter2SelectChange(e){
    this.setState({filter2Selected: e.target.checked?'checked':''});
  }
  handleFilter3SelectChange(e){
    this.setState({filter3Selected: e.target.checked?'checked':''});
  }
  handleFilter4SelectChange(e){
    if(e.target.checked)
      this.setState({filter1Selected: ''});
    this.setState({filter4Selected: e.target.checked?'checked':''});
  }
  handleFilter1Year1Change(e){
    this.setState({filter1Year1: e.target.value});
  }
  handleFilter1Year2Change(e){
    this.setState({filter1Year2: e.target.value});
  }
  handleFilter2MinDelayChange(e){
    this.setState({filter2MinDelay: e.target.value});
  }
  handleFilter3OriginChange(e){
    this.setState({filter3Origin: e.target.value});
  }
  handleFilter4Year1Change(e){
    this.setState({filter4Year1: e.target.value});
  }
  handleFilter4Year2Change(e){
    this.setState({filter4Year2: e.target.value});
  }


  render() {
    return (
        <Container style={{border: "0px solid red"}}>
          <form name="filter_form" onSubmit={this.updateFilter} style={{border: "0px solid blue"}}>
            <input id="filter_1_year_range_selected" type="checkbox"
                   onChange={this.handleFilter1SelectChange} checked={!!this.state.filter1Selected} />
            <label htmlFor="filter_1_year_range_selected">Filter by Years _ From_To | </label>
            <label htmlFor="filter_1_year_1">Year 1</label>
            <input name="filter_1_year_1" id="filter_1_year_1" type="number" placeholder="year 1"
                   onChange={this.handleFilter1Year1Change} value={this.state.filter1Year1} />
            <label htmlFor="filter_1_year_2">Year 2</label>
            <input name="filter_1_year_2" id="filter_1_year_2" type="number" placeholder="year 2"
                   onChange={this.handleFilter1Year2Change} value={this.state.filter1Year2} />
            <hr/>
            <input id="filter_2_min_delay_selected" type="checkbox"
                   onChange={this.handleFilter2SelectChange} checked={!!this.state.filter2Selected} />
            <label htmlFor="filter_2_min_delay_selected">Filter by minimal delay | </label>
            <label htmlFor="filter_2_min_delay">Delay at least:
              <input name="filter_2_min_delay" id="filter_2_min_delay" type="number" placeholder="minutes"
                     onChange={this.handleFilter2MinDelayChange} value={this.state.filter2MinDelay} />
              minutes</label>
            <hr/>
            <input id="filter_3_origin_selected" type="checkbox"
                    onChange={this.handleFilter3SelectChange} checked={!!this.state.filter3Selected} />
            <label htmlFor="filter_3_origin_selected">Filter by origin airport | </label>
            <label htmlFor="filter_3_origin">Origin airport: </label>
            <input name="filter_3_origin" id="filter_3_origin" type="text" size="4" maxLength="4"
                   placeholder="ICAO code"
                   onChange={this.handleFilter3OriginChange} value={this.state.filter3Origin} />
            <hr/>
            <input id="filter_4_year_compare_selected" type="checkbox"
                   onChange={this.handleFilter4SelectChange} checked={!!this.state.filter4Selected} />
            <label htmlFor="filter_4_year_compare_selected">Filter compare Year X to Year Y | </label>
            <label htmlFor="filter_4_year_1">Year 1</label>
            <input name="filter_4_year_1" id="filter_4_year_1" type="number" placeholder="year X"
                   onChange={this.handleFilter4Year1Change} value={this.state.filter4Year1} />
            <label htmlFor="filter_4_year_2">Year 2</label>
            <input name="filter_4_year_2" id="filter_4_year_2" type="number" placeholder="year Y"
                   onChange={this.handleFilter4Year2Change} value={this.state.filter4Year2} />
            <hr/>

            <button type="button" onClick={this.updateFilter} class="btn btn-primary" value="Update table">Update me</button>
          </form>
        </Container>
    );
  }
}

export default Filter;