import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App from './App';

const socketMock: any = jest.mock('socket.io-client');

act(() => {
  socketMock.default = () => {
    return {
      io: () => {
        return {
          on: (type: string, callback: any) => {
            console.log(type);
          }
        }
      }
    }
  }
});

const props = (overrides: any = {}) => ({
  initialState: null,
  ...overrides
});

test('should render home by default', () => {
  const { getByPlaceholderText, getByText } = render(<App {...props()} />);
  const nicknameInput = getByPlaceholderText('Enter your nick name');
  const createButton = getByText('Create room');
  expect(nicknameInput).toBeInTheDocument();
  expect(createButton).toBeInTheDocument();
});

test('should redirect to render room', () => {
  const { container } = render(<App {...props({ initialState: { messages: [], user: 'user 1', room: 'room 1', connection: null} })} />);
  expect(container.querySelector('.chat')).toBeInTheDocument();
});

test('should render room page if room is created', () => {
  const { container, getByPlaceholderText } = render(<App {...props()} />);
  const nicknameInput = getByPlaceholderText('Enter your nick name');
  const form: any = container.querySelector('form');

  fireEvent.input(nicknameInput, { target: { value: 'user 1' }});
  fireEvent.submit(form);

  expect(container.querySelector('.chat')).toBeInTheDocument();
});
