import { useEffect, useState } from 'react';
import useSWR from 'swr';

import api from '../services/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

interface IData {
  yearlyIpca: number;
  yearlySelic: number;
  yearlyDi: number;
}

interface IThirdPartyData {
  successful?: boolean;
  data?: IData;
  error?: any;
  isLoading: boolean;
  isError: boolean;
}

export default function useThirdPartyData(): IThirdPartyData {
  const { data, error } = useSWR<IThirdPartyData>('third-party/', fetcher);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(!error && !data);
  }, [error, data]);

  return {
    successful: data?.successful,
    data: data?.data,
    error: data?.error,
    isLoading: isLoading,
    isError: error,
  };
}
