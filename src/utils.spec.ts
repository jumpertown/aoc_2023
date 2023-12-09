import { counter } from './utils';

describe('counter', () => {
  it('should return the correct counts', () => {
    const result = counter(['a', 'b', 'a', 'c', 'a', 'b']);
    expect(result).toEqual(new Map([
      ['a', 3],
      ['b', 2],
      ['c', 1],
    ]));
  });
});
