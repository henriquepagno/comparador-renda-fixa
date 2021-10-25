import React, { ReactElement } from 'react';

import Header from '../components/Header';
import InvestmentOptionModal from '../components/InvestmentOptionModal';

import styles from './layout.module.scss';

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <>
      <div className={styles['content']}>
        <Header />
        <main className={styles['page-content']}>{children}</main>
      </div>
      <InvestmentOptionModal />
    </>
  );
}
