import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

import { IChartData } from '../common/interfaces/calculated-data';

interface ChartContextData {
  loading: boolean;
  chartData: IChartData[];
  // eslint-disable-next-line no-unused-vars
  storeLoading(loading: boolean): void;
  // eslint-disable-next-line no-unused-vars
  storeChartData(chartData: IChartData[]): void;
}

interface ChartProviderProps {
  children: ReactNode;
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

export function ChartProvider({ children }: ChartProviderProps): ReactElement {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<IChartData[]>([]);

  const storeLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  const storeChartData = useCallback((chartData: IChartData[]) => {
    setChartData(chartData);
  }, []);

  return (
    <ChartContext.Provider
      value={{
        loading,
        chartData,
        storeLoading,
        storeChartData,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
}

export function useChart(): ChartContextData {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within an ChartProvider');
  }

  return context;
}
