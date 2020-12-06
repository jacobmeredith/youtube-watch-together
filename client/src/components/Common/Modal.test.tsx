import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

const props = (overrides: any = {}) => ({
  isOpen: false,
  ...overrides
});

test('should not render modal by default', () => {
  const { container } = render(<Modal {...props()} />);
  expect(container.querySelector('.modal')).toBe(null);
});

test('should render modal', () => {
  const { container } = render(<Modal {...props({ isOpen: true })} />);
  expect(container.querySelector('.modal--open')).toBeInTheDocument();
});
