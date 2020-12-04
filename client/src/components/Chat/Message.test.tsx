import React from 'react';
import { render } from '@testing-library/react';
import Message from './Message';

const props = (overrides: any = {}) => ({
  content: 'This is a message',
  ...overrides
});

test('renders text in message', () => {
  const { getByText } = render(<Message {...props()} />);
  expect(getByText('This is a message')).toBeInTheDocument();
});
