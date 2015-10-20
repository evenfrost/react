import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

/**
 * Components.
 */
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
    contact: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  onNameChange: function (event) {
    this.props.onChange(Object.assign({}, this.props.value, {name: event.target.value}));
  },
  
  onEmailChange: function (event) {
    this.props.onChange(Object.assign({}, this.props.value, {email: event.target.value}));
  },
  
  onDescriptionChange: function (event) {
    this.props.onChange(Object.assign({}, this.props.value, {description: event.target.value}));
  },

  onSubmit: function (event) {
    event.preventDefault();
    this.props.onSubmit();
  },

  render: function () {
    let errors = this.props.contact.errors || {};

    return React.createElement('form', {
        onSubmit: this.onSubmit
      },
      React.createElement('input', {
        type: 'text',
        name: 'name',
        placeholder: 'Name',
        value: this.props.contact.name,
        className: errors.name && 'error',
        onChange: this.onNameChange 
      }),
      React.createElement('input', {
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        value: this.props.contact.email,
        className: errors.email && 'error',
        onChange: this.onEmailChange
      }),
      React.createElement('textarea', {
        name: 'description',
        placeholder: 'Description',
        value: this.props.contact.description,
        onChange: this.onDescriptionChange
      }),
      React.createElement('button', { type: 'submit' }, 'Add Contact')
    );
  }
});

let ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onNewContactChange: React.PropTypes.func.isRequired,
    onNewContactSubmit: React.PropTypes.func.isRequired
  },

  render: function () {
    return React.createElement('div', {}, 
      React.createElement('h1', {}, 'Contacts'),
      React.createElement('ul', {},
        this.props.contacts
          .filter(contact => contact.email)
          .map(contact => React.createElement(ContactItem, contact))
      ),
      React.createElement(ContactForm, {
        contact: this.props.newContact,
        onChange: this.props.onNewContactChange,
        onSubmit: this.props.onNewContactSubmit
      })
    );
    
  }
});

const CONTACT = { name: '', email: '', description: '', errors: null };

let updateNewContact = newContact => setState({ newContact });

let submitNewContact = () => {
  let contact = Object.assign({}, state.newContact, { key: state.contacts.length + 1, errors: {} });
  
  if (!contact.name) {
    contact.errors.name = ["Please enter your new contact's name"];
  }
  if (!/.+@.+\..+/.test(contact.email)) {
    contact.errors.email = ["Please enter your new contact's email"];
  }

  setState(
    Object.keys(contact.errors).length === 0
    ? {
        newContact: Object.assign({}, CONTACT),
        contacts: state.contacts.slice(0).concat(contact)
      }
    : { newContact: contact }
  );
};

let state = {};

let setState = changes => {
  Object.assign(state, changes);
  
  ReactDOM.render(
    React.createElement(ContactView, Object.assign({}, state, {
      onNewContactChange: updateNewContact,
      onNewContactSubmit: submitNewContact
    })),
    document.getElementById('app')
  );
};

setState({
  contacts: [
    {key: 1, name: 'James K Nelson', email: 'james@jamesknelson.com', description: 'Front-end Unicorn'},
    {key: 2, name: 'Jim', email: 'jim@example.com'}
  ],
  newContact: Object.assign({}, CONTACT)
});
