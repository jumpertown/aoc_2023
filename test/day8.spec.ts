import { Maze, solveDay8Part1, solveDay8Part2Slow } from "../src/day8";

const testInputPart2 = [
  'LR',
  '',
  '11A = (11B, XXX)',
  '11B = (XXX, 11Z)',
  '11Z = (11B, XXX)',
  '22A = (22B, XXX)',
  '22B = (22C, 22C)',
  '22C = (22Z, 22Z)',
  '22Z = (22B, 22B)',
  'XXX = (XXX, XXX)'
];

describe('solveDay8Part1', () => {
  it('should return the correct result when not repeated', () => {
    const testInput = [
      'RL',
      '',
      'AAA = (BBB, CCC)',
      'BBB = (DDD, EEE)',
      'CCC = (ZZZ, GGG)',
      'DDD = (DDD, DDD)',
      'EEE = (EEE, EEE)',
      'GGG = (GGG, GGG)',
      'ZZZ = (ZZZ, ZZZ)',
    ];

    const result = solveDay8Part1(testInput);
    expect(result).toEqual(2);
  });
  it('should return the correct result when repeated', () => {
    const testInput = [
      'LLR',
      '',
      'AAA = (BBB, BBB)',
      'BBB = (AAA, ZZZ)',
      'ZZZ = (ZZZ, ZZZ)'
    ];

    const result = solveDay8Part1(testInput);
    expect(result).toEqual(6);
  });
});

describe('solveDay8Part2Slow', () => {
  it('should return the correct result ', () => {

    const result = solveDay8Part2Slow(testInputPart2);
    expect(result).toEqual(6);
  });
});

describe('Maze', () => {
  describe('parse', () => {
    it('should parse the input', () => {
      const testInput = [
        'LLR',
        '',
        'AAA = (BBB, BBB)',
        'BBB = (AAA, ZZZ)',
        'ZZZ = (ZZZ, ZZZ)'
      ];

      const expectedMaze = new Maze(
        ['L', 'L', 'R'],
        new Map([
          ['AAA', ['BBB', 'BBB']],
          ['BBB', ['AAA', 'ZZZ']],
          ['ZZZ', ['ZZZ', 'ZZZ']]
        ])
      );

      const result = Maze.parse(testInput);
      expect(result).toEqual(expectedMaze);
    });
  });

  describe('applyWholePathMap', () => {
    it('should return the correct map', () => {

      const expectedMap = new Map([
        ['11A', '11Z'],
        ['11B', 'XXX'],
        ['11Z', '11Z'],
        ['22A', '22C'],
        ['22B', '22Z'],
        ['22C', '22B'],
        ['22Z', '22C'],
        ['XXX', 'XXX'],
      ]);

      const maze = Maze.parse(testInputPart2);
      const result = maze.applyWholePathMap();
      expect(result).toEqual(expectedMap);
    });
  });
});