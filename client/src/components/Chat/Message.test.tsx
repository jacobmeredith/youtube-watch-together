import React from 'react';
import { render } from '@testing-library/react';

import Message from './Message';

const props = (overrides: any = {}) => ({
  user: 'user 1',
  from: 'user 2',
  content: 'This is a message',
  ...overrides
});

test('should render text in the message', () => {
  const { getByText } = render(<Message {...props()} />);
  expect(getByText('This is a message')).toBeInTheDocument();
});

test('should render my message with modifier', () => {
  const { getByText } = render(<Message {...props({ from: 'user 1'  })} />);
  const myMessage = getByText('This is a message');
  expect(myMessage.className.includes('message--user')).toBe(true);
});

test('should render others messages with modifier', () => {
  const { getByText } = render(<Message {...props()} />);
  const myMessage = getByText('This is a message');
  expect(myMessage.className.includes('message--from')).toBe(true);
});
