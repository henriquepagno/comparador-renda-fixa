import React, { ReactElement } from 'react';

import styles from './PrimaryButton.module.scss';

export default function PrimaryButton(): ReactElement {
  return (
    <div className={styles['primary-button']}>
      <button className={styles['primary-button__button']} type="button">
        Calcular
      </button>
    </div>
  );
}
