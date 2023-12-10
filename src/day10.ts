import { Direction, Point, antiClockwise, clockwise, directions } from './utils';

// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
type Pipe = '|' | '-' | 'L' | 'J' | '7' | 'F';

export const solveDay10Part1 = (input: string[]): number => {
  const maze = Maze.parse(input);
  // maze.print();
  return maze.loopLength / 2;
}

export const solveDay10Part2 = (input: string[]): number => {
  const maze = Maze.parse(input);
  // maze.print();
  const insidePoints = maze.findInsideEdge();
  // so now we have points inside the loop that are directly next to the pipe. We
  // need to find the points that don't directly touch the pipe.
  let newPoints = [...insidePoints];
  while (newPoints.length > 0) {
    newPoints = newPoints
      .flatMap((p) => Point.fromString(p).adjacentPointsNoDiag())
      .map((p) => p.toString())
      .filter((p) => !insidePoints.has(p))
      .filter((p) => !maze.pipePositions.has(p));
    
    newPoints.forEach(insidePoints.add, insidePoints);
  }

  return insidePoints.size;
}

export class Maze {
  public pipePositions: Set<string>;

  constructor(
    public map: Map<string, Pipe>,
    public start: Point
  ) {
    this.pipePositions = this.traverseMap();
    this.map.set(this.start.toString(), this.startPipe);
  }

  static directionMap = new Map<String, Direction>([
    ['N,|', 'N'],
    ['S,|', 'S'],
    ['E,-', 'E'],
    ['W,-', 'W'],
    ['S,L', 'E'],
    ['W,L', 'N'],
    ['S,J', 'W'],
    ['E,J', 'N'],
    ['E,7', 'S'],
    ['N,7', 'W'],
    ['N,F', 'E'],
    ['W,F', 'S'],
  ]);

  get startValidDirections(): Direction[] {
    const validDirections: Direction[] = [];

    directions.forEach((dir) => {
      const newLocation = this.start.move(dir);
      const pipe = this.map.get(newLocation.toString());
      if (pipe && Maze.directionMap.has(`${dir},${pipe}`)) {
        validDirections.push(dir);
      }
    });
    
    return validDirections.sort()
  }

  get startDirection(): Direction {
    return this.startValidDirections[0];
  }

  get startPipe(): Pipe {
    const startValidDirections = this.startValidDirections.join(',');
    const pipeMap = new Map<string, Pipe>([
      ['N,S', '|'],
      ['E,W', '-'],
      ['E,N', 'L'],
      ['N,W', 'J'],
      ['S,W', '7'],
      ['E,S', 'F'],
    ]);
    return pipeMap.get(startValidDirections)!;
  }

  private traverseMap(): Set<string> {
    const start = this.start.toString();
    const pipePositions = new Set([start]);

    let position = this.start.move(this.startDirection).toString();
    let steps = 1;
    let direction = this.startDirection;
    let pipe: Pipe;

    while (position !== start) {
      pipePositions.add(position);
      pipe = this.map.get(position)!;
      direction = Maze.directionMap.get(`${direction},${pipe}`)!;
      position = Point.fromString(position).move(direction).toString();
    }

    return pipePositions;
  }

  get loopLength(): number {
    return this.pipePositions.size;
  }

  public findInsideEdge(): Set<string> {
    // For it to be a loop, every point on the pipeline separates the inside from the outside.
    // So let's find an 'F' point furthest to the left - we know then that the outside 
    // is to the north and west so the points to the south and east must be inside.

    const minX = Math.min(...[...this.pipePositions].map((p) => Point.fromString(p).x));
    const initialFPos = [...this.map]
      .filter(([pos, pipe]) => pipe === 'F' && this.pipePositions.has(pos) && Point.fromString(pos).x === minX)[0][0];

    // console.log(`Initial F position: ${initialFPos}`);

    const corners = new Set(['L', '7', 'J', 'F']);
    const clockwiseTurns = new Set(['W,L', 'E,7', 'S,J', 'N,F']);
    const inside = new Set<string>();

    let direction: Direction = 'E';
    let insideDirection: Direction = 'S';
    let position = Point.fromString(initialFPos).move(direction).toString();
    let pipe: Pipe;

    while (position !== initialFPos) {
      pipe = this.map.get(position)!;
      const insidePosition = Point.fromString(position).move(insideDirection).toString();
      if (!this.pipePositions.has(insidePosition)) {
        inside.add(insidePosition);
      }
      if (corners.has(pipe)) {
        if (clockwiseTurns.has(`${direction},${pipe}`)) {
          // console.log('Turning clockwise');
          insideDirection = clockwise(insideDirection);
        } else {
          // console.log('Turning anticlockwise');
          insideDirection = antiClockwise(insideDirection);
        }
        // console.log(`Turning at ${pipe} inside direction now ${insideDirection}`);

        // Make sure we grab both points on a turn
        const insidePosition = Point.fromString(position).move(insideDirection).toString();
        if (!this.pipePositions.has(insidePosition)) {
          inside.add(insidePosition);
        }
      }

      direction = Maze.directionMap.get(`${direction},${pipe}`)!;
      position = Point.fromString(position).move(direction).toString();
    }

    return inside;
  }

  print(): void {
    const minX = Math.min(...[...this.map.keys()].map((k) => Point.fromString(k).x));
    const maxX = Math.max(...[...this.map.keys()].map((k) => Point.fromString(k).x));
    const minY = Math.min(...[...this.map.keys()].map((k) => Point.fromString(k).y));
    const maxY = Math.max(...[...this.map.keys()].map((k) => Point.fromString(k).y));

    for (let y = maxY; y >= minY; y--) {
      let line = '';
      for (let x = minX; x <= maxX; x++) {
        const point = `${x},${y}`;
        if (this.start.toString() === point) {
          line += 'S';
        } else if (this.pipePositions.has(point)) {
          line += this.map.get(point);
        } else {
          line += '.';
        }
      }
      console.log(line);
    }
  }

  static parse(input: string[]): Maze {
    let start: Point;
    const map = new Map<string, Pipe>();

    input.forEach((line, y) => {
      line.split('').forEach((char, x) => {
        const point = new Point(x, -y);
        if (char === 'S') {
          start = point;
        } else if (char !== '.') {
          map.set(point.toString(), char as Pipe);
        }
      });
    });
    return new Maze(map, start!);
  }
}
