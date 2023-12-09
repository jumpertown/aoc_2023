import { counter } from "./utils";

export const scoreSortedHands = (hands: CardHand[]): number => {
  let result = 0;
  hands.forEach((hand, idx) => {
    result += hand.rank * (idx + 1);
  });
  return result;
}

export const solveDay7Part1 = (input: string[]): number => {
  const hands = input.map(parseLine).sort((a, b) => a.comparePart1(b));
  return scoreSortedHands(hands);
}

export const solveDay7Part2 = (input: string[]): number => {
  const hands = input.map(parseLine).sort((a, b) => a.comparePart2(b));
  return scoreSortedHands(hands);
}

export const parseLine = (line: string): CardHand => {
  const parts = line.split(/\s+/);
  return new CardHand(parts[0], parseInt(parts[1]));
}

const cardRank: Record<string, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "T": 10,
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14
}

const jokerCardRank: Record<string, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "T": 10,
  "J": 1,
  "Q": 12,
  "K": 13,
  "A": 14
}

const ofAKindMap: Record<string, number> = {
  "1,1,1,1,1": 1,
  "1,1,1,2": 2,
  "1,2,2": 3,
  "1,1,3": 4,
  "2,3": 5,
  "1,4": 6,
  "5": 7
}


export class CardHand {
  constructor(public cards: string, public rank: number) {}

  get handTypeRank(): number {
    const cardCounts = [...counter([...this.cards]).values()].sort().join(',');
    return ofAKindMap[cardCounts];
  }

  get handTypeRankPart2(): number {
    const cardCounts = counter([...this.cards]);
    const numJokers = cardCounts.get('J') || 0;
    cardCounts.delete('J');
    const nonJokers = [...cardCounts.values()].sort();

    if (nonJokers.length === 0) {
      // Five jokers
      return ofAKindMap['5'];
    }

    // Substitute joker for most popular card (4OAC beats full house)
    nonJokers[nonJokers.length - 1] += numJokers;
    return ofAKindMap[nonJokers.join(',')];
  }

  private compareCards(other: CardHand, rankMap: Record<string, number>): number {
    for (let i = 0; i < this.cards.length; i++) {
      if(rankMap[this.cards[i]] !== rankMap[other.cards[i]]) {
        return rankMap[this.cards[i]] - rankMap[other.cards[i]];
      }
    }

    return 0;
  }

  comparePart1(other: CardHand): number {
    // Compare hand type
    if(this.handTypeRank !== other.handTypeRank) {
      return this.handTypeRank - other.handTypeRank;
    }

    return this.compareCards(other, cardRank);
  }

  comparePart2(other: CardHand): number {
    // Compare hand type
    if(this.handTypeRankPart2 !== other.handTypeRankPart2) {
      return this.handTypeRankPart2 - other.handTypeRankPart2;
    }

    return this.compareCards(other, jokerCardRank);
  }
}