import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import ContactModel from './models/ContactModel';
import * as data from '../assets/data/contacts.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, ContactComponent, AddContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'address_book';

  // Icon
  search = faMagnifyingGlass

  // Code
  contactList: Array<ContactModel> = [];
  contactsFound: Array<ContactModel> = [];

  addressBook: Array<ContactModel> = [];
  searchTerm: string = '';

  @ViewChild('inputField') inputField: ElementRef | undefined;

  constructor() {
    this.addressBook = data.contacts;
    this.contactList = this.addressBook;
    this.sortContacts();
  }

  // activates the event associated with the input
  activateInputEvent() {
    if (this.inputField) {
      const event = new Event('input', { bubbles: true });
      this.inputField.nativeElement.dispatchEvent(event);
    }
  }

  // sort contacts alphabetically
  sortContacts() {
    this.addressBook.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  searchContacts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchTerm = searchTerm;
    this.contactList = this.addressBook;

    if (searchTerm === '' || searchTerm === ' ') {
      this.contactsFound = [];
    } else {
      this.contactsFound = this.addressBook.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.tel.includes(searchTerm)
      );
      this.contactList = this.addressBook.filter(contact => 
        !(contact.name.toLowerCase().includes(searchTerm) ||
        contact.tel.includes(searchTerm))
      );
    }
  }

  // receives the contact to insert
  receiveDataInsert(data: ContactModel) {
    this.addressBook.push(data);
    this.sortContacts();
    this.activateInputEvent();
  }

  // receives the contact to delete
  receiveDataDelete(value: string) {
    this.addressBook = this.addressBook.filter(contact => contact.mail !== value);
    this.sortContacts();
    this.activateInputEvent();
  }

  // receives the contact to edit
  receiveDataUpdate(data: Array<ContactModel>) {
    this.addressBook = this.addressBook.map(contact => {
      if (contact.mail === data[1].mail) {
        return { 
          ...contact,
          name: data[0].name,
          tel: data[0].tel,
          mail: data[0].mail
        };
      }
      return contact;
    });
    this.sortContacts();
    this.activateInputEvent();
  }

}
