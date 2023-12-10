import { Point, counter } from '../src/utils';

describe('counter', () => {
  it('should return the correct counts', () => {
    const result = counter(['a', 'b', 'a', 'c', 'a', 'b']);
    expect(result).toEqual(new Map([
      ['a', 3],
      ['b', 2],
      ['c', 1],
    ]));
  });
});

describe('Point', () => {
  describe('adjacentPoints', () => {
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

  describe('move', () => {
    it('should return the correct adjacent point', () => {
      const point = new Point(5, 5);
      expect( point.move('N')).toEqual(new Point(5, 6));
      expect( point.move('S')).toEqual(new Point(5, 4));
      expect( point.move('E')).toEqual(new Point(6, 5));
      expect( point.move('W')).toEqual(new Point(4, 5));
    });
  });
});
