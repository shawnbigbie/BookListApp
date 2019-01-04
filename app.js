// Contact Class: Represents a Contact
class Contact {
  constructor(name, address, num) {
    this.name = name;
    this.address = address;
    this.num = num;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayContacts() {
    const contacts = Store.getContacts();

    contacts.forEach((contact) => UI.addContactToList(contact));
  }

  static addContactToList(contact) {
    const list = document.querySelector('#contact-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.address}</td>
      <td>${contact.num}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteContact(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#contact-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#num').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getContacts() {
    let contacts;
    if(localStorage.getItem('contacts') === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem('contacts'));
    }

    return contacts;
  }

  static addContact(contact) {
    const contacts = Store.getContacts();
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  static removeContact(num) {
    const contacts = Store.getContacts();

    contacts.forEach((contact, index) => {
      if(contact.num === num) {
        contacts.splice(index, 1);
      }
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}

// Event: Display Contacts
document.addEventListener('DOMContentLoaded', UI.displayContacts);

// Event: Add a Contact
document.querySelector('#contact-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const name = document.querySelector('#name').value;
  const address = document.querySelector('#address').value;
  const num = document.querySelector('#num').value;

  // Validate
  if(name === '' || address === '' || num === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const contact = new Contact(name, address, num);

    // Add Contact to UI
    UI.addContactToList(contact);

    // Add contact to store
    Store.addContact(contact);

    // Show success message
    UI.showAlert('Contact Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Contact
document.querySelector('#contact-list').addEventListener('click', (e) => {
  // Remove contact from UI
  UI.deleteContact(e.target);

  // Remove contact from store
  Store.removeContact(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Contact Removed', 'success');
});