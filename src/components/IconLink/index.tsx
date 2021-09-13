import React, { ReactElement } from 'react';

import styles from './IconLink.module.scss';

interface IIconLinkProps {
  url: string;
  icon: ReactElement;
}

export default function IconLink({ url, icon }: IIconLinkProps): ReactElement {
  return (
    <a href={url} className={styles['link']}>
      {icon}
    </a>
  );
}
