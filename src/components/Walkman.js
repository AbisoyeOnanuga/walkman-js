import React from 'react';
import './Walkman.css';

const Walkman = ({ screenContent, onButtonPress }) => (
  <div className="walkman">
    <div className="bezel">
      <div className="screen">{screenContent}</div>
      <div className="sony-logo">SONY</div>
    </div>
    <div className="buttons">
      <button className="button-back" onClick={() => onButtonPress('back')}>BACK</button>
      <button className="button-option" onClick={() => onButtonPress('option')}>OPTION</button>
      <button className="button-home" onClick={() => onButtonPress('home')}>HOME</button>
      <button className="button-power" onClick={() => onButtonPress('power')}>POWER</button>
      <div className="navigation">
        <button className="button-center" onClick={() => onButtonPress('enter')}>⏯️</button>
        <button className="button-up" onClick={() => onButtonPress('up')}>⬆️</button>
        <button className="button-down" onClick={() => onButtonPress('down')}>⬇️</button>
        <button className="button-left" onClick={() => onButtonPress('left')}>⬅️</button>
        <button className="button-right" onClick={() => onButtonPress('right')}>➡️</button>
      </div>
    </div>
    <div className="walkman-logo">walkman</div>
  </div>
);

export default Walkman;
    