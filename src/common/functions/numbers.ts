import numeral from 'numeral';

export function isValidNumber(value: string | null): boolean {
  if (value === null || value === undefined) return false;

  if (Number.isNaN(value)) return false;

  if (typeof value === 'number') return true;

  if (typeof value === 'string') {
    value = value.replace(/^-/g, '');

    if (value.endsWith(',') || value.endsWith('.')) value = value.slice(0, -1);

    return numeral.validate(value, 'pt-br');
  }

  return false;
}

export function parseValue(value: string | null): number | null {
  if (value == null) return null;

  if (!isValidNumber(value)) throw 'not a number';

  return numeral(value).value();
}

export function formatValue(value: string, format: string | undefined) {
  if (isValidNumber(value) && format) {
    return numeral(value).format(format, Math.floor);
  } else {
    return '';
  }
}
