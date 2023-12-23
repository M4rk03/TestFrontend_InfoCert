import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyContactComponent } from './modify-contact.component';

describe('ModifyContactComponent', () => {
  let component: ModifyContactComponent;
  let fixture: ComponentFixture<ModifyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
