import type { NextPage } from 'next';

// import useSWR from 'swr';

// import api from '../services/api';

// const fetcher = (url: string) => api.get(url).then((res) => res.data);

import useThirdPartyData from '../hooks/useThirdPartyData';

// import styles from '../styles/pages/Home.module.scss';

const Home: NextPage = () => {
  // const { data, error } = useSWR('third-party/', fetcher);

  const { data, isLoading, isError, error } = useThirdPartyData();

  return isLoading ? (
    <div>loading</div>
  ) : (
    <div className="container">
      {data?.yearlyIpca} e {data?.yearlySelic}
    </div>
  );
};

export default Home;
