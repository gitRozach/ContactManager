import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-layer',
  templateUrl: './loading-layer.component.html',
  styleUrls: ['./loading-layer.component.css']
})
export class LoadingLayerComponent implements OnInit {
  @Input() loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
