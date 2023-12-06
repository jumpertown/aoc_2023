export const solveDay5Part1 = (input: string[]): number => {
  const { seeds, sourceMapMap } = parseInput(input);
  const locations = seeds.map((seed) => locationForSeed(seed, sourceMapMap));
  return Math.min(...locations);
}

export const solveDay5Part2 = (input: string[]): number => {
  const { seeds, sourceMapMap } = parseInput(input);
  const singleSourceMap = flattenMaps(sourceMapMap);
  // console.log(singleSourceMap);

  // Treat initial seeds as a source map
  // Must be a better way to iterate over multiple elements
  const initialRangeMaps: RangeMap[] = [];
  for (let i = 0; i < seeds.length; i+=2) {
    const seed = seeds[i];
    const seedLength = seeds[i + 1];
    initialRangeMaps.push(new RangeMap(seed, seed, seedLength));
  }
  const initialSeedMap = new SourceMap('intial', 'seed', initialRangeMaps);
  // console.log(`99 would end up here: ${locationForSeed(99, sourceMapMap)}`);

  const combinedMap = initialSeedMap.combine(singleSourceMap, true);
  // console.log(combinedMap);
  const possibleMinDestinations = combinedMap.rangeMaps.map(r => r.destination)
  return Math.min(...possibleMinDestinations);
};

const flattenMaps = (sourceMapMap: Map<string, SourceMap>): SourceMap => {
  let sourceMap = sourceMapMap.get('seed');
  if (!sourceMap) throw new Error(`No source map for seed`);

  while (true) {
    //console.log(`${sourceValue} in ${sourceMap.sourceName}`);
    const destinationName = sourceMap.destinationName;
    const nextMap = sourceMapMap.get(destinationName);
    if (!nextMap) throw new Error(`No source map for ${destinationName}`);

    sourceMap = sourceMap?.combine(nextMap);

    if (sourceMap.destinationName === 'location')
      return sourceMap;
  }
}

type PuzzleInput = {
  seeds: number[],
  sourceMapMap: Map<string, SourceMap>
}

export const locationForSeed = (seed: number, sourceMapMap: Map<string, SourceMap>): number => {
  let sourceMap = sourceMapMap.get('seed');
  if (!sourceMap) throw new Error(`No source map for seed`);
  let sourceValue = seed;

  while (true) {
    //console.log(`${sourceValue} in ${sourceMap.sourceName}`);
    const destinationName = sourceMap.destinationName;
    const destinationValue = sourceMap.destinationFor(sourceValue);

    if (sourceMap.destinationName === 'location')
      return destinationValue;

    sourceMap = sourceMapMap.get(sourceMap.destinationName);
    if (!sourceMap) throw new Error(`No source map for ${destinationName}`);
    sourceValue = destinationValue;
  }
}

export const parseInput = (input: string[]): PuzzleInput => {
  // Parse the seeds
  const seedsRe = /^seeds: (.*)$/;
  const match = input[0].match(seedsRe);
  if (!match) throw new Error(`Invalid seeds: ${input[0]}`);
  const seeds = match[1].split(/\s+/).map((n) => parseInt(n));

  // Parse the source maps
  const sourceMapText = input.slice(2);
  sourceMapText.push('');  // Add a blank line to the end to trigger the last source map parse

  let sourceMapBuffer: string[] = [];
  const sourceMapMap: Map<string, SourceMap> = new Map();

  sourceMapText.forEach((line, idx) => {
    if (line === '') {
      if (sourceMapBuffer.length === 0)
        throw new Error(`No source to parse on line ${idx}`);

      const sourceMap = SourceMap.fromText(sourceMapBuffer);
      sourceMapMap.set(sourceMap.sourceName, sourceMap);
      sourceMapBuffer = [];
    } else {
      sourceMapBuffer.push(line);
    }
  });

  return { seeds, sourceMapMap }
}

export class RangeMap {
  constructor(
    public destination: number,
    public source: number,
    public rangeLength: number
  ) {}

  get maxDestination(): number {
    return this.destination + this.rangeLength - 1;
  }

  get maxSource(): number {
    return this.source + this.rangeLength - 1;
  }

  isInRange(source: number): boolean {
    return source >= this.source && source < this.source + this.rangeLength;
  }

  destinationFor(source: number): number {
    if (!this.isInRange(source))
      throw new Error(`Source ${source} is not in range ${this.source}-${this.source + this.rangeLength}`);
    return this.destination + (source - this.source);
  }

  combine(destinationRangeMap: RangeMap): RangeMap[] {
    throw new Error('Not implemented');
  }

  isOverlapping(destinationRangeMap: RangeMap): boolean {
    return !(
      this.destination > destinationRangeMap.maxSource ||
      this.maxDestination < destinationRangeMap.source
    );
  };

  overlap(destinationRangeMap: RangeMap): RangeMap {
    if (!this.isOverlapping(destinationRangeMap))
      throw new Error(`Range maps do not overlap: ${this}-${destinationRangeMap}`);

    const minValue = Math.max(this.destination, destinationRangeMap.source);
    const maxValue = Math.min(this.maxDestination, destinationRangeMap.maxSource);
    const rangeLength = maxValue - minValue + 1;
    const sourceOffset = minValue > this.destination ? minValue - this.destination : 0;
    const destinationOffset = minValue > destinationRangeMap.source ? minValue - destinationRangeMap.source : 0;
    const offset = minValue - destinationRangeMap.source;
    return new RangeMap(
      destinationRangeMap.destination + destinationOffset,
      this.source + sourceOffset,
      rangeLength
    );
  }

