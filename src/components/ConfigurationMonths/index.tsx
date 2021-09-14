import React, { ReactElement } from 'react';

import Input from '../Input';

import { useInformation } from '../../hookStore/Information';

import styles from './ConfigurationMonths.module.scss';

export default function ConfigurationMonths(): ReactElement {
  const { storeMonths, months } = useInformation();

  function handleChangeMonths(months: number) {
    storeMonths(months);
  }

  return (
    <div className={styles['months']}>
      <Input
        inputId="months"
        label="Meses de Investimento"
        value={months}
        step="1"
        max={120}
        onChange={handleChangeMonths}
      />
      <span>1 ano</span>
    </div>
  );
}
