export class Snake {

    row: number;
    col: number;
    next: Snake;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.next = null;
    }
}
