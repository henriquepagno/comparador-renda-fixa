import React, { ReactElement } from 'react';

import styles from './Input.module.scss';

interface IInput {
  inputId: string;
  label: string;
  value?: number;
  step?: string;
  max?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?(e: number): void;
}

export default function Input({
  inputId,
  label,
  value,
  step = '.01',
  max,
  onChange,
}: IInput): ReactElement {
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (onChange) onChange(e.currentTarget.valueAsNumber);
  };

  return (
    <div>
      <label className={styles['label']} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        type="number"
        className={styles['input']}
        min={0}
        max={max ? max : undefined}
        value={value}
        step={step}
        onChange={(e) => handleOnChange(e)}
      />
    </div>
  );
}
