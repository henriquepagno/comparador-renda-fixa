import React, { ReactElement } from 'react';
import { InputNumber as AntDInputNumber } from 'antd';

import InputCurrency from '../InputCurrency';

import config from '../InputCurrency/config';

import styles from './Input.module.scss';

interface IInput {
  inputId: string;
  label: string;
  value: number;
  step?: string;
  min?: number;
  max?: number;
  allowDecimal?: boolean;
  currency?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange(e: number): void;
}

export default function InputNumber({
  inputId,
  label,
  value,
  step = '.01',
  min,
  max,
  allowDecimal = false,
  currency,
  onChange,
}: IInput): ReactElement {
  function handleOnChange(e: number): void {
    onChange(e);
  }

  const handleChangeCurrency = (event: any, value: number) => {
    event.preventDefault();

    onChange(value);
  };

  return (
    <div>
      <label className={styles['label']} htmlFor={inputId}>
        {label}
      </label>
      {currency ? (
        <InputCurrency
          id={inputId}
          currency="BRL"
          config={config}
          value={value}
          className={styles['input-currency']}
          onChange={handleChangeCurrency}
        />
      ) : (
        <AntDInputNumber
          id={inputId}
          min={min ? min : 0}
          max={max ? max : undefined}
          value={value}
          step={step}
          onChange={(e) => handleOnChange(e)}
          className={styles['input']}
          decimalSeparator=","
          precision={allowDecimal ? 2 : 0}
        />
      )}
    </div>
  );
}
