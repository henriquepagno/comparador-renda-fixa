import React, { useState, ReactElement, ReactNode, useEffect } from 'react';
import clsx from 'clsx';

import { Theme } from '../../common/enums/Theme';

import { useConfig } from '../../hookStore/Config';

import styles from './Switch.module.scss';

interface ISwitch {
  uncheckedIcon?: ReactNode;
  checkedIcon?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  handleSwitchClick(e: boolean): void;
  value: boolean;
}

export default function Switch({
  uncheckedIcon,
  checkedIcon,
  handleSwitchClick,
  value,
}: ISwitch): ReactElement {
  const [checked, setChecked] = useState(value);
  const { getClassWithTheme, theme } = useConfig();

  const containerClasses = getClassWithTheme(
    styles['container'],
    styles['container--light']
  );

  const uncheckedIconClasses = clsx(
    styles['icon'],
    !checked && styles['icon--invisible'],
    theme == Theme.Light && styles['icon--light']
  );

  const checkedIconClasses = clsx(
    styles['icon'],
    checked && styles['icon--invisible'],
    theme == Theme.Light && styles['icon--light']
  );

  const handleClasses = clsx(
    styles['handle'],
    checked && styles['handle--checked']
  );

  const handleClick = () => {
    handleSwitchClick(!checked);
  };

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <button
      className={containerClasses}
      onClick={handleClick}
      aria-label="switch"
    >
      <div className={uncheckedIconClasses}>{uncheckedIcon}</div>
      <div className={checkedIconClasses}>{checkedIcon}</div>

      <span className={handleClasses} />
    </button>
  );
}
