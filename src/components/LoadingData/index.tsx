import React, { ReactElement, ReactNode } from 'react';
import ReactLoading from 'react-loading';

import styles from './LoadingData.module.scss';

interface ILoadingData {
  loading: boolean;
  children: ReactNode;
}

export default function LoadingData({
  loading,
  children,
}: ILoadingData): ReactElement {
  return loading ? (
    <div className={styles['loading-container']}>
      <ReactLoading type={'bubbles'} color={'#12a9ce'} />
    </div>
  ) : (
    <>{children}</>
  );
}
