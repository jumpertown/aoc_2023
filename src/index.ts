import { solveDay1Part1, solveDay1Part2 } from "./day1";
import { solveDay2Part1, solveDay2Part2 } from "./day2";
import { solveDay3Part1, solveDay3Part2 } from "./day3";
import { solveDay4Part1, solveDay4Part2 } from "./day4";
import { solveDay5Part1, solveDay5Part2 } from "./day5";
import { solveDay6Part1, solveDay6Part2 } from "./day6";
import { solveDay7Part1, solveDay7Part2 } from "./day7";
import { solveDay8Part1, solveDay8Part2 } from "./day8";
import { solveDay9Part1, solveDay9Part2 } from "./day9";
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

// Day 5
const puzzleInputDay5 = readFileLines('./puzzle_inputs/input_day5.txt');
console.log('Day 5');
console.log(`Part 1: ${solveDay5Part1(puzzleInputDay5)}`);
console.log(`Part 2: ${solveDay5Part2(puzzleInputDay5)}`);

//Day 6
const puzzleInputDay6 = [
  {time: 47, record: 282},
  {time: 70, record: 1079},
  {time: 75, record: 1147},
  {time: 66, record: 1062}
];
console.log('Day 6');
console.log(`Part 1: ${solveDay6Part1(puzzleInputDay6)}`);
console.log(`Part 2: ${solveDay6Part2({time: 47707566, record: 282107911471062})}`);

// Day 7
const puzzleInputDay7 = readFileLines('./puzzle_inputs/input_day7.txt');
console.log('Day 7');
console.log(`Part 1: ${solveDay7Part1(puzzleInputDay7)}`);
console.log(`Part 2: ${solveDay7Part2(puzzleInputDay7)}`);

// Day 8
const puzzleInputDay8 = readFileLines('./puzzle_inputs/input_day8.txt');
console.log('Day 8');
console.log(`Part 1: ${solveDay8Part1(puzzleInputDay8)}`);
let start = Date.now();
// Takes a long time to run...
// ... but eventually yields 14321394058031
console.log(`Part 2: ${solveDay8Part2(puzzleInputDay8)}`);
console.log(`Part 2: ${Date.now() - start}ms`);

// Day 9
const puzzleInputDay9 = readFileLines('./puzzle_inputs/input_day9.txt');
console.log('Day 9');
console.log(`Part 1: ${solveDay9Part1(puzzleInputDay9)}`);
console.log(`Part 2: ${solveDay9Part2(puzzleInputDay9)}`);
