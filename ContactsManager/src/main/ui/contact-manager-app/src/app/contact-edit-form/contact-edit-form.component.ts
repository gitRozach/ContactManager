import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../interface/contact';

@Component({
  selector: 'app-contact-edit-form',
  templateUrl: './contact-edit-form.component.html',
  styleUrls: ['./contact-edit-form.component.css']
})
export class ContactEditFormComponent implements OnInit {
  @Output() onEditSubmit = new EventEmitter<NgForm>;
  @Input() contactToEdit: Contact | undefined;
  
  editNameInput: string = '';
  editTitleInput: string = '';
  editTeamInput: string = '';
  editEmailInput: string = '';
  editPhoneNumberInput: string = '';
  editImageUrlInput: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['contactToEdit'];
    if (change) {
      this.editNameInput = change.currentValue?.name;
      this.editTitleInput = change.currentValue?.title;
      this.editTeamInput = change.currentValue?.team;
      this.editEmailInput = change.currentValue?.email;
      this.editPhoneNumberInput = change.currentValue?.phoneNumber;
      this.editImageUrlInput = change.currentValue?.imageUrl;
    }
  }

  onEdit(contactForm: NgForm): void {
    this.onEditSubmit.emit(contactForm);
  }

}
