import React from 'react';
import { render } from '@testing-library/react';

import Container from './Container';

const props = (overrides: any = {}) => ({
  messages: [],
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

test('renders empty container', () => {
  const { container } = render(<Container {...props()} />);
  expect(container.querySelectorAll('.message').length).toBe(0);
});

test('renders all messages', () => {
  const { getByText } = render(<Container {...props({ messages: testMessages })} />);

  const messageOne = getByText('Lorem ipsul dolor sit amet 1');
  const messageTwo = getByText('Lorem ipsul dolor sit amet 2');
  const messageThree = getByText('Lorem ipsul dolor sit amet 3');
  const messageFour = getByText('Lorem ipsul dolor sit amet 4');

  expect(messageOne).toBeInTheDocument();
  expect(messageTwo).toBeInTheDocument();
  expect(messageThree).toBeInTheDocument();
  expect(messageFour).toBeInTheDocument();
});
