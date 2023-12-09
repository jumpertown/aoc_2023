export const solveDay9Part1 = (input: string[]): number => {
  const lines = parseInput(input);
  return lines.map(nextInSequence).reduce((a, b) => a + b, 0);
}

export const solveDay9Part2 = (input: string[]): number => {
  const lines = parseInput(input);
  return lines.map(prevInSequence).reduce((a, b) => a + b, 0);
}

const parseInput = (input: string[]): number[][] =>
  input.map((line) => line.split(/\s+/).map((n) => parseInt(n)));

const nextInSequence = (sequence: number[]): number => {
  const finalValues: number[] = [];

  let currentSequence = sequence;
  finalValues.push(currentSequence[currentSequence.length - 1]);
  let lastSequence = false;
  while (!lastSequence) {
    let newSequence: number[] = [];
    lastSequence = true;
    for (let i = 0; i < currentSequence.length - 1; i++) {
      const diff = currentSequence[i + 1] - currentSequence[i];
      if (diff !== 0) lastSequence = false;
      newSequence.push(diff);
    }
    currentSequence = newSequence;

    finalValues.push(currentSequence[currentSequence.length - 1]);
  }

  return finalValues.reduce((a, b) => a + b, 0);
}

const prevInSequence = (sequence: number[]): number => {
  const initialValues: number[] = [];

  let currentSequence = sequence;
  initialValues.push(currentSequence[0]);
  let lastSequence = false;
  while (!lastSequence) {
    let newSequence: number[] = [];
    lastSequence = true;
    for (let i = 0; i < currentSequence.length - 1; i++) {
      const diff = currentSequence[i + 1] - currentSequence[i];
      if (diff !== 0) lastSequence = false;
      newSequence.push(diff);
    }
    currentSequence = newSequence;

    initialValues.push(currentSequence[0]);
  }

  initialValues.reverse();
  const prevValues = [0];
  initialValues.forEach((v) => prevValues.push(v - prevValues[prevValues.length - 1]));
  return prevValues[prevValues.length - 1];
}
