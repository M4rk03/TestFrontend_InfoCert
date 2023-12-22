import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { JsonService } from './json.service';
import ContactModel from './models/ContactModel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, ContactComponent, AddContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'address_book';

  // Icon
  search = faMagnifyingGlass

  // Code
  contactList: Array<ContactModel> = [];
  
  filteredContacts: Array<ContactModel> = [];

  constructor(private jsonService: JsonService) {
    this.sortContacts();
    this.filteredContacts = this.contactList;
  }

  // prende i dati dal json
  ngOnInit(): void {
    this.jsonService.getContacts()
      .subscribe(data => {
        this.contactList = data;
        console.log(this.contactList);
      });
  }

  // riordina i contatti in ordine alfabetico
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

  // riceve il contatto da inserire
  receiveData(data: ContactModel) {
    this.contactList.push(data);
    this.sortContacts();
  }

}
