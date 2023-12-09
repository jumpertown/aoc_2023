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
export class Point {
  constructor(public x: number, public y: number) {}

  isEqual(point: Point): boolean {
    return this.x === point.x && this.y === point.y;
  }

  fromString(pointString: string): Point {
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
}

// File functions
export const readFileLines = (filename: string): string[] => {
  const lines = readFileSync(filename).toString('utf8').split('\n');
  // Remove blank trailing new line.
  if(lines && lines[lines.length - 1] === '') lines.pop();

  return lines;
}
