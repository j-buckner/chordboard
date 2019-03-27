import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class Cell extends Component {
  constructor(props) {
    super(props);

    const { active } = this.props;
    this.state = {
      active,
    };

    autoBind(this);
  }

  hitCell(e) {
    const {
      enabled,
      note,
      measure,
      setNote,
    } = this.props;

    const { active } = this.state;
    if (!enabled) {
      return;
    }

    e.target.style.backgroundColor = active ? '#363c4f' : '#41e8f4';

    setNote(note, measure);
    this.setState({ active: !active });
  }

  render() {
    const { style, text, id, enabled } = this.props;

    const className = enabled ? 'cell active' : 'cell inactive';

    return (
      <div id={id} role="button" className={className} style={style} onClick={this.hitCell} onKeyDown={this.hitCell}>
        <div className="cell-text">
          {text}
        </div>
      </div>
    );
  }
}

Cell.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
  enabled: PropTypes.bool,
  measure: PropTypes.number,
  active: PropTypes.bool,
  note: PropTypes.string,
  setNote: PropTypes.func,
  id: PropTypes.string,
};

Cell.defaultProps = {
  style: {},
  text: '',
  enabled: false,
  measure: 0,
  note: '',
  setNote: null,
  active: false,
  id: '',
};

export default Cell;
