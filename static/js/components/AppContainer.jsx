import React, { Component } from "react";
import ReactDOM from "react-dom";
class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <div>
        <h1>Testt</h1>
      </div>
    );
  }
}
export default AppContainer;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<AppContainer />, wrapper) : false;