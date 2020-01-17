import React, { Component } from "react";
import { Button } from "reactstrap";

class Footer extends Component {
  state = {};

  render() {
    return (
      <div className="footer">
        IT-Projekt Wirtschaftsinformatik || Frequentis || JKU ||{" "}
        {this.props.creator}
      </div>
    );
  }
}

export default Footer;
