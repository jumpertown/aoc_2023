export type Race = {
  time: number,
  record: number,
}

export const solveDay6Part1 = (races: Race[]): number =>
  races.map(r => possibleHoldTimes(r.time, r.record).length).reduce((a, b) => a * b, 1);

export const solveDay6Part2 = (race: Race): number =>
  numHoldTimes(race.time, race.record);

const distance = (hold: number, duration: number): number => hold * (duration - hold);

export const possibleHoldTimes = (duration: number, record: number): number[] => 
 [...Array(duration).keys()].filter((holdTime) => distance(holdTime, duration) > record);


export const numHoldTimes = (duration: number, record: number): number => {
  let recordBreakers = 0;
  for (let holdTime = 0; holdTime < duration; holdTime++) {
    if (distance(holdTime, duration) > record) recordBreakers++;
  }
  return recordBreakers;
}
