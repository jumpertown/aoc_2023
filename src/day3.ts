import { Point } from "./Point";

const parseGrid = (input: string[]): lineParts => {
  const partNumbers: PartNumber[] = [];
  const symbolPositionSet: Set<string> = new Set();
  const symbolPositions: string[] = [];
  const gearPositions: string[] = [];

  const parsed = input.map((line, idx) => parseLine(idx, line));
  parsed.forEach((lineParts) => {
    partNumbers.push(...lineParts.partNumbers);
    gearPositions.push(...lineParts.gears);
    symbolPositions.push(...lineParts.symbols);
    lineParts.symbols.forEach((s) => symbolPositionSet.add(s));
  });

  const realPartNumbers = partNumbers.filter((p) => {
    const adjSymbols = [...p.adjacentPoints()].filter(
      (point) => symbolPositionSet.has(point)
    );
    return adjSymbols.length > 0;
  });

  return {
    partNumbers: realPartNumbers,
    symbols: symbolPositions,
    gears: gearPositions,
  };
}

export const solveDay3Part1 = (input: string[]): number => {
  const lineParts = parseGrid(input);
  return lineParts.partNumbers.map(p => p.value).reduce((a, b) => a + b, 0);
}

export const solveDay3Part2 = (input: string[]): number => {
  const lineParts = parseGrid(input);
  let total = 0;

  lineParts.gears.forEach((gear) => {
    const adjPartNumbers = lineParts.partNumbers.filter((p) => {
      return p.adjacentPoints().has(gear);
    });
    if (adjPartNumbers.length == 2) total += adjPartNumbers[0].value * adjPartNumbers[1].value;
  });

  return total;
}

export class PartNumber {
  constructor(public value: number, public position: Point) {}

  get allPositions(): Point[] {
    const length = this.value.toString().length;
    const points: Point[] = []
    for(let i = 0; i < length; i++) {
      points.push(new Point(this.position.x + i, this.position.y));
    }
    return points;
  }

  adjacentPoints(): Set<string> {
    const allPositionStrings = this.allPositions.map((p) => p.toString());
    const neighbours = this.allPositions
      .flatMap((p) => p.adjacentPoints())
      .map((p) => p.toString())
      .filter((p) => !allPositionStrings.includes(p));
  
    return new Set(neighbours);
  }
}

type lineParts = {
  partNumbers: PartNumber[],
  symbols: string[],
  gears: string[],
}

export const parseLine = (rowNum: number, line: string): lineParts => {
  // Line has the format: ..35..633.
  let startIdx = 0;
  let numberBuffer: string[] = [];
  const symbols: string[] = [];
  const partNumbers: PartNumber[] = [];
  const gears: string[] = [];

  const isNumber = (char: string): boolean =>
    char >= '0' && char <= '9';

  [...line].forEach((char, idx) => {
    if (isNumber(char)) {
      if (numberBuffer.length === 0) {
        startIdx = idx;
      }
      numberBuffer.push(char);
    } else if (numberBuffer.length > 0) {
      partNumbers.push(new PartNumber(
        parseInt(numberBuffer.join('')),
        new Point(startIdx, rowNum)
      ));
      numberBuffer = [];
    }

    if (!isNumber(char) && char !== '.') {
      symbols.push(`${idx},${rowNum}`);
      if (char === '*') {
        gears.push(`${idx},${rowNum}`);
      }
    }
  });

  if (numberBuffer.length > 0) {
    partNumbers.push(new PartNumber(
      parseInt(numberBuffer.join('')),
      new Point(startIdx, rowNum)
    ));
  }

  return { partNumbers, symbols, gears };
}