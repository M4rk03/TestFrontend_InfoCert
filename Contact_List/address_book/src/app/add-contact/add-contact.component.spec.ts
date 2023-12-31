import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactComponent } from './add-contact.component';
import ContactModel from '../models/ContactModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('AddContactComponent', () => {
  let component: AddContactComponent;
  let fixture: ComponentFixture<AddContactComponent>;
  let mockModalService: Partial<NgbModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    mockModalService = {
      open: jasmine.createSpy('open'),
      dismissAll: jasmine.createSpy('dismissAll')
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit contact when adding contact with valid name', () => {
    const mockContact: ContactModel = {
      name: 'John Doe',
      tel: '1234567890',
      mail: 'john@example.com'
    };

    component.name = mockContact.name;
    component.tel = mockContact.tel;
    component.mail = mockContact.mail;

    spyOn(component.dataEvent, 'emit');

    component.addContact();

    expect(component.dataEvent.emit).toHaveBeenCalledWith(mockContact);
    expect(mockModalService.dismissAll).toHaveBeenCalled();
  });

  it('should not emit contact if name is empty when adding contact', () => {
    spyOn(component.dataEvent, 'emit');

    component.addContact();

    expect(component.dataEvent.emit).not.toHaveBeenCalled();
    expect(mockModalService.dismissAll).not.toHaveBeenCalled();
  });

  it('should open a popup', () => {
    const mockTemplateRef: any = null;
    component.openPopup(mockTemplateRef);

    expect(mockModalService.open).toHaveBeenCalledWith(mockTemplateRef, { centered: true });
  });

});
