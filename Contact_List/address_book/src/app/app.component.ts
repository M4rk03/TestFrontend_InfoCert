import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'address_book';

  // Icon
  add = faPlus;
  search = faMagnifyingGlass

  // Code
  contactList: Array<object> = [
    {name:'Marco', mail:'marco@gmail.com'},
    {name:'Filippo', mail:'filippo@gmail.com'},
    {name:'Giovanni', mail:'giovanni@gmail.com'}
  ];

  addContact(){
    this.contactList.push({name:'Nome', mail:'mail@gmail.com'})
  }
}
