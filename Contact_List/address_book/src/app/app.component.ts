import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import ContactModel from './models/ContactModel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, ContactComponent, AddContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'address_book';

  // Icon
  search = faMagnifyingGlass

  // Code
  contactList: ContactModel[] = [
    {name:'Marco', tel: '559-839-7263', mail:'marco@gmail.com'},
    {name:'Filippo', tel: '588-464-7758', mail:'filippo@gmail.com'},
    {name:'Giovanni', tel: '468-192-6518', mail:'giovanni@gmail.com'},
    {name:'Gianluigi Carlo Salamella', tel: '471-453-9311', mail:'gianluigi.carlo.salamella@gmail.com'}
  ];
  
  filteredContacts: ContactModel[] = [];

  constructor() {
    this.sortContacts();
    this.filteredContacts = this.contactList;
  }

  sortContacts() {
    this.contactList.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  filterContacts(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredContacts = this.contactList.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm)
    );
  }

  receiveData(data: ContactModel) {
    this.contactList.push(data);
    this.sortContacts();
  }

}
