// Contact Class: Represents a Contact
class Contact {
    constructor(CName, CAddress, CNum) {
      this.CName = CName;
      this.CAddress = CAddress;
      this.CNum = CNum;
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
        <td>${contact.CName}</td>
        <td>${contact.CAddress}</td>
        <td>${contact.CNum}</td>
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
      document.querySelector('#CName').value = '';
      document.querySelector('#CAddress').value = '';
      document.querySelector('#CNum').value = '';
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
      const contacts = Store.getcontacts();
      contacts.push(contact);
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  
    static removeContact(CNum) {
      const contacts = Store.getContacts();
  
      contacts.forEach((contact, index) => {
        if(contact.CNum === CNum) {
          contacts.splice(index, 1);
        }
      });
  
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  
  // Event: Display Contacts
  document.addEventListener('DOMContentLoaded', UI.displayContacts);
  
  // Event: Add a New Contact
  document.querySelector('#contact-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const CName = document.querySelector('#CName').value;
    const CAddress = document.querySelector('#CAddress').value;
    const CNum = document.querySelector('#CNum').value;
  
    // Validate
    if(CName === '' || CAddress === '' || CNum === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate Contact
      const contact = new Contact(CName, CAddress, CNum);
  
      // Add Contact to UI
      UI.addContactToList(contact);
  
      // Add Contact to store
      Store.addContact(contact);
  
      // Show success message
      UI.showAlert('Contact Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove Contact
  document.querySelector('#contact-list').addEventListener('click', (e) => {
    // Remove Contact from UI
    UI.deleteContact(e.target);
  
    // Remove Contact from store
    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Contact Removed', 'success');
  });