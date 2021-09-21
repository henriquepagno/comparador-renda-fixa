export interface IChartData {
  name: string | number;
  CDI: number;
  IPCA: number;
  [x: string]: string | number;
}

export interface ICalculatedOptions {
  id: string;
  grossYield: number;
  netYield: number;
  ranking: number;
}

export interface IData {
  chartData: IChartData[];
  calculatedOptions: ICalculatedOptions[];
}

export interface ICalculatedData {
  successful?: boolean;
  data?: IData;
  error?: any;
  isLoading: boolean;
  isError: boolean;
}
