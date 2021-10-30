import React, { ReactElement } from 'react';
import clsx from 'clsx';

import styles from './Tag.module.scss';

interface ITag {
  description: string;
  color: 'pink' | 'red' | 'purple' | 'blue' | 'yellow' | 'orange' | '';
}

export default function Tag({ description, color }: ITag): ReactElement {
  const classes = clsx(
    styles['container'],
    styles[`container--${color.toLowerCase()}`]
  );

  return (
    <div className={classes}>
      <span>{description}</span>
    </div>
  );
}
