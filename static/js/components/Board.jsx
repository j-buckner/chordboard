import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
  }

  render() {
    console.log(noteLookup);
    return (
      <h1>Test2</h1>
    );
  }
}

export default Board;