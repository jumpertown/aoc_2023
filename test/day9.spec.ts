import { solveDay9Part1, solveDay9Part2 } from "../src/day9";

const testInput = [
  '0 3 6 9 12 15',
  '1 3 6 10 15 21',
  '10 13 16 21 30 45'
];

describe('solveDay9Part1', () => {
  it('should return the correct result', () => {
    const result = solveDay9Part1(testInput);
    expect(result).toEqual(114);
  });
});

describe('solveDay9Part2', () => {
  it('should return the correct result', () => {
    const result = solveDay9Part2(testInput);
    expect(result).toEqual(2);
  });
});
