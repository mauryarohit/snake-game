import { Direction } from '../models/Direction';

export function randomNumber(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
}

export function getDirectionFromKeyPress(keypress: string): Direction {
    if (keypress === 'ArrowUp') { return Direction.UP; }
    if (keypress === 'ArrowDown') { return Direction.DOWN; }
    if (keypress === 'ArrowLeft') { return Direction.LEFT; }
    if (keypress === 'ArrowRight') { return Direction.RIGHT; }
    return Direction.INVALID;
}
