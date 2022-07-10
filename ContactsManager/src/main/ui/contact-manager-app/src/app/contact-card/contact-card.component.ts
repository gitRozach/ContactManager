import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../interface/contact';

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
  @Output() selectedContactChanged = new EventEmitter<Contact>;

  constructor() { }

  ngOnInit(): void {}

  public openEditModal(): void {
    console.log('Submitting ID to edit: ', this.contact.id)
    this.contactToEditChanged.emit(this.contact);
    const container = document.getElementById('card-controls');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#edit-contact-form');
    container!.appendChild(button);
    button.click();
  }

  public openDeleteModal(): void {
    console.log('Submitting ID to delete: ', this.contact.id)
    this.contactToDeleteChanged.emit(this.contact);
    const container = document.getElementById('card-controls');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#delete-contact-form');
    container!.appendChild(button);
    button.click();
  }

  public selectContact(): void {
    this.selectedContactChanged.emit(this.contact);
  }
}
