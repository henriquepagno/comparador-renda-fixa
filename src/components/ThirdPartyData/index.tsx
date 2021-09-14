import React, { useEffect, ReactElement } from 'react';

import useThirdPartyData from '../../hooks/useThirdPartyData';
import { useThirdParty } from '../../hookStore/ThirdParty';

import Input from '../Input';
import LoadingData from '../LoadingData';

import styles from './ThirdPartyData.module.scss';

export default function ThirdPartyData(): ReactElement {
  const { data, isLoading } = useThirdPartyData();

  const { storeIpca, storeSelic, yearlyIpca, yearlySelic } = useThirdParty();

  useEffect(() => {
    if (data) {
      storeIpca(data.yearlyIpca);
      storeSelic(data.yearlySelic);
    }
  }, [storeIpca, storeSelic, data]);

  function handleChangeIpca(value: number) {
    storeIpca(value);
  }

  function handleChangeSelic(value: number) {
    storeSelic(value);
  }

  return (
    <div className={styles['third-party-data']}>
      {isLoading ? (
        <LoadingData />
      ) : (
        <>
          <Input
            inputId="ipcaInput"
            label="IPCA"
            value={yearlyIpca}
            onChange={handleChangeIpca}
          />
          <Input
            inputId="selicInput"
            label="Selic"
            value={yearlySelic}
            onChange={handleChangeSelic}
          />
        </>
      )}
    </div>
  );
}
