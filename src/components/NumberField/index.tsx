import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';

import {
  isValidNumber,
  parseValue,
  formatValue,
} from '../../common/functions/numbers';

import styles from './NumberField.module.scss';

interface INumberField {
  inputId: string;
  label: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  format?: string;
  // eslint-disable-next-line no-unused-vars
  onChange(e: number): void;
  // eslint-disable-next-line no-unused-vars
  onBlur?(e: number): void;
  startLabel?: string;
  endLabel?: string;
}

export default function NumberField({
  inputId,
  label,
  value,
  minValue = -999999999999999,
  maxValue = 999999999999999,
  format,
  onChange,
  onBlur,
  startLabel,
  endLabel,
}: INumberField): ReactElement {
  const [internalValue, setInternalValue] = useState(
    format
      ? getFormattedInternalValue(String(value).replace('.', ','))
      : String(value)
  );

  const inputClasses = clsx(
    styles['input'],
    startLabel && styles['input--has-label'],
    endLabel && styles['input--has-label']
  );

  function validateValue(): boolean {
    try {
      const parsedValue = parseValue(internalValue);

      if (
        internalValue !== null &&
        isValidNumber(internalValue) &&
        parsedValue !== null &&
        parsedValue > maxValue &&
        parsedValue < minValue
      ) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  function getRawValue(value: string): number | null {
    if (!isValidNumber(value)) {
      return null;
    } else {
      const formattedValue = formatValue(value, format);

      const rawValue = parseValue(formattedValue);

      return rawValue == null || rawValue > maxValue || rawValue < minValue
        ? null
        : rawValue;
    }
  }

  function getFormattedInternalValue(value: string): string {
    if (!isValidNumber(value)) {
      return value;
    } else {
      const rawValue = parseValue(value);

      if (rawValue == null || rawValue > maxValue || rawValue < minValue) {
        return value;
      } else {
        return formatValue(value, format);
      }
    }
  }

  function validateNonFormattedValue(value: number): number {
    if (value < minValue) return minValue;
    else if (value > maxValue) return maxValue;

    return value;
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;

    if (format) {
      if (!validateValue()) {
        onChange(0);
        setInternalValue('0');
        return;
      }

      setInternalValue(value);

      const rawValue = getRawValue(internalValue);
      rawValue !== null && onChange(rawValue);
    } else {
      setInternalValue(value);
      onChange(Number(value));
    }
  }

  function handleOnBlur(e: React.ChangeEvent<HTMLInputElement>): void {
    if (format) {
      if (!validateValue()) {
        onChange(0);
        setInternalValue('0');
        return;
      }

      setInternalValue(getFormattedInternalValue(internalValue));

      const rawValue = getRawValue(internalValue);
      if (rawValue !== null) {
        onBlur ? onBlur(rawValue) : onChange(rawValue);
      }
    } else {
      let value = Number(e.currentTarget.value);

      value = validateNonFormattedValue(value);

      setInternalValue(String(value));
      onChange(Number(value));
    }
  }

  return (
    <div>
      <label className={styles['label']} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles['container']}>
        {startLabel && (
          <div className={styles['label-container']}>
            <span className={styles['start-label']}>{startLabel}</span>
          </div>
        )}
        <input
          id={inputId}
          onChange={(e) => handleOnChange(e)}
          onBlur={handleOnBlur}
          value={internalValue}
          className={inputClasses}
        />
        {endLabel && (
          <div className={styles['label-container']}>
            <span className={styles['end-label']}>{endLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
