import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import * as contactsData from '../assets/data/contacts.json';
import ContactModel from './models/ContactModel';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.addressBook = contactsData.contacts;
    component.contactList = contactsData.contacts;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'address_book' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('address_book');
  });

  it('should initialize with contact list and search term', () => {
    expect(component.addressBook.length).toBeGreaterThan(0);
    expect(component.contactList.length).toBeGreaterThan(0);
    expect(component.searchTerm).toEqual('');
  });

  it('should sort contacts alphabetically', () => {
    const initialContacts = [...component.addressBook];
    component.sortContacts();
    expect(component.addressBook).toEqual(initialContacts.sort((a, b) => a.name.localeCompare(b.name)));
  });

  it('should search contacts based on search term', () => {
    const searchTerm = 'John';
    const mockEvent = { target: { value: searchTerm } };
    component.searchContacts(mockEvent);
    expect(component.contactsFound.length).toBeGreaterThan(0);
  });

  it('should add a contact to addressBook and activate input event', () => {
    const newContact: ContactModel = { name: 'Test', tel: '1234567890', mail: 'test@example.com' };
    component.receiveDataInsert(newContact);
    expect(component.addressBook).toContain(newContact);
    expect(component.searchTerm).toEqual('');
  });

  it('should delete a contact from addressBook and activate input event', () => {
    const contactToDeleteMail = component.addressBook[0].mail;
    component.receiveDataDelete(contactToDeleteMail);
    expect(component.addressBook.find(contact => contact.mail === contactToDeleteMail)).toBeUndefined();
    expect(component.searchTerm).toEqual('');
  });
});
