import { Component, HostListener, OnInit } from '@angular/core';
import { SnakeService } from '../services/snake.service';
import { BOARD_SIZE, SNAKE_SPEED } from '../utils/constants';
import { Snake } from '../models/Snake';
import { getDirectionFromKeyPress, randomNumber } from '../utils/util';
import { Direction } from '../models/Direction';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board = [];

  snakeHead = new Snake(randomNumber(0, BOARD_SIZE), randomNumber(0, BOARD_SIZE));
  snakeTail = this.snakeHead;

  running = false;
  gameInterval;
  currDir = Direction.RIGHT;
  keypress: string;
  dir = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  addDir = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  score = 0;

  food: {row: number, col: number} = {
    row: randomNumber(0, BOARD_SIZE),
    col: randomNumber(0, BOARD_SIZE)
  };

  constructor(private snakeService: SnakeService) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      this.board.push(i);
    }

  }

  // TODO: Logic to end game
  isGameEnd(): boolean {
    return true;
  }

  getSnake(row: number, col: number): boolean {
    let curr = this.snakeHead;
    while (curr != null) {
      if (curr.row === row && curr.col === col) {
        return true;
      }
      curr = curr.next;
    }

    return false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    this.keypress = event.code;
    if (event.code === 'Space' && !this.running) {
      this.startGame();
    } else if (event.code === 'Space' && this.running) {
      this.pauseGame();
    }
  }

  preventBackwardMovement(): void {
    const pressedDir = getDirectionFromKeyPress(this.keypress);
    if (pressedDir !== Direction.INVALID) {
      if (this.currDir === Direction.UP && pressedDir !== Direction.DOWN) {
        this.currDir = pressedDir;
      }
      if (this.currDir === Direction.DOWN && pressedDir !== Direction.UP) {
        this.currDir = pressedDir;
      }
      if (this.currDir === Direction.LEFT && pressedDir !== Direction.RIGHT) {
        this.currDir = pressedDir;
      }
      if (this.currDir === Direction.RIGHT && pressedDir !== Direction.LEFT) {
        this.currDir = pressedDir;
      }
    }
  }

  startGame(): void {
    console.log('start');
    this.running = true;
    this.gameInterval = setInterval(() => {
      this.preventBackwardMovement();
      this.moveSnake();
      this.checkCollisionWithFood();
    }, SNAKE_SPEED);
  }

  pauseGame(): void {
    console.log('pause');
    this.running = false;
    clearInterval(this.gameInterval);
  }

  checkCollisionWithFood(): void {
    if (this.snakeHead.row === this.food.row && this.snakeHead.col === this.food.col) {
      this.increaseSnakeLengthByOne(this.food.row, this.food.col);
      this.food = {
        row: randomNumber(0, BOARD_SIZE),
        col: randomNumber(0, BOARD_SIZE)
      };
    }
  }

  increaseSnakeLengthByOne(row: number, col: number): void {
    this.score++;
    console.log(this.score, row, col);
    const tmp = new Snake(this.snakeTail.row + this.addDir[this.currDir][0], this.snakeTail.col + this.addDir[this.currDir][1]);
    if (tmp.row < 0) { tmp.row =  BOARD_SIZE - 1; }
    if (tmp.row >= BOARD_SIZE) { tmp.row =  0; }
    if (tmp.col < 0) { tmp.col =  BOARD_SIZE - 1; }
    if (tmp.col >= BOARD_SIZE) { tmp.col =  0; }
    console.log(tmp.row, tmp.col);
    this.snakeTail.next = tmp;
    this.snakeTail = this.snakeTail.next;
  }

  moveSnake(): void {
    // Invalid Keypress
    if (this.currDir === Direction.INVALID) { return; }
    let len = 0;
    let curr = this.snakeHead;
    while (curr != null) {
      len++;
      // console.log(len, '->', curr.row, curr.col);
      curr.row = curr.row + this.dir[this.currDir][0];
      curr.col = curr.col + this.dir[this.currDir][1];
      if (curr.row < 0) { curr.row =  BOARD_SIZE - 1; }
      if (curr.row >= BOARD_SIZE) { curr.row =  0; }
      if (curr.col < 0) { curr.col =  BOARD_SIZE - 1; }
      if (curr.col >= BOARD_SIZE) { curr.col =  0; }
      // console.log(curr.row, curr.col);
      curr = curr.next;
    }
  }

  ngOnInit(): void {
  }

}
