import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext();

class MachineProvider extends React.Component {
  static propTypes = {
    machine: PropTypes.object.required,
    children: PropTypes.node.required,
    actionsMap: PropTypes.func,
  };

  static defaultProps = {
    actionsMap: {},
  };

  state = {
    currentState: this.props.machine.initial,
    actionsMap: this.props.actionsMap,
  };

  transition = event => {
    const { currentState } = this.state;
    const { machine, actionsMap } = this.props;

    const nextState = machine.transition(currentState, event.type);

    nextState.actions.forEach(actionKey => {
      const action = actionsMap[actionKey];
      if (!action) return console.warn(`Action not defined: ${actionKey}`);
      return action(event, this.transition);
    });

    this.setState({
      currentState: nextState.value,
    });
  };

  addAction = (key, action) => {};

  isTransitionAvailabe = transition => {
    const { currentState } = this.state;
    const { machine } = this.props;

    return machine.states[currentState].on[transition];
  };

  render() {
    const { currentState } = this.state;
    const { transition, isTransitionAvailabe } = this;

    return (
      <Provider
        value={{
          currentState,
          transition,
          isTransitionAvailabe,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const MachineConsumer = () => {};

export default {
  Provider: MachineProvider,
  Consumer,
};
