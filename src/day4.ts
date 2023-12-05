export const solveDay4Part1 = (input: string[]): number => {
  return input
    .map(parseLine)
    .map(scratchCardScore)
    .reduce((a, b) => a + b, 0);
}

export const solveDay4Part2 = (input: string[]): number => {
  const scratchCardNumWinners = input.map(parseLine).map(numWinners);
  const numCards = Array(scratchCardNumWinners.length).fill(1);
  scratchCardNumWinners.forEach((numWinners, idx) => {
    for(let i = idx + 1; i <= idx + numWinners; i++) {
      numCards[i] += numCards[idx];
    }
  });

  return numCards.reduce((a, b) => a + b, 0);
}

type scratchCard = {
  cardNumber: number,
  picks: number[],
  winningNumbers: Set<number>
}

export const scratchCardScore = (card: scratchCard): number => {
  const winners = numWinners(card);
  return winners > 0 ? 2 ** (winners - 1) : 0;
}

export const numWinners = (card: scratchCard): number => {
  const winningPicks = card.picks.filter((pick) => card.winningNumbers.has(pick));
  return winningPicks.length;
}

export const parseLine = (line: string): scratchCard => {
  // line format: Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  const cardRe = /^Card\s+(\d+): (.*) \| (.*)$/;
  const match = line.match(cardRe);
  if (!match) throw new Error(`Invalid line: ${line}`);

  const cardNumber = parseInt(match[1]);
  const picks = match[2].trim().split(/\s+/).map((n) => parseInt(n));
  const winningNumbers = new Set(match[3].trim().split(/\s+/).map((n) => parseInt(n)));

  return { cardNumber, picks, winningNumbers };
}
