import React, { ReactElement } from 'react';

import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

import IconLink from '../IconLink';

import styles from './Header.module.scss';

export default function Header(): ReactElement {
  return (
    <header className={styles['header']}>
      <div className={styles['title-container']}>
        <h1 className={styles['title']}>Comparador Renda Fixa</h1>
        <h2 className={styles['subtitle']}>
          Adicione opções de investimento de renda fixa e compare-os em um
          gráfico.
        </h2>
      </div>

      <ul className={styles['external-links__list']}>
        <li>
          <IconLink
            url="https://github.com/henriquepagno/comparador-renda-fixa"
            icon={<AiFillGithub className={styles['icon']} />}
          />
        </li>
        <li>
          <IconLink
            url="https://www.linkedin.com/in/henrique-pagno-de-lima/"
            icon={<AiFillLinkedin className={styles['icon']} />}
          />
        </li>
      </ul>
    </header>
  );
}
