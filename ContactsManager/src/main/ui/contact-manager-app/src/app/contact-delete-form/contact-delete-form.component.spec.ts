import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDeleteFormComponent } from './contact-delete-form.component';

describe('ContactDeleteFormComponent', () => {
  let component: ContactDeleteFormComponent;
  let fixture: ComponentFixture<ContactDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDeleteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
