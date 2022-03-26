import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactElement,
  ReactNode,
} from 'react';

import { GraphType } from '../common/enums/GraphType';
import { IChartData } from '../common/interfaces/calculated-data';

interface ChartContextData {
  loading: boolean;
  chartData: IChartData[];
  graphType: GraphType;
  // eslint-disable-next-line no-unused-vars
  storeLoading(loading: boolean): void;
  // eslint-disable-next-line no-unused-vars
  storeChartData(chartData: IChartData[]): void;
  // eslint-disable-next-line no-unused-vars
  storeGraphType(graphType: GraphType): void;
}

interface ChartProviderProps {
  children: ReactNode;
}

const ChartContext = createContext<ChartContextData>({} as ChartContextData);

export function ChartProvider({ children }: ChartProviderProps): ReactElement {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [graphType, setGraphType] = useState<GraphType>(GraphType.Line);

  const storeLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  const storeChartData = useCallback((chartData: IChartData[]) => {
    setChartData(chartData);
  }, []);

  const storeGraphType = useCallback((graphType: GraphType) => {
    console.log('storeGraphType', graphType);
    setGraphType(graphType);
  }, []);

  return (
    <ChartContext.Provider
      value={{
        loading,
        chartData,
        graphType,
        storeLoading,
        storeChartData,
        storeGraphType,
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
