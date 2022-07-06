import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-add-form',
  templateUrl: './contact-add-form.component.html',
  styleUrls: ['./contact-add-form.component.css']
})
export class ContactAddFormComponent implements OnInit {
  @Input() formId: string = 'contact-add-form';
  @Output() formEvent = new EventEmitter<NgForm>;
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm) {
    this.formEvent.emit(form);
  }

}
