/**
 * 'wait' 밀리초 후에 'func'를 호출합니다.
 *
 * @param {Function} func 호출할 함수.
 * @param {number} wait 지연할 밀리초.
 * @param {...*} [args] 함수에 전달할 인수.
 * @returns {number} 타이머 ID.
 * @example
 *
 * delay(text => console.log(text), 1000, 'later')
 * // => Logs 'later' after one second.
 */

// wait 값이 0이여도 setTimeout에서 1보다 작으면 1로 설정하는데 기본값 0이 의미가 있나...?
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
const delay = (func: Function, wait = 0, ...args: any[]) => {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  return setTimeout(func, +wait, ...args);
};

export default delay;
