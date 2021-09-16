import React, { ReactElement } from 'react';

import InputNumber from '../InputNumber';

import { useInformation } from '../../hookStore/Information';

import styles from './ConfigurationAmount.module.scss';

export default function ConfigurationAmount(): ReactElement {
  const { storeAmountInvested, amountInvested } = useInformation();

  function handleChangeAmount(amount: number): void {
    storeAmountInvested(amount);
  }

  return (
    <div className={styles['amount']}>
      <InputNumber
        inputId="amount"
        label="Valor Investido"
        value={amountInvested}
        step="1"
        min={1}
        onChange={handleChangeAmount}
        currency
        allowDecimal
      />
    </div>
  );
}
