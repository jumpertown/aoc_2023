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