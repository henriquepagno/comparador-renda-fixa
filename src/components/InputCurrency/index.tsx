import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { IInputCurrencyConfig } from './config';

import formatCurrency from './format-currency';

export interface IInputCurrency {
  value: string | number | undefined;
  defaultValue?: string | number | undefined;
  config: IInputCurrencyConfig;
  currency: string;
  max?: number;
  autoFocus?: boolean;
  autoReset?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange(e: ChangeEvent, value: number, maskedValue: string): void;
  // All other props
  [x: string]: any;
}

export default function InputCurrency({
  value,
  defaultValue,
  config,
  currency,
  max,
  autoFocus,
  onChange,
  ...otherProps
}: IInputCurrency): ReactElement {
  const [maskedValue, setMaskedValue] = useState<string | number>('0');

  const inputRef = useCallback(
    (node) => {
      const isActive = node === document.activeElement;

      if (node && autoFocus && !isActive) {
        node.focus();
      }
    },
    [autoFocus]
  );

  const clean = (value: string | number | undefined): number => {
    if (typeof value === 'number') {
      return value;
    }

    // strips everything that is not a number (positive or negative)
    return Number(value?.toString().replace(/[^0-9-]/g, ''));
  };

  const normalizeValue = useCallback(
    (value: number | string | undefined): number => {
      const {
        formats: {
          number: {
            [currency]: { maximumFractionDigits },
          },
        },
      } = config;

      let safeNumber = value;

      if (typeof value === 'string') {
        safeNumber = clean(value);

        if (safeNumber % 1 !== 0) {
          safeNumber = safeNumber.toFixed(maximumFractionDigits);
        }
      } else {
        // all input numbers must be a float point (for the cents portion). This is a fallback in case of integer ones.
        safeNumber = Number.isInteger(value)
          ? Number(value) * 10 ** maximumFractionDigits
          : value?.toFixed(maximumFractionDigits);
      }

      // divide it by 10 power the maximum fraction digits.
      return clean(safeNumber) / 10 ** maximumFractionDigits;
    },
    [config, currency]
  );

  const calculateValues = useCallback(
    (inputFieldValue: number | string | undefined) => {
      const value = normalizeValue(inputFieldValue);

      const maskedValue = formatCurrency(value, config, currency);

      return [value, maskedValue];
    },
    [currency, normalizeValue, config]
  );

  const updateValues = (value: number | string | undefined): any[] => {
    const [calculatedValue, calculatedMaskedValue] = calculateValues(value);

    if (!max || calculatedValue <= max) {
      setMaskedValue(calculatedMaskedValue);

      return [calculatedValue, calculatedMaskedValue];
    } else {
      return [normalizeValue(maskedValue), maskedValue];
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const [value, maskedValue] = updateValues(event.target.value);

    if (maskedValue) {
      onChange(event, value, maskedValue);
    }
  };

  useEffect(() => {
    const currentValue = value || defaultValue || 0;
    const [, maskedValue] = calculateValues(currentValue);

    setMaskedValue(maskedValue);
  }, [calculateValues, currency, value, defaultValue, config]);

  return (
    <input
      {...otherProps}
      ref={inputRef}
      value={maskedValue}
      onChange={(e) => handleChange(e)}
    />
  );
}
