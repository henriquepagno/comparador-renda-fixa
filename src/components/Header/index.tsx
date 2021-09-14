import React, { ReactElement } from 'react';

import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

import IconLink from '../IconLink';

import styles from './Header.module.scss';

export default function Header(): ReactElement {
  return (
    <header className={styles['header']}>
      <h1 className={styles['title']}>Comparador Renda Fixa</h1>

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
