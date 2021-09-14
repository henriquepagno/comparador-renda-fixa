import type { NextPage } from 'next';
import ConfigurationMonths from '../components/ConfigurationMonths';

import ThirdPartyData from '../components/ThirdPartyData';

import styles from '../styles/pages/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles['configuration']}>
      <ThirdPartyData />

      <ConfigurationMonths />
    </div>
  );
};

export default Home;
