import React, { ReactElement, useMemo } from 'react';

import NumberField from '../NumberField';

import { useInformation } from '../../hookStore/Information';

import styles from './ConfigurationMonths.module.scss';

export default function ConfigurationMonths(): ReactElement {
  const { storeMonths, months } = useInformation();

  function handleChangeMonths(months: number): void {
    storeMonths(months);
  }

  function getMonthsAsYear(months: number): string {
    if (Number.isNaN(months)) return '';

    const asYears = months / 12;
    let roundedAsYears = Number(asYears).toFixed(1);

    if (roundedAsYears.endsWith('.0')) {
      roundedAsYears = roundedAsYears.substring(0, roundedAsYears.length - 2);
    }

    if (asYears <= 1) {
      return `${roundedAsYears} ano`;
    } else {
      return `${roundedAsYears} anos`;
    }
  }

  const monthsAsYear = useMemo(() => getMonthsAsYear(months), [months]);

  return (
    <div className={styles['months']}>
      <NumberField
        inputId="months"
        label="Meses de Investimento"
        value={months}
        onChange={handleChangeMonths}
        minValue={1}
        maxValue={120}
      />
      <span>{monthsAsYear}</span>
    </div>
  );
}
