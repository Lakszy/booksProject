import CartItem from '../components/Cart/CartItem/CartItem';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock props
const mockItem = {
  id: '1',
  name: 'Sample Item',
  media: { source: 'sample-image.jpg' },
  line_total: { formatted_with_symbol: '$10.00' },
  quantity: 2,
};

const mockUpdateCartQty = jest.fn();
const mockRemoveFromCart = jest.fn();

const mockProps = {
  item: mockItem,
  onUpdateCartQty: mockUpdateCartQty,
  onRemoveFromCart: mockRemoveFromCart,
};

test('renders CartItem component', () => {
  render(<CartItem {...mockProps} />);

  // Check if the component renders the item name and total
  expect(screen.getByText('Sample Item')).toBeTruthy();
  expect(screen.getByText('$10.00')).toBeTruthy();
});

test('calls onUpdateCartQty when "-" button is clicked', () => {
  render(<CartItem {...mockProps} />);

  // Find the "-" button and click it
  fireEvent.click(screen.getByRole('button', { name: /-/i }));

  // Check if onUpdateCartQty is called with the correct arguments
  expect(mockUpdateCartQty).toHaveBeenCalledWith('1', 1);
});

test('calls onUpdateCartQty when "+" button is clicked', () => {
  render(<CartItem {...mockProps} />);

  // Find the "+" button and click it
  fireEvent.click(screen.getByRole('button', { name: /\+/i }));

  expect(mockUpdateCartQty).toHaveBeenCalledWith('1', 3);
});

test('calls onRemoveFromCart when "Remove" button is clicked', () => {
  render(<CartItem {...mockProps} />);

  fireEvent.click(screen.getByRole('button', { name: /remove/i }));

  
  expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
});
