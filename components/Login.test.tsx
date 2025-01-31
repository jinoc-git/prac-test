import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Login from './Login';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Login', () => {
  afterEach(() => {
    localStorage.clear();
  });

  const renderComponent = () => {
    mockedAxios.post.mockImplementation((url: string, data?: unknown) => {
      const body = data as { username: string; password: string };
      if (body.username === 'john' && body.password === '123123') {
        const fakeUserResponse = { token: 'fake_user_token' };
        const response = { data: fakeUserResponse };
        return Promise.resolve(response);
      } else {
        return Promise.reject({ message: 'Unauthorized', status: 401 });
      }
    });

    render(<Login />);

    const usernameInput = screen.getByLabelText(
      /username/i
    ) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /submit/i });

    const fill = (name: string, password: string) => {
      // act(() => {
      fireEvent.change(usernameInput, { target: { value: name } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.click(submitButton);
      // });
    };

    return { usernameInput, passwordInput, submitButton, fill };
  };

  it('should change disabled submit button when form status', async () => {
    const { fill, submitButton } = renderComponent();

    fill('john', '123123');

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should render resolve text when login is successed', async () => {
    const { fill } = renderComponent();

    fill('john', '123123');

    expect(await screen.findByText(/congrats/i)).toBeInTheDocument();
  });

  it('should save token when login is successed', async () => {
    const { fill } = renderComponent();

    fill('john', '123123');

    await waitFor(() => {
      const token = localStorage.getItem('token');
      expect(token).toBe('fake_user_token');
    });
  });

  it('should render error text when login is failed', async () => {
    const { fill } = renderComponent();

    fill('john', '123456');

    expect(await screen.findByText(/unauthorized/i)).toBeInTheDocument();
  });

  it('should not save token when login is failed', async () => {
    const { fill } = renderComponent();

    fill('john', '123456');

    await waitFor(() => {
      const token = localStorage.getItem('token');
      expect(token).toBeNull();
    });
  });

  it('should render server error message', async () => {
    const { fill } = renderComponent();
    mockedAxios.post.mockRejectedValue({
      message: 'server error',
      status: 500,
    });

    fill('john', '123123');

    expect(await screen.findByText(/server error/i)).toBeInTheDocument();
  });
});
