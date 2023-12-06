import { RangeMap, SourceMap, locationForSeed, parseInput, solveDay5Part1, solveDay5Part2 } from './day5';

const testInput = [
  'seeds: 79 14 55 13',
  '',
  'seed-to-soil map:',
  '50 98 2',
  '52 50 48',
  '',
  'soil-to-fertilizer map:',
  '0 15 37',
  '37 52 2',
  '39 0 15',
  '',
  'fertilizer-to-water map:',
  '49 53 8',
  '0 11 42',
  '42 0 7',
  '57 7 4',
  '',
  'water-to-light map:',
  '88 18 7',
  '18 25 70',
  '',
  'light-to-temperature map:',
  '45 77 23',
  '81 45 19',
  '68 64 13',
  '',
  'temperature-to-humidity map:',
  '0 69 1',
  '1 0 69',
  '',
  'humidity-to-location map:',
  '60 56 37',
  '56 93 4',
]


describe('solveDay5Part1', () => {
  it('should return the correct result', () => {
    const result = solveDay5Part1(testInput);
    expect(result).toEqual(35);
  });
});

describe('solveDay5Part2', () => {
  it.only('should return the correct result', () => {
    const result = solveDay5Part2(testInput);
    expect(result).toEqual(46);
  });
});


describe('RangeMap', () => {
  describe('isInRange', () => {
    it('should match start', () => {
      const rangeMap = new RangeMap(25, 16, 3);
      expect(rangeMap.isInRange(16)).toBe(true);
    });
    it('should match end', () => {
      const rangeMap = new RangeMap(25, 16, 3);
      expect(rangeMap.isInRange(18)).toBe(true);
    });
    it('should match middle', () => {
      const rangeMap = new RangeMap(25, 16, 3);
      expect(rangeMap.isInRange(17)).toBe(true);
    });
    it('should not match outside', () => {
      const rangeMap = new RangeMap(25, 16, 3);
      expect(rangeMap.isInRange(19)).toBe(false);
    });
  });

  describe('destinationFor', () => {
    it('should return the correct destination', () => {
      const rangeMap = new RangeMap(25, 16, 3);
      expect(rangeMap.destinationFor(16)).toEqual(25);
      expect(rangeMap.destinationFor(17)).toEqual(26);
      expect(rangeMap.destinationFor(18)).toEqual(27);
    });
    it('should throw an error when source is outside of range', () => {
      const rangeMap = new RangeMap(25, 16, 3);
      expect(() => rangeMap.destinationFor(15)).toThrow();
      expect(() => rangeMap.destinationFor(19)).toThrow();
    });
  });

  describe('isOverlapping', () => {
    it('should return true when overlapping', () => {
      const source = new RangeMap(50, 98, 2);
      const destination = new RangeMap(0, 15, 37);
      expect(source.isOverlapping(destination)).toBe(true);
    });
    it('should return false when not overlapping', () => {
      const source = new RangeMap(50, 98, 2);
      const destination = new RangeMap(0, 13, 37);
      expect(source.isOverlapping(destination)).toBe(false);
    });
  });

  describe('overlap', () => {
    it('should return the overlapping region', () => {
      const source = new RangeMap(50, 98, 2);
      const destination = new RangeMap(0, 15, 37);
      const expected = new RangeMap(35, 98, 2);
      expect(source.overlap(destination)).toEqual(expected);
    });
    it('should throw an error when not overlapping', () => {
      const source = new RangeMap(50, 98, 2);
      const destination = new RangeMap(0, 13, 37);
      expect(() => source.overlap(destination)).toThrow();
    });
  });

  describe('removeOverlap', () => {
    it('should return the remaining regions of a source', () => {
      const source = new RangeMap(50, 98, 2);
      const overlap = new RangeMap(35, 98, 2);
      const expected: RangeMap[] = [];
      expect(source.removeOverlap(overlap, true)).toEqual(expected);
    });
    it('should return the remaining regions of a destination', () => {
      const destination = new RangeMap(0, 15, 37);
      const overlap = new RangeMap(35, 98, 2);
      const expected = [new RangeMap(0, 15, 35)];
      expect(destination.removeOverlap(overlap, false)).toEqual(expected);
    });
    it('should return two regions if overlap is within range', () => {
      const source = new RangeMap(50, 90, 10);
      const overlap = new RangeMap(35, 93, 3);
      const expected: RangeMap[] = [new RangeMap(50, 90, 3), new RangeMap(56, 96, 4)];
      expect(source.removeOverlap(overlap, true)).toEqual(expected);
    });
  });
});

