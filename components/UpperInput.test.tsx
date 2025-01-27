import { fireEvent, render, screen } from '@testing-library/react';
import UpperInput from './UpperInput';

test('sets the value to the upper version of the value', async () => {
  render(<UpperInput />);
  // const upperInput = screen.getByLabelText(/upper/i);
  const upperInput = screen.getByLabelText(/upper/i) as HTMLInputElement;

  const value = 'stuff';
  fireEvent.change(upperInput, { target: { value } });

  expect(upperInput.value).toEqual(value.toUpperCase());
  // expect(upperInput).toHaveTextContent(value.toUpperCase());
});
