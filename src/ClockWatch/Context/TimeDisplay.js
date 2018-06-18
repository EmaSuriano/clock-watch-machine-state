import React from 'react';
import MachineManager from './MachineManager';

const TimeDisplay = () => (
  <MachineManager.Consumer>
    {context => {
      console.log(context);
      return <p>{context.toString()}</p>;
    }}
  </MachineManager.Consumer>
);

export default TimeDisplay;
