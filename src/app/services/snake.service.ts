import { Injectable } from '@angular/core';
import { Direction } from '../models/Direction';
import { Snake } from '../models/Snake';
import { BOARD_SIZE } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SnakeService {

  dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  constructor() { }

  isSnakePresent(snakeHead: Snake, row: number, col: number): boolean {
    let curr = snakeHead;
    while (curr != null) {
      if (curr.row === row && curr.col === col) {
        return true;
      }
      curr = curr.next;
    }

    return false;
  }

  moveSnake(snakeHead: Snake, direction: Direction): void {
    // Invalid Keypress
    if (direction === Direction.INVALID) { return; }

    let curr = snakeHead;
    while (curr != null) {
      // console.log(curr.row, curr.col);
      curr.row = curr.row + this.dir[direction][0];
      curr.col = curr.col + this.dir[direction][1];
      if (curr.row < 0) { curr.row =  BOARD_SIZE - 1; }
      if (curr.row >= BOARD_SIZE) { curr.row =  0; }
      if (curr.col < 0) { curr.col =  BOARD_SIZE - 1; }
      if (curr.col >= BOARD_SIZE) { curr.col =  0; }
      // console.log(curr.row, curr.col);
      curr = curr.next;
    }
  }

}
