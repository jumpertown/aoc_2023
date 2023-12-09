import { 
  solveDay1Part1,
  solveDay1Part2,
  encodeLinePart1,
  encodeLinePart2
} from "../src/day1";

const testPart1=[
  '1abc2',
  'pqr3stu8vwx',
  'a1b2c3d4e5f',
  'treb7uchet'
];

const testPart2=[
  'two1nine',
  'eightwothree',
  'abcone2threexyz',
  'xtwone3four',
  '4nineeightseven2',
  'zoneight234',
  '7pqrstsixteen'
];

describe('Part 1 line encoder', () => {
  test('Two digits: 1abc2 encodes to 12', () => {
    expect(encodeLinePart1(testPart1[0])).toBe(12);
  });
  test('One digit: treb7uchet encodes to 77', () => {
    expect(encodeLinePart1(testPart1[3])).toBe(77);
  });
  test('Multiple digits: a1b2c3d4e5f encodes to 15', () => {
    expect(encodeLinePart1(testPart1[2])).toBe(15);
  });
});

describe('Part 1 input encoder', () => {
  test('Past 1 works with test input', () => {
    expect(solveDay1Part1(testPart1)).toBe(142);
  });
});

describe('Part 2 line encoder', () => {
  test('Just text: eightwothree encodes to 83', () => {
    expect(encodeLinePart2(testPart2[1])).toBe(83);
  });
  test('Digits and text: treb7uchet encodes to 77', () => {
    expect(encodeLinePart2(testPart2[5])).toBe(14);
  });
});

describe('Part 2 input encoder', () => {
  test('Past 2 works with test input', () => {
    expect(solveDay1Part2(testPart2)).toBe(281);
  });
});
