import { Game, GamePick, parseLine, solveDay2Part1, solveDay2Part2 } from "../src/day2";

const testInput = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
]

const game1 = new Game(1, [
  new GamePick({red:4, green:0, blue:3}),
  new GamePick({red:1, green:2, blue:6}),
  new GamePick({red:0, green:2, blue:0}),
]);

const game3 = new Game(3, [
  new GamePick({red:20, green:8, blue:6}),
  new GamePick({red:4, green:13, blue:5}),
  new GamePick({red:1, green:5, blue:0}),
]);

describe('Line parsing', () => {
  test('First game parses correctly', () => {
    expect(parseLine(testInput[0])).toStrictEqual(game1);
  });
  test('Third game parses correctly', () => {
    expect(parseLine(testInput[2])).toStrictEqual(game3);
  });
});

describe('Valid games identified', () => {
  test('Game 1 can be played with limited balls', () => {
    expect(game1.validFirstPart).toBe(true);
  });
  test('Game 3 has too many balls', () => {
    expect(game3.validFirstPart).toBe(false);
  });
});

describe('First part works', () => {
  test('Give expected value from test input', () => {
    expect(solveDay2Part1(testInput)).toBe(8);
  });
});

describe('Second part works', () => {
  test('Give expected value from test input', () => {
    expect(solveDay2Part2(testInput)).toBe(2286);
  });
});
