import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '../src/components/Header';
import AppProvider from '../src/hookStore';

describe('Test', () => {
  it('renders a heading', () => {
    render(
      <AppProvider>
        <Header />
      </AppProvider>
    );
    console.log('teste');
    const heading = screen.getByRole('heading', {
      name: 'Comparador de Renda Fixa',
    });

    expect(heading).toBeInTheDocument();
  });
});
