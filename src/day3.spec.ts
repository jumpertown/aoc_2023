import { PartNumber, solveDay3Part1, solveDay3Part2, parseLine } from './day3';
import { Point } from './Point';

const testInput = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..'
];

describe('solveDay3Part1', () => {
  it('should return the correct result', () => {
    const result = solveDay3Part1(testInput);
    expect(result).toEqual(4361);
  });
});

describe('solveDay3Part2', () => {
  it('should return the correct result', () => {
    const result = solveDay3Part2(testInput);
    expect(result).toEqual(467835);
  });
});

describe('PartNumber', () => {
  describe('allPositions', () => {
    it('should return all positions occupied by a multi digit number', () => {
      const partNumber = new PartNumber(123, new Point(5, 5));
      const result = partNumber.allPositions;
      expect(result).toEqual([new Point(5, 5), new Point(6, 5), new Point(7, 5)]);
    });
    it('should return the position of the digit for a single digit number', () => {
      const partNumber = new PartNumber(6, new Point(5, 5));
      const result = partNumber.allPositions;
      expect(result).toEqual([new Point(5, 5)]);
    });
  });

  describe('adjacentPoints', () => {
    it('should return all points around the Multi digit PartNumber', () => {
      const partNumber = new PartNumber(123, new Point(5, 5));
      const result = partNumber.adjacentPoints();
      expect(result).toEqual(new Set([
        "4,6", "5,6", "6,6", "7,6", "8,6",
        "4,5", "8,5",
        "4,4", "5,4", "6,4", "7,4", "8,4",
      ]));
    });
    it('should return all points around a single digit PartNumber', () => {
      const partNumber = new PartNumber(1, new Point(5, 5));
      const result = partNumber.adjacentPoints();
      expect(result).toEqual(new Set([
        "4,6", "5,6", "6,6",
        "4,5", "6,5",
        "4,4", "5,4", "6,4"
      ]));
    });
  });
});

describe('parseLine', () => {
  it('should pull out the position of numbers and symbols', () => {
    const result = parseLine(4, '.$.35*.633.');
    expect(result).toEqual({
      partNumbers: [
        new PartNumber(35, new Point(3, 4)),
        new PartNumber(633, new Point(7, 4)),
      ],
      symbols: ['1,4', '5,4'],
      gears: ['5,4']
    });
  });
});
