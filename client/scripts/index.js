import React from 'react';
import ReactDOM from 'react-dom';

let mountNode = document.getElementById('app');

let Countdown = React.createClass({

  componentDidMount: function () {
    this.interval = setInterval(this.props.tick, 1000);
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },

  render: function () {
    return (
      <div>{ this.props.secondsToGo }</div>
    );
  }

});

let CountdownForm = React.createClass({
  updateCounter: function (event) {
    event.preventDefault();

    let form = event.target;
    let amount = form.amount.value;

    this.props.updateCounter(amount);
  },

  render: function () {
    return (
      <form onSubmit={ this.updateCounter }>
        <input type="number" name="amount" />
        <button type="submit">Update</button>
      </form>
    );
  }

});

let CountdownView = React.createClass({
  getInitialState: function () {
    return { secondsToGo: 500 };
  },

  updateCounter: function (amount) {
    amount = +amount || 0;
    this.setState({ secondsToGo: amount });
  },

  tick: function () {
    this.setState({ secondsToGo: this.state.secondsToGo - 1 });
  },

  render: function () {
    return (
      <div>
        <Countdown secondsToGo={ this.state.secondsToGo } tick={ this.tick } />
        <CountdownForm updateCounter={ this.updateCounter } />
      </div>
    );
  }
});

ReactDOM.render(<CountdownView />, mountNode);
