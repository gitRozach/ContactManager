import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  @Input() contact: Contact = {} as Contact;
  @Input() editFormId: string = 'edit-contact-form';
  @Input() deleteFormId: string = 'delete-contact-form';

  @Output() contactToEditChanged = new EventEmitter<Contact>;
  @Output() contactToDeleteChanged = new EventEmitter<Contact>;

  constructor() { }

  ngOnInit(): void {}

  public openModal(mode: 'edit' | 'delete'): void {
    const container = document.getElementById('card-controls');

    const example = document.getElementById('inputName');
    example?.setAttribute("value", "test1232222");

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.contactToEditChanged.emit(this.contact);
      button.setAttribute('data-target', '#edit-contact-form');
    }
    if (mode === 'delete') {
      this.contactToDeleteChanged.emit(this.contact);
      console.log('Submitting ID to delete: ', this.contact.id)
      button.setAttribute('data-target', '#delete-contact-form');
    }
    container!.appendChild(button);
    button.click();
  }
}
