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
  @Output() dataEvent = new EventEmitter<ContactModel[]>();
  private modalService = inject(NgbModal);

  name: string = "";
  dataList: ContactModel[] = [];

  openPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  addContact(){
    if (this.name != "") {
      let d: ContactModel = new ContactModel(this.name, 'xxx-xxx-xxxx', 'name@gmail.com');
      this.dataList.push(d);
      this.dataEvent.emit(this.dataList);
    }
  }
}
