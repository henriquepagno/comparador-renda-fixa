import React, { ReactElement } from 'react';
import { IoIosClose } from 'react-icons/io';

import styles from './Header.module.scss';

interface IHeaderProps {
  title: string;
  // eslint-disable-next-line no-unused-vars
  onClose(): void;
}

export default function Header({ title, onClose }: IHeaderProps): ReactElement {
  return (
    <div className={styles['header']}>
      <p className="title">{title}</p>
      <IoIosClose className={styles['icon']} onClick={onClose} />
    </div>
  );
}
