import React, { Component } from 'react';
import autoBind from 'react-autobind';

class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnState: 'start'
    };

    autoBind(this);
  }

  start(e) {
    console.log('here');
    e.target.style.background = "url('../img/stop.svg') no-repeat;";
    this.setState({btnState: this.state.btnState == 'start' ? 'stop' : 'start'});
  }

  render() {

    let className = `start-btn ${this.state.btnState}`
    return (
      <div>
        <button className={className} onClick={this.start}></button>        
      </div>
    )
  }
}

export default MenuBar

