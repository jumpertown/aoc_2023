import { Maze, solveDay10Part1, solveDay10Part2 } from "../src/day10";
import { directions, Point } from "../src/utils";

const testInput = [
  '..F7.',
  '.FJ|.',
  'SJ.L7',
  '|F--J',
  'LJ...'
];

const testInputPart2 = [
  '...........',
  '.S-------7.',
  '.|F-----7|.',
  '.||.....||.',
  '.||.....||.',
  '.|L-7.F-J|.',
  '.|..|.|..|.',
  '.L--J.L--J.',
  '...........'
];

const testInput2Part2 = [
  '.F----7F7F7F7F-7....',
  '.|F--7||||||||FJ....',
  '.||.FJ||||||||L7....',
  'FJL7L7LJLJ||LJ.L-7..',
  'L--J.L7...LJS7F-7L7.',
  '....F-J..F7FJ|L7L7L7',
  '....L7.F7||L7|.L7L7|',
  '.....|FJLJ|FJ|F7|.LJ',
  '....FJL-7.||.||||...',
  '....L---J.LJ.LJLJ...'
];

const testInput3Part2 = [
  'FF7FSF7F7F7F7F7F---7',
  'L|LJ||||||||||||F--J',
  'FL-7LJLJ||||||LJL-77',
  'F--JF--7||LJLJ7F7FJ-',
  'L---JF-JLJ.||-FJLJJ7',
  '|F|F-JF---7F7-L7L|7|',
  '|FFJF7L7F-JF7|JL---7',
  '7-L-JL7||F7|L7F-7F7|',
  'L.L7LFJ|||||FJL7||LJ',
  'L7JLJL-JLJLJL--JLJ.L'
];

describe('solveDay10Part1', () => {
  it('should return the correct result', () => {
    const result = solveDay10Part1(testInput);
    expect(result).toEqual(8);
  });
});

describe('solveDay10Part2', () => {
  it('simple example should return the correct result', () => {
    const result = solveDay10Part2(testInputPart2);
    expect(result).toEqual(4);
  });
  it('second example should return the correct result', () => {
    const result = solveDay10Part2(testInput2Part2);
    expect(result).toEqual(8);
  });
  it('complex example should return the correct result', () => {
    const result = solveDay10Part2(testInput3Part2);
    expect(result).toEqual(10);
  });
});

describe('Maze', () => {
  describe('parse', () => {
    it('should parse the input', () => {
      const maze = Maze.parse(testInput);
      expect(maze.start).toEqual(new Point(0, -2)); 
      expect(maze.map).toEqual(new Map([
        ['2,0', 'F'],
        ['3,0', '7'],
        ['1,-1', 'F'],
        ['2,-1', 'J'],
        ['3,-1', '|'],
        ['0,-2', 'F'],
        ['1,-2', 'J'],
        ['3,-2', 'L'],
        ['4,-2', '7'],
        ['0,-3', '|'],
        ['1,-3', 'F'],
        ['2,-3', '-'],
        ['3,-3', '-'],
        ['4,-3', 'J'],
        ['0,-4', 'L'],
        ['1,-4', 'J'],
      ]));
    });
  });

  describe('startDirection', () => {
    it('should pick the first valid direction alphabetically', () => {
      const maze = Maze.parse(testInput);
      expect(maze.startDirection).toBe('E');
    });
  });

  describe('lengthOfLoop', () => {
    it('should return the number of steps to get back to the start', () => {
      const maze = Maze.parse(testInput);
      expect(maze.loopLength).toBe(16);
    });
  });

  describe('startPipe', () => {
    it('It should return the correct piece of piping at the start position', () => {
      const maze = Maze.parse(testInput);
      expect(maze.startPipe).toBe('F');
    });
  });

  describe('findInsideEdge', () => {
    it("Should return the pipe's neighbouring inside points", () => {
      const maze = Maze.parse(testInputPart2);
      expect(maze.findInsideEdge()).toEqual(new Set([
        "2,-6", "3,-6", "7,-6", "8,-6" 
      ]));
    });
  });
});
