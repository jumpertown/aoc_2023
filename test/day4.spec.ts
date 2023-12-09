import { solveDay4Part1, solveDay4Part2, parseLine, scratchCardScore } from "../src/day4";

const testInput = [
  'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
  'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
  'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
  'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
  'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
];

describe('solveDay4Part1', () => {
  it('should return the correct result', () => {
    const result = solveDay4Part1(testInput);
    expect(result).toEqual(13);
  });
});

describe('solveDay4Part2', () => {
  it('should return the correct result', () => {
    const result = solveDay4Part2(testInput);
    expect(result).toEqual(30);
  });
});

describe('parseLine', () => {
  it('should parse a line', () => {
    const result = parseLine('Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19');
    expect(result).toEqual({
      cardNumber: 2,
      picks: [13, 32, 20, 16, 61],
      winningNumbers: new Set([61, 30, 68, 82, 17, 32, 24, 19])
    });
  });
});

describe('scratchCardScore', () => {
  it('should return the correct score', () => {
    const card = {
      cardNumber: 1,
      picks: [41, 48, 83, 86, 17],
      winningNumbers: new Set([83, 86, 6, 31, 17, 9, 48, 53])
    };
    const result = scratchCardScore(card);
    expect(result).toEqual(8);
  });
});
