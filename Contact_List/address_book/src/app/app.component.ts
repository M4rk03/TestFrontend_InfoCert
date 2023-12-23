import { Component } from '@angular/core';
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

  constructor() {
    this.addressBook = data.contacts;
    this.contactList = this.addressBook;
    this.sortContacts();
  }

  // riordina i contatti in ordine alfabetico
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
    if (searchTerm === '' || searchTerm === ' ') {
      this.contactList = this.addressBook;
      this.contactsFound = [];
    } else {
      this.contactList = this.addressBook;
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

  // riceve il contatto da inserire
  receiveDataInsert(data: ContactModel) {
    this.addressBook.push(data);
    this.contactList = this.addressBook;
    this.sortContacts();
  }

  // riceve il contatto da eliminare
  receiveDataDelete(value: string) {
    this.addressBook = this.addressBook.filter(contact => contact.mail !== value);
    this.contactsFound = this.contactsFound.filter(contact => contact.mail !== value);
    this.sortContacts();
  }

  // riceve il contatto da modificare
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
  }

}
