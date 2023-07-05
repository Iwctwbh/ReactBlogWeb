import React, {Component, ReactElement} from "react";

export type CounterType = {
  value: number;
  onClick: () => void
};

class Counter extends Component<CounterType> {
  shouldComponentUpdate(nextProps: { value: number; }): boolean {
    // Rendering the component only if
    // passed props value is changed

    if (nextProps.value !== this.props.value) {
      return true;
    } else {
      return false;
    }
  }

  render(): ReactElement {
    console.log("Counter 1 is calling");
    return (
      <div>
        <h2>Counter 1:</h2>
        <h3>{this.props.value}</h3>
        <button onClick={this.props.onClick}>Add</button>
      </div>
    );
  }
}

export default Counter;