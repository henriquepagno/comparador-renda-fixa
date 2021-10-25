import { Colors } from '../enums/Colors';

import { IInvestmentOption } from '../interfaces/investment-option';

export function assignColor(investmentOptions: IInvestmentOption[]): string {
  for (const color in Colors) {
    if (isNaN(Number(color))) {
      if (investmentOptions.findIndex((i) => i.color === color) === -1) {
        return color;
      }
    }
  }

  return '';
}

export function getColor(colorName: string): string {
  return Colors[colorName as keyof typeof Colors];
}
