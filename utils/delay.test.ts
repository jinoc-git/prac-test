import delay from './delay';

describe('delay', () => {
  it('should run callback func after delay', (done) => {
    let ok = false;

    delay(() => {
      ok = true;
    }, 30);

    setTimeout(() => {
      expect(ok).toBe(false);
    }, 10);

    setTimeout(() => {
      expect(ok).toBe(true);
      done();
    }, 50);
  });

  // it('should use a default `wait` of `0`', (done) => {
  //   let ok = false;

  //   delay(() => {
  //     ok = true;
  //   });

  //   setTimeout(() => {
  //     expect(ok).toBe(true);
  //     done();
  //   }, 0);
  // });

  it('should be cancel', (done) => {
    let ok = true;
    const timer = delay(() => {
      ok = false;
    }, 30);

    clearTimeout(timer);

    setTimeout(() => {
      expect(ok);
      done();
    }, 10);
  });

  it('should `func` called with args', (done) => {
    const mockFunc = jest.fn();

    delay(mockFunc, 10, 'abc', 123);

    setTimeout(() => {
      expect(mockFunc).toHaveBeenCalledWith('abc', 123);
      done();
    }, 30);
  });
});
