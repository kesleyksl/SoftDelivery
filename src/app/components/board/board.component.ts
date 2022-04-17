import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sd-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() public boardSize: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
