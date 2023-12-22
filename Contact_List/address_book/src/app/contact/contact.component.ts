import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser, faPen, faPhone, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'contact',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgbCollapseModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  // Icon
  imgUser = faCircleUser;
  phone = faPhone;
  modify = faPen;
  delete = faTrashCan;

  // Code
  @Input() user: any = {};

  isCollapsed = true;

}
