import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

let ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render: function () {
    return React.createElement('li', { className: 'contact' },
      React.createElement('h2', { className: 'name' }, this.props.name),
      React.createElement('a', { href: 'mailto:' + this.props.email, className: 'link' }, this.props.email));
  }
});

let contacts = [{ 
  name: 'John Doe',
  email: 'john@doe.com'
}, {
  name: 'John Smith',
  email: 'john@smith.com'
}];

let rootElement =
  React.createElement('div', {}, 
    React.createElement('h1', {}, 'Contacts'),
    React.createElement('ul', {},
      contacts.map((contact, index) => React.createElement(ContactItem, _.assign(contact, { key: index })))
    )
  );

ReactDOM.render(rootElement, document.querySelector('#app'));
