interface INumberData {
  style: string;
  currency: string;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
}

interface ILocale {
  [x: string]: INumberData;
}

interface INumber {
  number: ILocale;
}

export interface IInputCurrencyConfig {
  locale: string;
  formats: INumber;
}

const config: IInputCurrencyConfig = {
  locale: 'pt-BR',
  formats: {
    number: {
      BRL: {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

export default config;
