import { readFileSync } from 'fs';

export const readFileLines = (filename: string): string[] => {
  const lines = readFileSync(filename).toString('utf8').split('\n');
  // Remove blank trailing new line.
  if(lines && lines[lines.length - 1] === '') lines.pop();

  return lines;
}
