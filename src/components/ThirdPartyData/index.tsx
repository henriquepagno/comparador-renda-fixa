import React, { useEffect, ReactElement } from 'react';

import useThirdPartyData from '../../hooks/useThirdPartyData';
import { useThirdParty } from '../../hookStore/ThirdParty';

import LoadingData from '../LoadingData';
import NumberField from '../NumberField';

import styles from './ThirdPartyData.module.scss';

export default function ThirdPartyData(): ReactElement {
  const { data, isLoading } = useThirdPartyData();

  const { storeIpca, storeDi, yearlyIpca, yearlyDi } = useThirdParty();

  useEffect(() => {
    if (data) {
      storeIpca(data.yearlyIpca);
      storeDi(data.yearlyDi);
    }
  }, [storeIpca, storeDi, data]);

  function handleChangeIpca(value: number): void {
    storeIpca(value);
  }

  function handleChangeDi(value: number): void {
    storeDi(value);
  }

  return (
    <div className={styles['third-party-data']}>
      <LoadingData loading={isLoading}>
        <>
          <NumberField
            inputId="ipcaInput"
            label="IPCA"
            value={yearlyIpca}
            onChange={handleChangeIpca}
            format="0.00"
            endLabel="%"
          />
          <NumberField
            inputId="diInput"
            label="Taxa DI (CDI)"
            value={yearlyDi}
            onChange={handleChangeDi}
            format="0.00"
            endLabel="%"
          />
        </>
      </LoadingData>
    </div>
  );
}
