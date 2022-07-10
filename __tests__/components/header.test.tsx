import React from 'react';
import { renderWithProvider, screen } from 'test-utils';

import Header from '../../src/components/Header';

describe('Test header', () => {
  it('renders a heading', () => {
    renderWithProvider(<Header />);

    const heading = screen.getByRole('heading', {
      name: 'Comparador de Renda Fixa',
    });

    expect(heading).toBeInTheDocument();
  });
});
