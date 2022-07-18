import React from 'react';
import { renderWithProvider, screen } from 'test-utils';

import Header from '../../src/components/Header';

describe('Header Component', () => {
  it('renders app title', () => {
    renderWithProvider(<Header />);

    const heading = screen.getByRole('heading', {
      name: 'Comparador de Renda Fixa',
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders theme switch', () => {
    renderWithProvider(<Header />);

    const switchDiv = screen.getByRole('button', { name: /switch/i });

    expect(switchDiv).toBeInTheDocument();
  });

  it('renders github link', () => {
    renderWithProvider(<Header />);

    const link = screen.getByRole('link', {
      name: /github/i,
    });

    expect(link).toHaveAttribute(
      'href',
      'https://github.com/henriquepagno/comparador-renda-fixa'
    );
  });

  it('renders linkedin link', () => {
    renderWithProvider(<Header />);

    const link = screen.getByRole('link', {
      name: /linkedin/i,
    });

    expect(link).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/henrique-pagno-de-lima/'
    );
  });
});
