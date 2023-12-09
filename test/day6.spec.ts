import { solveDay6Part1, solveDay6Part2, possibleHoldTimes } from '../src/day6';

describe('solveDay6Part1', () => {
  it('should return the correct result', () => {
    const input = [
      {time: 7, record: 9},
      {time: 15, record: 40},
      {time: 30, record: 200},
    ];
    const result = solveDay6Part1(input);
    expect(result).toEqual(288);
  });
});

describe('solveDay6Part2', () => {
  it('should return the correct result', () => {
    const race = {time: 71530, record: 940200};

    const result = solveDay6Part2(race);
    expect(result).toEqual(71503);
  });
});

describe('possibleHoldTimes', () => {
  it('should return the correct result', () => {
    const result = possibleHoldTimes(7, 9);
    expect(result).toEqual([2, 3, 4, 5]);
  });
});