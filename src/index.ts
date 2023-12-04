import { solveDay1Part1, solveDay1Part2 } from "./day1";
import { solveDay2Part1, solveDay2Part2 } from "./day2";
import { solveDay3Part1, solveDay3Part2 } from "./day3";
import { solveDay4Part1, solveDay4Part2 } from "./day4";
import { readFileLines } from "./reader";

// Day 1
const puzzleInputDay1 = readFileLines('./puzzle_inputs/input_day1.txt');
console.log('Day 1');
console.log(`Part 1: ${solveDay1Part1(puzzleInputDay1)}`);
console.log(`Part 2: ${solveDay1Part2(puzzleInputDay1)}`);

// Day 2
const puzzleInputDay2 = readFileLines('./puzzle_inputs/input_day2.txt');
console.log('Day 2');
console.log(`Part 1: ${solveDay2Part1(puzzleInputDay2)}`);
console.log(`Part 2: ${solveDay2Part2(puzzleInputDay2)}`);

// Day 3
const puzzleInputDay3 = readFileLines('./puzzle_inputs/input_day3.txt');
console.log('Day 3');
console.log(`Part 1: ${solveDay3Part1(puzzleInputDay3)}`);
console.log(`Part 2: ${solveDay3Part2(puzzleInputDay3)}`);

// Day 4
const puzzleInputDay4 = readFileLines('./puzzle_inputs/input_day4.txt');
console.log('Day 4');
console.log(`Part 1: ${solveDay4Part1(puzzleInputDay4)}`);
console.log(`Part 2: ${solveDay4Part2(puzzleInputDay4)}`);
