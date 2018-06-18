import React from 'react';
import PropTypes from 'prop-types';

export default class MachineManager extends React.Component {
  static propTypes = {
    machine: PropTypes.object.required,
    children: PropTypes.node.required,
    actionsMap: PropTypes.func,
  };

  static defaultProps = {
    actionsMap: {},
  };

  state = {
    currentState: this.props.machine.initialState.value,
  };

  transition = event => {
    const { currentState } = this.state;
    const { machine, actionsMap } = this.props;

    const nextState = machine.transition(currentState, event.type);
    debugger;
    nextState.actions.forEach(actionKey => {
      const action = actionsMap[actionKey];
      if (!action) return console.warn(`Action not defined: ${actionKey}`);
      return action(event, this.transition);
    });

    this.setState({
      currentState: nextState.value,
    });
  };

  isTransitionAvailabe = transition => {
    const { currentState } = this.state;
    const { machine } = this.props;

    return machine.states[currentState].on[transition];
  };

  render() {
    const { currentState } = this.state;
    const { transition, isTransitionAvailabe } = this;

    return this.props.children({
      currentState,
      isTransitionAvailabe,
      transition,
    });
  }
}
