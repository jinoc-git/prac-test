import { render, fireEvent, screen } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  const renderComponent = () => {
    render(<Counter />);

    const increaseButton = screen.getByText(/increment/i);
    const countText = screen.getByTestId(/count/i);

    return { increaseButton, countText };
  };

  it('should render default count `0`', () => {
    const { countText } = renderComponent();

    expect(countText.textContent).toBe('Clicked 0 times');
    // expect(countText.textContent).toMatch(/0/i);
  });

  it('should increase count when button is clicked', () => {
    const { countText, increaseButton } = renderComponent();

    fireEvent.click(increaseButton);
    expect(countText.textContent).toBe('Clicked 1 time');

    fireEvent.click(increaseButton);
    expect(countText.textContent).toBe('Clicked 2 times');
  });

  it('should changes document title when checkbox is checked', () => {
    const originTitle = document.title;
    const { increaseButton } = renderComponent();
    // console.log(document.title);

    fireEvent.click(increaseButton);
    expect(document.title).toBe(originTitle);

    const checkbox = screen.getByLabelText(
      /check to display count in document title/i
    );
    fireEvent.click(checkbox);
    expect(document.title).toBe('Total number of clicks: 1');

    fireEvent.click(increaseButton);
    expect(document.title).toBe('Total number of clicks: 2');

    fireEvent.click(checkbox);
    expect(document.title).toBe(originTitle);
  });
});
