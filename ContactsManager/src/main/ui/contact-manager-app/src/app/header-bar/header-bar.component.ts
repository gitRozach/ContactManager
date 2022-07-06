import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  @Input() teams: string[] = [];
  @Output() onSearchSubmit = new EventEmitter<string>;

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(searchValue: string): void {
    this.onSearchSubmit.emit(searchValue);
  }
}
