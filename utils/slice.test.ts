import slice from './slice';

describe('slice', () => {
  const array = [1, 2, 3];

  // slice 함수에 start, end 인자가 주어지지 않았을 때 start는 0, end는 길이로 사용하는지 확인
  it('should use a default `start` of `0` and a default `end` of `length`', () => {
    const actual = slice(array);
    expect(actual).toEqual(array); // 값이 같은지 확인
    expect(actual).not.toBe(array); // 참조가 다른지 (새로운 배열인지)
  });

  // 양수의 start 값이 들어왔을 때
  it('should work with a positive `start`', () => {
    expect(slice(array, 1)).toEqual([2, 3]);
    expect(slice(array, 1, 3)).toEqual([2, 3]);
  });

  // start 값이 배열의 길이 이상일 때
  it.each([3, 4, 2 ** 32, Infinity])(
    'should work with a `start` >= `length`',
    (start) => {
      expect(slice(array, start)).toEqual([]);
    }
  );

  // 음수의 start 값일 때
  it('should work with a negative `start`', () => {
    expect(slice(array, -1)).toEqual([3]);
  });

  // 절대값이 길이 이상인 음수의 start 값일 때
  it.each([-3, -4, -Infinity])(
    'should work with a negative `start` <= negative `length`',
    (start) => {
      expect(slice(array, start)).toEqual(array);
    }
  );

  // start 값이 end 값 이상일 때
  it.each([2, 3])('should work with `start` >= `end`', (start) => {
    expect(slice(array, start, 2)).toEqual([]);
  });

  // 양수의 end 값일 때
  it('should work with a positive `end`', () => {
    expect(slice(array, 0, 1)).toEqual([1]);
  });

  // end 값이 배열의 길이 이상일 때
  it.each([3, 4, 2 ** 32, Infinity])(
    'should work with a `end` >= `length`',
    (end) => {
      expect(slice(array, 0, end)).toEqual(array);
    }
  );

  // 음수의 end 값일 때
  it('should work with a negative `end`', () => {
    expect(slice(array, 0, -1)).toEqual([1, 2]);
  });

  // 절대값이 길이 이상인 음수의 end 값일 때
  it.each([-3, -4, -Infinity])(
    'should work with a negative `end` <= negative `length`',
    (end) => {
      expect(slice(array, 0, end)).toEqual([]);
    }
  );
});
