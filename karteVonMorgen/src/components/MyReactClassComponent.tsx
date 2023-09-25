// MyReactClassComponent.js
import React, { Component } from 'react';

//Rules of hooks

class MyReactClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello from React Class Component',
    };
  }

  handleClick = () => {
    // Überprüfen, ob der Text bereits "Button clicked!" ist
    if (this.state.message === 'Button clicked!') {
      this.setState({ message: 'Hello from React Class Component' });
    } else {
      this.setState({ message: 'Button clicked!' });
    }
  };

  render() {
    const message = this.props.message;
    return (
      <div>
        <p>{message}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

export default MyReactClassComponent;
