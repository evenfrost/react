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
    contact: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  render: function () {
    let contact = this.props.contact;
    let onChange = this.props.onChange;

    return React.createElement('form', {
        onSubmit: event => {
          let contact = this.props.contact;

          event.preventDefault();

          if (contact.name && contact.email) {
            contacts.push(Object.assign(contact, { key: currentKey++ }));
            return render(contact, contacts);
          }
        }
      },
      React.createElement('input', {
        type: 'text',
        name: 'name',
        placeholder: 'Name',
        value: this.props.contact.name,
        onChange: event => onChange(Object.assign({}, contact, { name: event.target.value }))
      }),
      React.createElement('input', {
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        value: this.props.contact.email,
        onChange: event => onChange(Object.assign({}, contact, { email: event.target.value }))
      }),
      React.createElement('textarea', {
        name: 'description',
        placeholder: 'Description',
        value: this.props.contact.description,
        onChange: event => onChange(Object.assign({}, contact, { description: event.target.value }))
      }),
      React.createElement('button', { type: 'submit' }, 'Add Contact')
    );
  }
});

let ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onNewContactChange: React.PropTypes.func.isRequired
  },

  render: function () {
    return React.createElement('div', {}, 
      React.createElement('h1', {}, 'Contacts'),
      React.createElement('ul', {},
        this.props.contacts.map(contact => React.createElement(ContactItem, contact))
      ),
      React.createElement(ContactForm, {
        contact: this.props.newContact,
        onChange: this.props.onNewContactChange
      })
    );
    
  }
});

let currentKey = 0;

let contacts = [{ 
  key: currentKey++,
  name: 'John Doe',
  email: 'john@doe.com',
  description: 'Front-end Unicorn'
}, {
  key: currentKey++,
  name: 'John Smith',
  email: 'john@smith.com'
}];

let newContact = {
  name: 'Aleksey',
  email: '',
  description: ''
};
 

let render = (contact, contacts) => {
  ReactDOM.render(
    React.createElement(ContactView, {
      contacts: contacts,
      newContact: contact,
      onNewContactChange: contact => render(contact, contacts)
    }), document.querySelector('#app')
  );
};

render(newContact, contacts);
