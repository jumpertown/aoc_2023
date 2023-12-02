const numberMap: Record<string, number> = {
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
};

type Occurrence = {
  value: number;
  first: number;
  last: number;
}

export const solveDay1Part1 = (input: string[]): number =>
  encodeInput(input, encodeLinePart1);

export const solveDay1Part2 = (input: string[]): number =>
  encodeInput(input, encodeLinePart2);

const encodeInput = (
  input: string[],
  encoder: (line: string) => number
): number => input.map(encoder).reduce((a, b) => a+b, 0);

export const encodeLinePart1 = (line: string): number => {
  const numbers = [...line].filter((char: string): boolean => {
    return char >= '0' && char <= '9';
  })

  return parseInt(`${numbers[0]}${numbers.slice(-1)}`);
}

export const encodeLinePart2 = (line: string): number => {
  const numberText = Object.keys(numberMap);

  const occurrences: Occurrence[] = numberText.map((a) => {
    return {
      value: numberMap[a],
      first: line.indexOf(a),
      last: line.lastIndexOf(a)
    }
  }).filter((o) => o.first != -1);

  const firstVal = occurrences.sort((a, b) => a.first - b.first)[0].value;
  const lastVal = occurrences.sort((a, b) => b.last - a.last)[0].value;

  return firstVal * 10 + lastVal;
}
