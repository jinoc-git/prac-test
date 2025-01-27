import { render, waitFor, fireEvent } from '@testing-library/react';
import MyInput from './MyInput';

describe('MyInput', () => {
  it('should render correctly', () => {
    const wrapper = render(<MyInput />);
    // wrapper.unmount() 함수를 호출해도 에러가 발생하지 않는지 확인합니다.
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it('should clear the value and onClear is triggered', async () => {
    // 필요하다면 jest mock 함수나 ref를 생성합니다.
    const onClear = jest.fn();
    const { getByRole, getByDisplayValue } = render(
      <MyInput isClearable onClear={onClear} />
    );

    // clearButton을 클릭합니다.
    const clearButton = getByRole('button'); // nextui의 input에 isClearable 속성을 추가하면 버튼이 생김
    fireEvent.click(clearButton);

    // input 요소의 값이 ""인지 확인합니다.
    // onClear 함수가 한 번 호출되었는지 확인합니다.
    await waitFor(() => {
      expect(getByDisplayValue('')).toBeTruthy();
      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });
});
