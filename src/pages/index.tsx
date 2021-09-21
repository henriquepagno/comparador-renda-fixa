import type { NextPage } from 'next';

import ThirdPartyData from '../components/ThirdPartyData';
import ConfigurationAmount from '../components/ConfigurationAmount';
import ConfigurationMonths from '../components/ConfigurationMonths';
import PrimaryButton from '../components/PrimaryButton';
import Chart from '../components/Chart';

import styles from '../styles/pages/Home.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <h2 className={styles['subtitle']}>
        Adicione opções de investimento de renda fixa e compare-os em um
        gráfico.
      </h2>

      <div className={styles['configuration']}>
        <ThirdPartyData />

        <ConfigurationMonths />
        <ConfigurationAmount />

        <PrimaryButton />
      </div>

      <Chart />
    </>
  );
};

export default Home;
