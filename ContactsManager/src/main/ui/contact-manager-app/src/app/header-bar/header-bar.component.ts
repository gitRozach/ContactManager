import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { Contact } from '../interface/contact';

export const DEFAULT_ALL_TEAMS_NAME = 'Alle Teams';
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
  
})
export class HeaderBarComponent implements OnInit {
  @Input() teams: string[] = [];
  @Input() selectedContact: Contact | undefined;
  @Output() onSearchSubmit = new EventEmitter<string>;
  @Output() onTeamChanged = new EventEmitter<string | undefined>;
  selectedTeam: string = DEFAULT_ALL_TEAMS_NAME;

  constructor() { }

  ngOnInit(): void {
  }

  onTeamSelectionChanged(value: string | undefined) {
    this.selectedTeam = value ?? DEFAULT_ALL_TEAMS_NAME;
    this.onTeamChanged.emit(value);
  }

  onSearch(searchValue: string): void {
    this.onSearchSubmit.emit(searchValue);
  }
}
