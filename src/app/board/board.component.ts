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

  snakeHead = new Snake(3, 4);
  snakeTail = this.snakeHead;

  running = false;
  gameInterval;
  currDir = Direction.RIGHT;
  keypress;

  food = {
    row: 0,
    col: 0
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
    return this.snakeService.isSnakePresent(this.snakeHead, row, col);
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
      this.snakeService.moveSnake(this.snakeHead, this.currDir);
    }, SNAKE_SPEED);
  }

  pauseGame(): void {
    console.log('pause');
    this.running = false;
    clearInterval(this.gameInterval);
  }

  ngOnInit(): void {
  }

}
