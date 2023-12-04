import { Point } from './Point';

describe('Point', () => {
  it('should return an array of adjacent points', () => {
    const point = new Point(5, 5);
    const adjacentPoints = point.adjacentPoints();
    expect(adjacentPoints).toEqual([
      new Point(5, 6),
      new Point(6, 6),
      new Point(6, 5),
      new Point(6, 4),
      new Point(5, 4),
      new Point(4, 4),
      new Point(4, 5),
      new Point(4, 6)
    ]);
  });
});
