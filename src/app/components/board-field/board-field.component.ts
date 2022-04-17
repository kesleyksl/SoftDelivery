import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sd-board-field',
  templateUrl: './board-field.component.html',
  styleUrls: ['./board-field.component.scss']
})
export class BoardFieldComponent implements OnInit {

  @Input() public driver: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
