import React, { Component } from "react";

class LoadingText extends Component {
  state = { counterTime: 0 };

  componentDidMount() {
    setInterval(() => {
      var time = this.state.counterTime;
      if (time < this.props.length) {
        this.setState({ counterTime: time + 1 });
      } else this.setState({ counterTime: 0 });
    }, this.props.interval);
  }

  timeToDots() {
    var ret = "";
    for (var i = 0; i < this.state.counterTime; i++) {
      ret = ret + this.props.filler;
    }
    return ret;
  }
  render() {
    return (
      <React.Fragment>
        {this.props.text}
        {this.timeToDots()}
      </React.Fragment>
    );
  }
}

export default LoadingText;
