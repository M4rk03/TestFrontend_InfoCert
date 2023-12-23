import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import ContactModel from '../models/ContactModel';

@Component({
  selector: 'modify-contact',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './modify-contact.component.html',
  styleUrl: './modify-contact.component.css'
})
export class ModifyContactComponent implements OnInit {
  // Icon
  modify = faPen;

  // Code
  @Input() user: any = {};
  @Output() dataEvent = new EventEmitter<Array<ContactModel>>();
  private modalService = inject(NgbModal);

  name: string = "";
  tel: string = "";
  mail: string = "";

  ngOnInit(): void {
      this.name = this.user.name;
      this.tel = this.user.tel;
      this.mail = this.user.mail;
  }

  // apre un pop-up
  openPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  // inserisce il contatto
  updateContact(){
    if (this.name != "") {
      let contact: Array<ContactModel> = [{name: this.name, tel: this.tel, mail: this.mail}, this.user];
      this.dataEvent.emit(contact);
      this.modalService.dismissAll();
    }
  }
}
