export const solveDay2Part1 = (input: string[]): number => {
  return input
    .map(parseLine)
    .filter(game => game.validFirstPart)
    .map(game => game.gameNum)
    .reduce((a, b) => a + b, 0);
}

export const solveDay2Part2 = (input: string[]): number => {
  return input
    .map(parseLine)
    .map(game => game.power)
    .reduce((a, b) => a + b, 0);
}

export class GamePick {
  constructor(
    public colours: {
      red: number,
      green: number,
      blue: number,
    }
  ) {}
}

export class Game {
  constructor(
    public gameNum: number,
    public gamePicks: GamePick[]
  ) {}

  private get maxRed() {
    return Math.max(...this.gamePicks.map(pick => pick.colours.red))
  }
  private get maxGreen() {
    return Math.max(...this.gamePicks.map(pick => pick.colours.green))
  }
  private get maxBlue() {
    return Math.max(...this.gamePicks.map(pick => pick.colours.blue))
  }

  get validFirstPart(): boolean {
    return this.maxRed <= 12 && this.maxGreen <= 13 && this.maxBlue <= 14;
  }

  get power(): number {
    return this.maxRed * this.maxGreen * this.maxBlue;
  }
}

export const parseLine = (line: string): Game => {
  // Line format Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  const lineRe = /^Game ([0-9]+): (.+)$/;
  const res = lineRe.exec(line);
  if (!res) throw Error(`Unexpected line format: ${line}`);
  const gameId = parseInt(res[1]);
  const picks = res[2].split('; ').map(parsePick);
  return new Game(gameId, picks);
}

const parsePick = (pickText: string): GamePick => {
  // Pick format: '3 blue, 4 red'
  const picks = pickText.split(', ');

  const pickRe = /^([0-9]+) (red|green|blue)$/;
  let red = 0;
  let green = 0;
  let blue = 0;

  picks.forEach(pick => {
    const res = pickRe.exec(pick);
    if (!res) throw Error(`Unexpected line format: ${pick}`);
    const number = parseInt(res[1]);
    const colour = res[2];

    if(colour === 'red')
      red += number;
    else if(colour === 'blue')
      blue += number;
    else
      green += number
  });

  return new GamePick({
    red: red,
    green: green,
    blue: blue
  })
}