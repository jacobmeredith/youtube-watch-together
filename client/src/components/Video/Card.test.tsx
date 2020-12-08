import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Card from './Card';

const props = (overrides: any = {}) => ({
  id: '123456',
  thumbnail: 'https://placehold.it/500x300',
  title: 'Video title',
  onClick: jest.fn(),
  ...overrides
});

test('should render a card component', () => {
  const { container } = render(<Card {...props()} />);
  expect(container.querySelector('.card')).toBeInTheDocument();
});

test('should call onVideoChange prop when card is clicked', () => {
  const mockFunction = jest.fn();
  const { container } = render(<Card {...props({ onClick: mockFunction })} />);
  const card: any = container.querySelector('.card');
  fireEvent.click(card);
  expect(mockFunction).toHaveBeenCalled();
});
