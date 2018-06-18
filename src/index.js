import React from 'react';
import ReactDOM from 'react-dom';
import ClockWatch from './ClockWatch';
import LightMachine from './LightMachine';

import './styles.css';
import TimerLight from './TimerLight/TimerLight';

function App() {
  return (
    <div className="App">
      {/* <ClockWatch />
      <LightMachine /> */}
      <TimerLight />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
