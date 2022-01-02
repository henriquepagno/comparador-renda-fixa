const percentFormatOption = {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const percentFormatter = new Intl.NumberFormat('pt-BR', percentFormatOption);

const currencyFormatOption = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', currencyFormatOption);

export { percentFormatter, currencyFormatter };
