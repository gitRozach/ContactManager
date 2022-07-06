import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddFormComponent } from './contact-add-form.component';

describe('ContactAddFormComponent', () => {
  let component: ContactAddFormComponent;
  let fixture: ComponentFixture<ContactAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
