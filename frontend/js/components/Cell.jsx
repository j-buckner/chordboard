import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false
    }

    autoBind(this);
  }

  hitCell(e) {
    e.target.style.backgroundColor = this.state.enabled ? '#363c4f' : '#41e8f4';
    this.setState({enabled: !this.state.enabled})
  }

  render() {
    return (
      <div className="cell" style={this.props.style} onClick={this.hitCell}/>
    )
  }
}

export default Cell;