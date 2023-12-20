import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';

import ContactModel from './models/ContactModel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, ContactComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'address_book';

  // Icon
  add = faPlus;
  search = faMagnifyingGlass

  // Code
  contactList: ContactModel[] = [
    {name:'Marco', tel: 3001002000, mail:'marco@gmail.com'},
    {name:'Filippo', tel: 3001002000, mail:'filippo@gmail.com'},
    {name:'Giovanni', tel: 3001002000, mail:'giovanni@gmail.com'}
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

  addContact(){
    this.contactList.push({name:'Nome', tel: 100, mail:'mail@gmail.com'})
    this.sortContacts();
  }

}