describe('SourceMap', () => {

  describe('destinationFor', () => {
    it('should return the correct for source in range', () => {
      const sourceMap = new SourceMap('seed', 'soil', [
        new RangeMap(50, 98, 2),
        new RangeMap(52, 50, 48),
      ]);
      expect(sourceMap.destinationFor(99)).toEqual(51);
      expect(sourceMap.destinationFor(53)).toEqual(55);
    });
    it('should return the source if not in the ranges', () => {
      const sourceMap = new SourceMap('seed', 'soil', [
        new RangeMap(50, 98, 2),
        new RangeMap(52, 50, 48),
      ]);
      expect(sourceMap.destinationFor(48)).toEqual(48);
    });
  });

  describe('combine', () => {
    it('should flatten two source maps into one combined map', () => {
      const seedMap = new SourceMap('seed', 'soil', [
        new RangeMap(50, 98, 2),
        new RangeMap(52, 50, 48),
      ]);
      const soilMap = new SourceMap('soil', 'fertilizer', [
        new RangeMap(39, 0, 15),
        new RangeMap(0, 15, 37),
        new RangeMap(37, 52, 2),
      ]);
      const expected = new SourceMap('seed', 'fertilizer', [
        new RangeMap(39, 0, 15),
        new RangeMap(0, 15, 35),
        new RangeMap(37, 50, 2),
        new RangeMap(54, 52, 46),
        new RangeMap(35, 98, 2),
      ]);
      console.log(seedMap.combine(soilMap));
      console.log(soilMap.combine(seedMap));
      expect(seedMap.combine(soilMap)).toEqual(expected);
      expect(seedMap.combine(soilMap)).toEqual(expected);
    });

  });

  describe('fromText', () => {
    it('should parse a source map', () => {
      const text = [
        'seed-to-soil map:',
        '50 98 2',
        '52 50 48',
      ];
      const expectedSourceMap = new SourceMap('seed', 'soil', [
        new RangeMap(50, 98, 2),
        new RangeMap(52, 50, 48),
      ]);
      expect(SourceMap.fromText(text)).toEqual(expectedSourceMap);
    });
  });
});

describe('parseInput', () => {
  it('should parse the input', () => {
    const expectedSourceMaps = new Map<string, SourceMap>([
      ['seed', new SourceMap('seed', 'soil', [
        new RangeMap(50, 98, 2),
        new RangeMap(52, 50, 48),
      ])],
      ['soil', new SourceMap('soil', 'fertilizer', [
        new RangeMap(0, 15, 37),
        new RangeMap(37, 52, 2),
        new RangeMap(39, 0, 15),
      ])],
      ['fertilizer', new SourceMap('fertilizer', 'water', [
        new RangeMap(49, 53, 8),
        new RangeMap(0, 11, 42),
        new RangeMap(42, 0, 7),
        new RangeMap(57, 7, 4),
      ])],
      ['water', new SourceMap('water', 'light', [
        new RangeMap(88, 18, 7),
        new RangeMap(18, 25, 70),
      ])],
      ['light', new SourceMap('light', 'temperature', [
        new RangeMap(45, 77, 23),
        new RangeMap(81, 45, 19),
        new RangeMap(68, 64, 13),
      ])],
      ['temperature', new SourceMap('temperature', 'humidity', [
        new RangeMap(0, 69, 1),
        new RangeMap(1, 0, 69),
      ])],
      ['humidity', new SourceMap('humidity', 'location', [
        new RangeMap(60, 56, 37),
        new RangeMap(56, 93, 4),
      ])],
    ]);
    expect(parseInput(testInput)).toEqual(
      {
        seeds: [79, 14, 55, 13],
        sourceMapMap: expectedSourceMaps,
      });
  });
});

describe('locationForSeed', () => {
  it('should return the correct location', () => {
    const { sourceMapMap } = parseInput(testInput);
    expect(locationForSeed(79, sourceMapMap)).toEqual(82);
    expect(locationForSeed(14, sourceMapMap)).toEqual(43);
    expect(locationForSeed(55, sourceMapMap)).toEqual(86);
    expect(locationForSeed(13, sourceMapMap)).toEqual(35);
  });
});

