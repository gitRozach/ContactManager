import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-displayable-item',
  templateUrl: './no-displayable-item.component.html',
  styleUrls: ['./no-displayable-item.component.css']
})
export class NoDisplayableItemComponent implements OnInit {
  @Input() text: string = 'Keine Kontakte gefunden.';
  constructor() { }

  ngOnInit(): void {
  }

}
