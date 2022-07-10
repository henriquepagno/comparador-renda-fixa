import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '../../src/components/Header/index';

describe('Test header', () => {
  it('renders a heading', () => {
    render(
      <AppProvider>
        <Header />
      </AppProvider>
    );

    const heading = screen.getByRole('heading', {
      name: 'Comparador de Renda Fixa',
    });

    expect(heading).toBeInTheDocument();
  });
});
