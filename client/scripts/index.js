import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

let ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string
  },

  render: function () {
    return React.createElement('li', { className: 'contact' },
      React.createElement('h2', { className: 'name' }, this.props.name),
      React.createElement('a', { href: 'mailto:' + this.props.email, className: 'link' }, this.props.email),
      React.createElement('p', {}, this.props.description)
    );
  }
});

let ContactForm = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired
  },

  render: function () {
    return React.createElement('form', {}, 
      React.createElement('input', {
        type: 'text',
        name: 'name',
        placeholder: 'Name',
        value: this.props.contact.name
      }),
      React.createElement('input', {
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        value: this.props.contact.email
      }),
      React.createElement('textarea', {
        name: 'description',
        placeholder: 'Description',
        value: this.props.contact.description
      }),
      React.createElement('button', { type: 'submit' }, 'Add Contact')
    );
  }
});

let ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired
  },

  render: function () {
    return React.createElement('main', {}, 
      React.createElement('h1', {}, 'Contacts'),
      React.createElement('ul', {},
        contacts.map(contact => React.createElement(ContactItem, contact))
      ),
      React.createElement(ContactForm, { contact: this.props.newContact })
    );
    
  }
})

let contacts = [{ 
  key: 1,
  name: 'John Doe',
  email: 'john@doe.com',
  description: 'Front-end Unicorn'
}, {
  key: 2,
  name: 'John Smith',
  email: 'john@smith.com'
}];

let newContact = {
  name: '',
  email: '',
  description: ''
};
 
ReactDOM.render(
  React.createElement(ContactView, {
    contacts: contacts,
    newContact: newContact
  }), document.querySelector('#app')
);
