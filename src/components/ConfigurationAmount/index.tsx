import React, { ReactElement } from 'react';

import NumberField from '../NumberField';

import { useInformation } from '../../hookStore/Information';

import styles from './ConfigurationAmount.module.scss';

export default function ConfigurationAmount(): ReactElement {
  const { storeAmountInvested, amountInvested } = useInformation();

  function handleChangeAmount(amount: number): void {
    storeAmountInvested(amount);
  }

  return (
    <div className={styles['amount']}>
      <NumberField
        inputId="amount"
        label="Valor Investido"
        value={amountInvested}
        format="0.0,[00]"
        onChange={handleChangeAmount}
        startLabel="R$"
      />
    </div>
  );
}
