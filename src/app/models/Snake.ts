import { Direction } from "./Direction";

export class Snake {

    row: number;
    col: number;
    direction: Direction;
    next: Snake;

    constructor(row: number, col: number, direction: Direction) {
        this.row = row;
        this.col = col;
        this.direction = direction;
        this.next = null;
    }
}
