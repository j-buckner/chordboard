import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Cell from './Cell.jsx';

const Tone = require('tone');

const synth = new Tone.PolySynth(12, Tone.Synth).toMaster();
synth.set({
  oscillator: {
    type: 'sine',
  },
  envelope: {
    attack: 0.5,
    decay: 1,
    sustain: 0.5,
    release: 0.4,
  },
});

Tone.Transport.bpm.value = 120;
Tone.Transport.loopEnd = '4m';

const noteLookup = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'];
const noteLookupDisplay = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C'];

const progressions = [
  {
    display: ['I', 'IV', 'V', 'I'],
    notes: [
      ['C4', 'E4', 'G4'], ['F4', 'A4', 'C4'], ['G4', 'B4', 'D4'], ['C4', 'E4', 'G4'],
    ],
  },
  {
    display: ['I', 'V', 'IV', 'I'],
    notes: [
      ['C4', 'E4', 'G4'], ['G4', 'B4', 'D4'], ['F4', 'A4', 'C4'], ['C4', 'E4', 'G4'],
    ],
  },
  {
    display: ['I', 'V', 'vi', 'IV'],
    notes: [
      ['C4', 'E4', 'G4'], ['G4', 'B4', 'D4'], ['A4', 'C4', 'E4'], ['F4', 'A4', 'C4'],
    ],
  },
  {
    display: ['iii', 'VI', 'ii', 'V'],
    notes: [
      ['E4', 'G4', 'B4'], ['A4', 'C4', 'E4'], ['D4', 'F4', 'A4'], ['G4', 'B4', 'D4'],
    ],
  },
  {
    display: ['I', 'vi', 'IV', 'V'],
    notes: [
      ['C4', 'E4', 'G4'], ['A4', 'C4', 'E4'], ['F4', 'A4', 'C4'], ['G4', 'B4', 'D4'],
    ],
  },
  {
    display: ['I', 'vi', 'ii', 'V'],
    notes: [
      ['C4', 'E4', 'G4'], ['A4', 'C4', 'E4'], ['D4', 'F4', 'A4'], ['G4', 'B4', 'D4'],
    ],
  },
  {
    display: ['I', 'IV', 'ii', 'V'],
    notes: [
      ['C4', 'E4', 'G4'], ['F4', 'A4', 'C4'], ['D4', 'F4', 'A4'], ['G4', 'B4', 'D4'],
    ],
  },
];

const colors = {
  disabled: '#363c4f',
  enabled: '#891b1b',
  playing: 'yellow',
};

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      measures: 4,
      notes: [[], [], [], []],
    };

    autoBind(this);
  }

  setNote(note, measure) {
    const { notes } = this.state;

    const notesUpdated = [...notes];
    if (notes[measure].includes(note)) {
      notesUpdated[measure] = notesUpdated[measure].filter(currNote => currNote !== note);
      this.setState({
        notes: notesUpdated,
      });
      return;
    }

    notesUpdated[measure].push(note);
    this.setState({
      notes: notesUpdated,
    });

    // const synthPart = new Tone.Sequence(
    //   function(time, note) {
    //     synth.triggerAttackRelease(note, "10hz", time);
    //   },
    //   notesUpdated,
    //   "4n"
    // );
    // synthPart.start();
    // Tone.Transport.start();
  }

  render() {
    const { measures } = this.state;
    const cells = [...Array(14 * (measures + 1))].map((v, i) => {
      let text = '';
      let note = '';
      let row = 0;
      let enabled = false;
      let styles = { border: 'solid 1px #2A324B' };
      const measure = (i % (measures + 1)) - 1;

      // Hacky logic to set styles and props
      if (i % (measures + 1) === 0 && i > 0) {
        text = noteLookupDisplay[12 - ((i / (measures + 1)) - 1)];
        enabled = false;
      } else if (i === 0) {
        enabled = false;
      } else if (i < (measures + 1)) {
        enabled = false;
        styles = {
          border: 'solid 1px #2A324B',
          borderBottom: 'solid 0.5px grey',
          borderWidth: 'thin',
        };
      } else {
        enabled = true;
        row = 12 - Math.floor((i / (measures + 1)) - 1);
        note = noteLookup[row];
      }

      return (
        <Cell
          style={styles}
          key={i}
          text={text}
          enabled={enabled}
          note={note}
          measure={measure}
          setNote={this.setNote}
        />
      );
    });

    return (
      <div className="board">
        {cells}
      </div>
    );
  }
}

export default Board;
