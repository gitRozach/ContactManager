import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

export const DEFAULT_ALL_TEAMS_NAME = 'Alle Teams';
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
  
})
export class HeaderBarComponent implements OnInit {
  @Input() teams: string[] = [];
  @Output() onSearchSubmit = new EventEmitter<string>;
  @Output() onTeamChanged = new EventEmitter<string | undefined>;
  selectedTeam: string = DEFAULT_ALL_TEAMS_NAME;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['teams'];
    if (change) {
      console.log('Updated teams:', this.teams);
    }
  }

  onTeamSelectionChanged(value: string | undefined) {
    this.selectedTeam = value ?? DEFAULT_ALL_TEAMS_NAME;
    this.onTeamChanged.emit(value);
  }

  onSearch(searchValue: string): void {
    this.onSearchSubmit.emit(searchValue);
  }
}
