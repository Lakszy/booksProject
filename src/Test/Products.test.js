import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductView from '../components/ProductView/ProductView';
import { commerce } from '../../lib/commerce';

jest.mock('../lib/commerce.js', () => ({
  commerce: {
    products: {
      retrieve: jest.fn(),
    },
  },
}));

describe('ProductView Component', () => {
  test('renders product details correctly', async () => {
    // Mock the response for the product
    const mockedProduct = {
      id: '1',
      name: 'Sample Product',
      price: { formatted_with_symbol: '$20.00' },
      media: { source: 'sample-image.jpg' },
      quantity: 5,
      description: '<p>This is a sample product description.</p>',
    };
    
    commerce.products.retrieve.mockResolvedValueOnce(mockedProduct);

    render(<ProductView />);

    // Wait for the product details to be displayed
    await screen.findByText('Sample Product');
    await screen.findByText('$20.00');
    await screen.findByText('This is a sample product description.');

    // Check if the product details are rendered correctly
    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
    expect(screen.getByText('This is a sample product description.')).toBeInTheDocument();
  });
});
