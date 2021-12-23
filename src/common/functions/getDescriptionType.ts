import { IInvestmentOption } from '../interfaces/investment-option';

export default function getDescriptionType(
  type: IInvestmentOption['type']
): string {
  switch (type) {
    case 'PRE':
      return 'Pré';
    case 'POS_CDI':
      return 'Pós CDI';
    case 'POS_IPCA':
      return 'Pós IPCA';
    default:
      return '';
  }
}
