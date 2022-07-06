import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-delete-form',
  templateUrl: './contact-delete-form.component.html',
  styleUrls: ['./contact-delete-form.component.css']
})
export class ContactDeleteFormComponent implements OnInit {
  @Output() onDeleteSubmit = new EventEmitter<boolean>;
  @Input() contactToDelete: Contact | undefined;

  deleteText: string = `Möchten Sie diesen Kontakt endgültig entfernen?`;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['contactToDelete'];
    if (change) {
      this.deleteText = `Möchten Sie '${change.currentValue.name}' endgültig als Kontakt entfernen?`;
    }
  }

  onDelete(value: boolean): void {
    this.onDeleteSubmit.emit(value);
  }
}
