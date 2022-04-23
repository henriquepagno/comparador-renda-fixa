import React, { ReactElement, useCallback } from 'react';

import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';

import IconLink from '../IconLink';
import Switch from '../Switch';

import { Theme } from '../../common/enums/Theme';

import { useConfig } from '../../hookStore/Config';

import styles from './Header.module.scss';

export default function Header(): ReactElement {
  const { theme, storeTheme, getClassWithTheme } = useConfig();

  const titleClasses = getClassWithTheme(
    styles['title'],
    styles['title--light']
  );

  const subtitleClasses = getClassWithTheme(
    styles['subtitle'],
    styles['subtitle--light']
  );

  const iconClasses = getClassWithTheme(styles['icon'], styles['icon--light']);

  const handleThemeChange = useCallback(() => {
    if (theme == Theme.Dark) {
      storeTheme(Theme.Light);
    } else {
      storeTheme(Theme.Dark);
    }
  }, [storeTheme, theme]);

  return (
    <header className={styles['header']}>
      <div className={styles['title-container']}>
        <h1 className={titleClasses}>Comparador de Renda Fixa</h1>
        <h2 className={subtitleClasses}>
          Adicione opções de investimento de renda fixa e compare-os em um
          gráfico.
        </h2>
      </div>

      <div className={styles['actions']}>
        <Switch
          uncheckedIcon={<IoIosSunny size={16} />}
          checkedIcon={<IoIosMoon size={16} />}
          value={theme == Theme.Dark ? false : true}
          handleSwitchClick={handleThemeChange}
        />
        <ul className={styles['external-links__list']}>
          <li>
            <IconLink
              url="https://github.com/henriquepagno/comparador-renda-fixa"
              icon={<AiFillGithub className={iconClasses} />}
            />
          </li>
          <li>
            <IconLink
              url="https://www.linkedin.com/in/henrique-pagno-de-lima/"
              icon={<AiFillLinkedin className={iconClasses} />}
            />
          </li>
        </ul>
      </div>
    </header>
  );
}
