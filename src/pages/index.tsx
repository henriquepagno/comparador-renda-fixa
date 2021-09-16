import type { NextPage } from 'next';

import ThirdPartyData from '../components/ThirdPartyData';
import ConfigurationAmount from '../components/ConfigurationAmount';
import ConfigurationMonths from '../components/ConfigurationMonths';

import styles from '../styles/pages/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles['configuration']}>
      <ThirdPartyData />

      <ConfigurationMonths />
      <ConfigurationAmount />
    </div>
  );
};

export default Home;
