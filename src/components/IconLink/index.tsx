import React, { ReactElement } from 'react';

import styles from './IconLink.module.scss';

interface IIconLinkProps {
  url: string;
  icon: ReactElement;
  ariaLabel: string;
}

export default function IconLink({
  url,
  icon,
  ariaLabel,
}: IIconLinkProps): ReactElement {
  return (
    <a href={url} className={styles['link']} aria-label={ariaLabel}>
      {icon}
    </a>
  );
}
