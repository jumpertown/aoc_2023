import { readFileSync } from 'fs';

// Pythony functions
export function counter<T>(items: T[]): Map<T, number> {
  const counts = new Map<T, number>();
  items.forEach((item) => {
    counts.set(item, (counts.get(item) || 0) + 1);
  });
  return counts;
}

// Maths functions
export const gcd = (a: number, b: number): number => {
  return !b ? a : gcd(b, a % b);
}

export const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);   
}

// Location functions
export type Direction = 'N' | 'E' | 'S' | 'W';
export const directions: Direction[] = ['N', 'E', 'S', 'W'];

export const clockwise = (direction: Direction): Direction => {
  switch(direction) {
    case 'N':
      return 'E';
    case 'E':
      return 'S';
    case 'S':
      return 'W';
    case 'W':
      return 'N';
  }
}

export const antiClockwise = (direction: Direction): Direction => {
  switch(direction) {
    case 'N':
      return 'W';
    case 'W':
      return 'S';
    case 'S':
      return 'E';
    case 'E':
      return 'N';
  }
}

export class Point {
  constructor(public x: number, public y: number) {}

  isEqual(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }

  static fromString(pointString: string): Point {
    const [x, y] = pointString.split(',');
    return new Point(parseInt(x), parseInt(y));
  }

  toString(): string {
    return `${this.x},${this.y}`;
  }

  adjacentPoints(): Point[] {
    return [
      new Point(this.x, this.y + 1),
      new Point(this.x + 1, this.y + 1),
      new Point(this.x + 1, this.y),
      new Point(this.x + 1, this.y - 1),
      new Point(this.x, this.y - 1),
      new Point(this.x - 1, this.y - 1),
      new Point(this.x - 1, this.y),
      new Point(this.x - 1, this.y + 1),
    ];
  }

  adjacentPointsNoDiag(): Point[] {
    return [
      new Point(this.x, this.y + 1),
      new Point(this.x + 1, this.y),
      new Point(this.x, this.y - 1),
      new Point(this.x - 1, this.y),
    ];
  }

  move(direction: Direction): Point {
    switch(direction) {
      case 'N':
        return new Point(this.x, this.y + 1);
      case 'E':
        return new Point(this.x + 1, this.y);
      case 'S':
        return new Point(this.x, this.y - 1);
      case 'W':
        return new Point(this.x - 1, this.y);
    }
  }
}

// File functions
export const readFileLines = (filename: string): string[] => {
  const lines = readFileSync(filename).toString('utf8').split('\n');
  // Remove blank trailing new line.
  if(lines && lines[lines.length - 1] === '') lines.pop();

  return lines;
}
