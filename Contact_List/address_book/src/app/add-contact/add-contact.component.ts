import { Component, EventEmitter, Output, TemplateRef, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import ContactModel from '../models/ContactModel';

@Component({
  selector: 'add-contact',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  // Icon
  add = faPlus;

  // Code
  @Output() dataEvent = new EventEmitter<ContactModel>();
  private modalService = inject(NgbModal);

  name: string = "";
  tel: string = "";
  mail: string = "";

  // apre un pop-up
  openPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  // inserisce il contatto
  addContact(){
    if (this.name != "") {
      let contact: ContactModel = {name: this.name, tel: this.tel, mail: this.mail};
      this.dataEvent.emit(contact);
      this.modalService.dismissAll();
    }
  }

}
