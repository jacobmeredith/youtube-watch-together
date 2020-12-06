import React from 'react';
import { render } from '@testing-library/react';

import Chat from './Chat';

const props = (overrides: any = {}) => ({
  user: 'user 1',
  messages: [],
  onMessageAdd: jest.fn(),
  ...overrides
});

const testMessages = [
  {
    id: '1',
    content: 'Lorem ipsul dolor sit amet 1',
    user: 'user 1',
  },
  {
    id: '2',
    content: 'Lorem ipsul dolor sit amet 2',
    user: 'user 2',
  },
  {
    id: '3',
    content: 'Lorem ipsul dolor sit amet 3',
    user: 'user 2'
  },
  {
    id: '4',
    content: 'Lorem ipsul dolor sit amet 4',
    user: 'user 1',
  },
];

test('should render an empty chat', () => {
  const { container } = render(<Chat {...props()} />);
  expect(container.querySelectorAll('.message').length).toBe(0);
});

test('should render messages in the chat', () => {
  const { getByText } = render(<Chat {...props({ messages: testMessages })} />);

  const messageOne = getByText('Lorem ipsul dolor sit amet 1');
  const messageTwo = getByText('Lorem ipsul dolor sit amet 2');
  const messageThree = getByText('Lorem ipsul dolor sit amet 3');
  const messageFour = getByText('Lorem ipsul dolor sit amet 4');

  expect(messageOne).toBeInTheDocument();
  expect(messageTwo).toBeInTheDocument();
  expect(messageThree).toBeInTheDocument();
  expect(messageFour).toBeInTheDocument();
});
