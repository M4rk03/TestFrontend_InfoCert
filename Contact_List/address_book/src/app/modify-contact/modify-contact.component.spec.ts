import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyContactComponent } from './modify-contact.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ContactModel from '../models/ContactModel';

describe('ModifyContactComponent', () => {
  let component: ModifyContactComponent;
  let fixture: ComponentFixture<ModifyContactComponent>;
  let mockModalService: Partial<NgbModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyContactComponent);
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

  it('should initialize user properties in ngOnInit', () => {
    const mockUser = { name: 'John Doe', tel: '1234567890', mail: 'john@example.com' };
    component.user = mockUser;
    component.ngOnInit();
    expect(component.name).toEqual(mockUser.name);
    expect(component.tel).toEqual(mockUser.tel);
    expect(component.mail).toEqual(mockUser.mail);
  });

  it('should emit contact for updating when name is not empty', () => {
    const mockUser = { name: 'John Doe', tel: '1234567890', mail: 'john@example.com' };
    const updatedContact: Array<ContactModel> = [{ name: 'Updated', tel: '9876543210', mail: 'updated@example.com' }, mockUser];
    component.user = mockUser;
    component.name = updatedContact[0].name;
    component.tel = updatedContact[0].tel;
    component.mail = updatedContact[0].mail;

    spyOn(component.dataEvent, 'emit');

    component.updateContact();

    expect(component.dataEvent.emit).toHaveBeenCalledWith(updatedContact);
    expect(mockModalService.dismissAll).toHaveBeenCalled();
  });

  it('should not emit contact for updating if name is empty', () => {
    spyOn(component.dataEvent, 'emit');
    component.updateContact();
    expect(component.dataEvent.emit).not.toHaveBeenCalled();
    expect(mockModalService.dismissAll).not.toHaveBeenCalled();
  });

  it('should open a popup', () => {
    const mockTemplateRef: any = null;
    component.openPopup(mockTemplateRef);
    expect(mockModalService.open).toHaveBeenCalledWith(mockTemplateRef, { centered: true });
  });

});
