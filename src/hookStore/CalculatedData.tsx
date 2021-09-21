import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

import {
  ICalculatedOptions,
  IChartData,
} from '../common/interfaces/calculated-data';

interface CalculatedDataContextData {
  loading: boolean;
  chartData: IChartData[];
  calculatedOptions: ICalculatedOptions[];
  // eslint-disable-next-line no-unused-vars
  storeLoading(loading: boolean): void;
  // eslint-disable-next-line no-unused-vars
  storeChartData(chartData: IChartData[]): Promise<void>;
  storeCalculatedOptions(
    // eslint-disable-next-line no-unused-vars
    calculatedOptions: ICalculatedOptions[]
  ): Promise<void>;
}

interface CalculatedDataProviderProps {
  children: ReactNode;
}

const CalculatedDataContext = createContext<CalculatedDataContextData>(
  {} as CalculatedDataContextData
);

export function CalculatedDataProvider({
  children,
}: CalculatedDataProviderProps): ReactElement {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [calculatedOptions, setCalculatedOptions] = useState<
    ICalculatedOptions[]
  >([]);

  const storeLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  const storeChartData = useCallback(async (chartData: IChartData[]) => {
    setChartData(chartData);
  }, []);

  const storeCalculatedOptions = useCallback(
    async (calculatedOptions: ICalculatedOptions[]) => {
      setCalculatedOptions(calculatedOptions);
    },
    []
  );

  return (
    <CalculatedDataContext.Provider
      value={{
        loading,
        chartData,
        calculatedOptions,
        storeLoading,
        storeChartData,
        storeCalculatedOptions,
      }}
    >
      {children}
    </CalculatedDataContext.Provider>
  );
}

export function useCalculatedData(): CalculatedDataContextData {
  const context = useContext(CalculatedDataContext);

  if (!context) {
    throw new Error(
      'useCalculatedData must be used within an CalculatedDataProvider'
    );
  }

  return context;
}
