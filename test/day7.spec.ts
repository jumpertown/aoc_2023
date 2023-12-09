import { CardHand, parseLine, solveDay7Part1, solveDay7Part2 } from "../src/day7";

const testInput = [
  '32T3K 765',
  'T55J5 684',
  'KK677 28',
  'KTJJT 220',
  'QQQJA 483'
];

const hands = [
  new CardHand('32T3K', 765),
  new CardHand('T55J5', 684),
  new CardHand('KK677', 28),
  new CardHand('KTJJT', 220),
  new CardHand('QQQJA', 483),
];

describe('solveDay7Part1', () => {
  it('should return the correct result', () => {
    const result = solveDay7Part1(testInput);
    expect(result).toEqual(6440);
  });
});

describe('solveDay7Part2', () => {
  it('should return the correct result', () => {
    const result = solveDay7Part2(testInput);
    expect(result).toEqual(5905);
  });
});

describe('parseLine', () => {
  it('should parse a line', () => {
    const result = parseLine('32T3K 765');
    expect(result).toEqual(new CardHand('32T3K', 765));
  });
});

describe('CardHand', () => {
  describe('handTypeRank', () => {
    it('should return the correct rank for a pair', () => {
      const hand = new CardHand('32T3K', 765);
      expect(hand.handTypeRank).toEqual(2);
    });
    it('should return the correct rank for full house', () => {
      const hand = new CardHand('A2AA2', 765);
      expect(hand.handTypeRank).toEqual(5);
    });
  })

  describe('comparePart1', () => {
    it('should rank hands correctly', () => {
      const expectedRanking = [
        new CardHand('32T3K', 765),
        new CardHand('KTJJT', 220),
        new CardHand('KK677', 28),
        new CardHand('T55J5', 684),
        new CardHand('QQQJA', 483),
      ];
      const actualRanking = [...hands].sort((a, b) => a.comparePart1(b));
      expect(actualRanking).toEqual(expectedRanking);
    });
  });
});

