import { lcm } from './utils';

type FirstOccurrence = {
  initialPosition: string,
  finalPosition: string,
  steps: number
}

export const solveDay8Part1 = (input: string[]): number => {
  return Maze.parse(input).navigate();
}

export const solveDay8Part2 = (input: string[]): number => {
  return Maze.parse(input).navigatePart2Rapid();
}

export const solveDay8Part2Slow = (input: string[]): number => {
  return Maze.parse(input).navigatePart2Naive();
}

export class Maze {
  constructor(
    public directions: string[],
    public nodeMap: Map<string, string[]>
  ) {}

  navigate(): number {
    let directionIdx = 0;
    let steps = 0;
    let position = 'AAA';
    while (position !== 'ZZZ') {
      const direction = this.directions[directionIdx];
      const nextTurns = this.nodeMap.get(position)!;
      position = direction === 'L' ? nextTurns[0] : nextTurns[1];
      steps++;
      directionIdx++;
      if (directionIdx === this.directions.length) directionIdx = 0;
    }
    return steps;
  }

  navigatePart2Naive(): number {
    let directionIdx = 0;
    let steps = 0;
    let positions = [...this.nodeMap.keys()].filter((k) => k[2] === 'A');

    while (!positions.every((p) => p[2] === 'Z')) {
      const direction = this.directions[directionIdx];
      for (let i = 0; i < positions.length; i++) {
        const nextTurns = this.nodeMap.get(positions[i])!;
        positions[i] = direction === 'L' ? nextTurns[0] : nextTurns[1];
      }
      steps++;
      directionIdx++;
      if (directionIdx === this.directions.length) directionIdx = 0;
    }
    return steps;
  }

  applyWholePathMap(): Map<string, string> {
    const newNodeMap = new Map<string, string>();
    this.nodeMap.forEach((turns, node) => {
      let point = node;
      this.directions.forEach((direction) => {
        //console.log(`${direction} ${node} ${point} ${turns}`);
        const nextPoint = this.nodeMap.get(point)!;
        point = direction === 'L' ? nextPoint[0] : nextPoint[1];
      });
      newNodeMap.set(node, point);
    });
    return newNodeMap;
  }

  firstOccurrence(initialPositions: string[]): FirstOccurrence[] {
    const wholePathMap = this.applyWholePathMap();
    let steps = 0;
    const finalPositions = new Set([...this.nodeMap.keys()].filter((k) => k[2] === 'Z'));

    const periods: FirstOccurrence[] = [];
    let positions = initialPositions;

    while(finalPositions.size > 0) {
      positions = positions.map((p) => wholePathMap.get(p)!);
      steps ++;

      positions.forEach((p, idx) => {
        if(finalPositions.has(p)) {
          finalPositions.delete(p);
          const initialPosition = initialPositions[idx];
          // Sequence starts with a left (idx 0) turn
          // const nextPosition = this.nodeMap.get(p)![0];
          periods.push({
            initialPosition,
            finalPosition: p,
            steps
          });
        };
      });
    }

    return periods;
  }

  navigatePart2BetterButStillSlow(): number {
    const wholePathMap = this.applyWholePathMap();
    let steps = 0;
    let positions = [...this.nodeMap.keys()].filter((k) => k[2] === 'A');

    while (positions.some((p) => p[2] !== 'Z')) {
      if(steps % 100000000 === 0)
        console.log(`positions: ${positions}, steps: ${steps * this.directions.length}`);
      // Avoid creating a new array every time - urghhh
      //positions = positions.map((p) => wholePathMap.get(p)!);
      for (let i = 0; i < positions.length; i++) {
        positions[i] = wholePathMap.get(positions[i])!;
      }
      steps++;
    }

    return steps * this.directions.length;
  }

  navigatePart2Rapid(): number {
    // This assumes that
    //   The Z states only occur at the end of the sequence of directions.
    //   The periodicity between endpoints is the same as the num steps to first reach that endpoint.
    const finalPosition = [...this.nodeMap.keys()].filter((k) => k[2] === 'Z');
    const periods = this.firstOccurrence(finalPosition);
    const firstAlign = periods.map((p) => p.steps).reduce(lcm, 1);
    return firstAlign * this.directions.length;
  }    


  static parse(input: string[]): Maze {
    const lineRe = /(\w+) = \((\w+), (\w+)\)/;
    const directions = input[0].split('');
    const nodeMap = new Map<string, string[]>();
    input.slice(2).forEach((line) => {
      const match = line.match(lineRe);
      if (!match) throw new Error(`Unexpected line: ${line}`);
      const [, start, leftFork, rightFork] = match;
      nodeMap.set(start, [leftFork, rightFork]);
    });

    return new Maze(directions, nodeMap);
  }
}
