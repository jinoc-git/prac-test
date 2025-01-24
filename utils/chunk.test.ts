import chunk from './chunk';

describe('chunk', () => {
  const arr = [0, 1, 2, 3, 4, 5];

  it('should return chunked arrays', () => {
    const actual = chunk(arr, 3);
    expect(actual).toEqual([
      [0, 1, 2],
      [3, 4, 5],
    ]);
  });

  it('should return the last chunk as remaining elements', () => {
    const actual = chunk(arr, 4);
    expect(actual).toEqual([
      [0, 1, 2, 3],
      [4, 5],
    ]);
  });

  it('should coerce `size` to an integer', () => {
    expect(chunk(arr, arr.length / 4)).toEqual([[0], [1], [2], [3], [4], [5]]);
  });

  it('should coerce `size` to an less than 1 integer', () => {
    expect(chunk(arr, arr.length / 7)).toEqual([]);
  });

  it('should coerce `size` to negative', () => {
    expect(chunk(arr, -2)).toEqual([]);
  });

  it('should coerce `size` to an infinity', () => {
    expect(chunk(arr, Infinity)).toEqual([[0, 1, 2, 3, 4, 5]]);
  });

  it('should coerce `size` to negative infinity', () => {
    expect(chunk(arr, -Infinity)).toEqual([]);
  });
});
