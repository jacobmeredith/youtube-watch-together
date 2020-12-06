import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Room from './Room';

const props = (overrides: any = {}) => ({
  match: {
    params: {
      id: '12345'
    }
  },
  room: 'room 1',
  user: 'user 1',
  messages: [],
  onJoinRoom: jest.fn,
  onCreateMessage: jest.fn,
  ...overrides
});

test('should render chat', () => {
  const { container } = render(<Room {...props()} />);
  expect(container.querySelector('.chat')).toBeInTheDocument();
});

test('should call onCreateMessage prop when submitting a message', () => {
  const mockedFunction = jest.fn();
  const { container, getByPlaceholderText } = render(<Room {...props({ onCreateMessage: mockedFunction })} />);
  const form: any = container.querySelector('form.chat-input');
  const input = getByPlaceholderText('Enter a message');

  fireEvent.input(input, { target: { value: 'My message' } });
  fireEvent.submit(form);

  expect(mockedFunction).toHaveBeenCalled();
});

test('should call onJoinRoom prop when joining a room', () => {
  const mockedFunction = jest.fn();
  const { container, getByPlaceholderText } = render(<Room {...props({ room: null, user: null, onJoinRoom: mockedFunction })} />);
  const form: any = container.querySelector('form');
  const input = getByPlaceholderText('Enter your nick name');

  fireEvent.input(input, { target: { value: 'username' } });
  fireEvent.submit(form);

  expect(mockedFunction).toHaveBeenCalled();
});
