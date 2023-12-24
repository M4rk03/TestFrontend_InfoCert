import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser, faEnvelope, faPhone, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapseModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModifyContactComponent } from '../modify-contact/modify-contact.component';
import ContactModel from '../models/ContactModel';


@Component({
  selector: 'contact',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgbCollapseModule, ModifyContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  // Icons
  imgUser = faCircleUser;
  call = faPhone;
  write = faEnvelope;
  delete = faTrashCan;

  // Code
  @Input() user: any = {};
  @Output() dataEvent = new EventEmitter<string>();
  @Output() otherdataEvent = new EventEmitter<Array<ContactModel>>();
  
  private modalService = inject(NgbModal);

  isCollapsed = true;
  contact: CommonModule = {};

  ngOnInit(): void {
    this.contact = this.user;
  }

  // format the phone number
  public getTelNumber(number: string): string {
    let numStr = number.toString();
    const regex = /^(\d{3})(\d{3})(\d{4})$/;
    if (regex.test(numStr)) {
    return '+39 ' + numStr.replace(regex, '$1 $2 $3');
    } else {
    return "no phone number";
    }
  }

  // opens a pop-up
  openPopup(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  // delete the contact
  deleteContact() {
    this.dataEvent.emit(this.user.mail);
    this.modalService.dismissAll();
  }

  // receives the contact to edit
  receiveDataUpdate(data: Array<ContactModel>) {
    this.otherdataEvent.emit(data);
  }
}
