import React from 'react';
import ReactDOM from 'react-dom';

let mountNode = document.getElementById('app');

let TodoList = React.createClass({
  render: function () {
    let createItem = (itemText, index) => {
      return <li key={ index + itemText }>{ itemText }</li>;
    };
    return <ul>{ this.props.items.map(createItem) }</ul>;
  }
});

let TodoApp = React.createClass({
  getInitialState: function () {
    return { items: [], text: '' };
  },
  onChange: function (e) {
    this.setState({ text: e.target.value }); },
  handleSubmit: function (e) {
    e.preventDefault();
    let nextItems = this.state.items.concat([this.state.text]);
    let nextText = '';
    this.setState({ items: nextItems, text: nextText });
  },
  render: function () {
    return (
      <div>
        <TodoList items={ this.state.items } />
        <form onSubmit={ this.handleSubmit }>
          <input onChange={ this.onChange } value={ this.state.text } />
          <button>{ 'Add #' + (this.state.items.length + 1) }</button>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<TodoApp />, mountNode);
