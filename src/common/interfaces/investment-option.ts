export interface IInvestmentOption {
  id: string;
  category: string;
  type: 'PRE' | 'POS_CDI' | 'POS_IPCA';
  interest: number;
  color: 'pink' | 'red' | 'purple' | 'blue' | 'yellow' | 'orange';
  grossYield?: number;
  netYield?: number;
  ranking?: number;
}
