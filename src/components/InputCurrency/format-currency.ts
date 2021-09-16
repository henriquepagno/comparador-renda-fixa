import { IInputCurrencyConfig } from './config';

export default function formatCurrency(
  value: number,
  localeConfig: IInputCurrencyConfig,
  currencyName: string
): string {
  const numberConfig = localeConfig.formats.number[currencyName];
  const formatter = new global.Intl.NumberFormat(
    localeConfig.locale,
    numberConfig
  );

  return formatter.format(value);
}
