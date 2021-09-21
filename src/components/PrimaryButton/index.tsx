import React, { ReactElement, useMemo } from 'react';

import { useThirdParty } from '../../hookStore/ThirdParty';
import { useInformation } from '../../hookStore/Information';

import api from '../../services/api';

import { ICalculatedData } from '../../common/interfaces/calculated-data';

import styles from './PrimaryButton.module.scss';
import { useCalculatedData } from '../../hookStore/CalculatedData';

export default function PrimaryButton(): ReactElement {
  const { yearlyIpca, yearlySelic } = useThirdParty();
  const { months, amountInvested } = useInformation();
  const { storeLoading, storeChartData } = useCalculatedData();

  const requestData = useMemo(() => {
    return {
      yearlyIpca,
      yearlySelic,
      amountInvested,
      monthsDuration: months,
    };
  }, [amountInvested, months, yearlyIpca, yearlySelic]);

  async function getCalculateData(): Promise<void> {
    storeLoading(true);

    const result = await api.post<ICalculatedData>('calculated-data/', {
      ...requestData,
    });

    const { data: resultData } = result.data;

    if (resultData?.chartData) storeChartData(resultData.chartData);
    storeLoading(false);
  }

  return (
    <div className={styles['primary-button']}>
      <button
        className={styles['primary-button__button']}
        type="button"
        onClick={getCalculateData}
      >
        Calcular
      </button>
    </div>
  );
}
