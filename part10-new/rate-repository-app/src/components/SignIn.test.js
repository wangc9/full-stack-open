import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { SignInContainer } from './SignIn';
// ...

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      const username = screen.getByTestId('username');
      const password = screen.getByTestId('password');
      const button = screen.getByTestId('submit');

      fireEvent.changeText(username, 'elain');
      fireEvent.changeText(password, 'password');
      fireEvent.press(button);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          Username: 'elain',
          Password: 'password',
        });
      });
    });
  });
});