  removeOverlap(overlap: RangeMap, isSource: boolean): RangeMap[] {
    // If it's a source, we are comparing the overlap to a destination
    const minOverlapValue = isSource ? overlap.source : overlap.destination;
    const maxOverlapValue = isSource ? overlap.maxSource : overlap.maxDestination;
    const minValue = isSource ? this.source : this.destination;
    const maxValue = isSource ? this.maxSource : this.maxDestination;

    let lhRangeMap: RangeMap | undefined;
    let rhRangeMap: RangeMap | undefined;
    if (minValue < minOverlapValue){
      const lh_offset = minOverlapValue - minValue;
      lhRangeMap = new RangeMap(
        this.destination,
        this.source,
        this.rangeLength - (maxValue - minOverlapValue + 1)
      );      
    }

    // TODO: this my be wrong
    if (maxValue > maxOverlapValue) {
      const rh_offset = maxOverlapValue - minValue + 1; 
      rhRangeMap = new RangeMap(
        this.destination + rh_offset,
        this.source + rh_offset,
        maxValue - maxOverlapValue
      );
    }

    const remainingRanges: RangeMap[] = [];
    if (lhRangeMap !== undefined) remainingRanges.push(lhRangeMap);
    if (rhRangeMap !== undefined) remainingRanges.push(rhRangeMap);

    return remainingRanges;
  }

  toString(): string {
    return `RangeMap (${this.source}-${this.maxSource}) -> (${this.destination}-${this.maxDestination})`;
  }
}

export class SourceMap {
  constructor(
    public sourceName: string,
    public destinationName: string,
    public rangeMaps: RangeMap[]
  ) {}

  destinationFor(source: number): number {
    const rangeMap = this.rangeMaps.find((rangeMap) => rangeMap.isInRange(source));
    if (rangeMap) return rangeMap.destinationFor(source);

    return source;
  }

  combine(otherSourceMap: SourceMap, justOverlaps=false): SourceMap {
    let source, destination: SourceMap;

    if (this.destinationName === otherSourceMap.sourceName) {
      source = this;
      destination = otherSourceMap;
    } else if (otherSourceMap.destinationName === this.sourceName) {
      source = otherSourceMap;
      destination = this;
    } else 
      throw new Error(`Cannot combine source maps ${this.destinationName} and ${otherSourceMap.sourceName}`);

    const rangeMaps: RangeMap[] = [];
    const sourceMaps = [...source.rangeMaps].sort((a, b) => a.destination - b.destination);
    const destinationMaps = [...destination.rangeMaps].sort((a, b) => a.source - b.source);

    let iterations = 0;
    while(sourceMaps.length > 0 && destinationMaps.length > 0) {
      // Take the next smallest source and destination
      const sourceMap = sourceMaps.shift()!;
      const destinationMap = destinationMaps.shift()!;
      // console.log(`sourceMap: ${sourceMap}, destinationMap: ${destinationMap}`);
      // iterations++;
      // if (iterations > 20) throw new Error('Too many iterations');

  
      if(sourceMap.destination > destinationMap.maxSource) {
        // The source maps are ordered by destination so all remaining are to the right
        if(!justOverlaps)
          rangeMaps.push(destinationMap);
        sourceMaps.unshift(sourceMap);
      } else if (destinationMap.source > sourceMap.maxDestination) {
        // The destination maps are ordered by source so all remaining are to the right
        if(!justOverlaps)
          rangeMaps.push(sourceMap);
        destinationMaps.unshift(destinationMap);
      } else if (sourceMap.isOverlapping(destinationMap)) {
        const overlap = sourceMap.overlap(destinationMap);
        const remainingSources = sourceMap.removeOverlap(overlap, true);
        const remainingDestinations = destinationMap.removeOverlap(overlap, false);
        rangeMaps.push(overlap);

        // console.log(`overlap: ${overlap}`);
        // console.log(`remainingSources: ${remainingSources}`);
        // console.log(`remainingDestinations: ${remainingDestinations}`);
        sourceMaps.unshift(...remainingSources);
        destinationMaps.unshift(...remainingDestinations);
      }
    }

    if(!justOverlaps) {
      // No more matching push remaining sources and destinations
      rangeMaps.push(...sourceMaps);
      rangeMaps.push(...destinationMaps);
    }


    return new SourceMap(
      source.sourceName,
      destination.destinationName,
      rangeMaps.sort((a, b) => a.source - b.source)
    );
  }

  static fromText(text: string[]): SourceMap {
    /* Text format:
     * seed-to-soil map:
     * 50 98 2
     * 52 50 48 */

    // Read the header
    const headerRe = /^(\w+)-to-(\w+) map:$/;
    const match = text[0].match(headerRe);
    if (!match) throw new Error(`Invalid header: ${text[0]}`);
    const [, sourceName, destinationName] = match;

    // Read the range maps
    const rangeMaps = text.slice(1).map((line) => {
      const [destination, source, rangeLength] = line.split(/\s+/).map((n) => parseInt(n));
      return new RangeMap(destination, source, rangeLength);
    });

    return new SourceMap(sourceName, destinationName, rangeMaps);
  }   
}