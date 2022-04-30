import React, { ReactElement } from 'react';

import Header from '../components/Header';
import InvestmentOptionModal from '../components/InvestmentOptionModal';

import { useConfig } from '../hookStore/Config';

import styles from './layout.module.scss';

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { getClassWithTheme } = useConfig();

  const classes = getClassWithTheme(
    styles['content'],
    styles['content--light']
  );

  return (
    <>
      <div className={classes}>
        <Header />
        <main className={styles['page-content']}>{children}</main>
      </div>
      <InvestmentOptionModal />
    </>
  );
}
