import React, { useState, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Switch.module.scss';

interface ISwitch {
  uncheckedIcon?: ReactNode;
  checkedIcon?: ReactNode;
  // eslint-disable-next-line no-unused-vars
  handleSwitchClick(e: boolean): void;
}

export default function Switch({
  uncheckedIcon,
  checkedIcon,
  handleSwitchClick,
}: ISwitch): ReactElement {
  const [checked, setChecked] = useState(false);

  const uncheckedIconClasses = clsx(
    styles['icon'],
    !checked && styles['icon--invisible']
  );

  const checkedIconClasses = clsx(
    styles['icon'],
    checked && styles['icon--invisible']
  );

  const handleClasses = clsx(
    styles['handle'],
    checked && styles['handle--checked']
  );

  const handleClick = () => {
    setChecked(!checked);
    handleSwitchClick(!checked);
  };

  return (
    <div className={styles['container']} onClick={handleClick}>
      <div className={uncheckedIconClasses}>{uncheckedIcon}</div>
      <div className={checkedIconClasses}>{checkedIcon}</div>

      <span className={handleClasses} />
    </div>
  );
}
