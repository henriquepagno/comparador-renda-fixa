import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { FaMedal } from 'react-icons/fa';

import styles from './Medal.module.scss';

interface IMedal {
  ranking: number;
}

export default function Medal({ ranking }: IMedal): ReactElement {
  const gold = 1;
  const silver = 2;
  const bronze = 3;

  const classes = clsx(
    styles['medal'],
    ranking === gold && styles['medal--gold'],
    ranking === silver && styles['medal--silver'],
    ranking === bronze && styles['medal--bronze']
  );

  return ranking > bronze || ranking === 0 ? (
    <></>
  ) : (
    <FaMedal className={classes} />
  );
}
