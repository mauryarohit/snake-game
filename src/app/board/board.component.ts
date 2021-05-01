import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  SIZE = 10;
  board = [];

  constructor() {
    for (let i = 0; i < this.SIZE; i++) {
      this.board.push(i);
    }
  }

  ngOnInit(): void {
  }

}
