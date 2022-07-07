import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { Team } from '../interface/team';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
  
})
export class HeaderBarComponent implements OnInit {
  @Input() teams: string[] = [];
  @Output() onSearchSubmit = new EventEmitter<string>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['teams'];
    if (change) {
      console.log('Updated teams:', this.teams);
    }
  }

  public trackItem (index: number, item: Team) {
    return item.id;
  }

  onSearch(searchValue: string): void {
    this.onSearchSubmit.emit(searchValue);
  }
}
