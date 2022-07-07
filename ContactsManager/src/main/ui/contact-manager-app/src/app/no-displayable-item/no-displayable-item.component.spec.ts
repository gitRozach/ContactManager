import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDisplayableItemComponent } from './no-displayable-item.component';

describe('NoDisplayableItemComponent', () => {
  let component: NoDisplayableItemComponent;
  let fixture: ComponentFixture<NoDisplayableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDisplayableItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDisplayableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
