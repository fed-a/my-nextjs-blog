export function getNumeric(params: {
  zero: string;
  one: string;
  two: string;
  few: string;
  many: string;
  other: string;
  value: number;
}) {
  const { zero, one, two, few, many, other, value } = params;
  if (value % 10 === 0) {
    return `${value} ${zero}`;
  }
  if (value % 10 === 1) {
    return `${value} ${one}`;
  }
  if (value % 10 === 2) {
    return `${value} ${two}`;
  }
  if (value % 10 >= 3 && value % 10 <= 4) {
    return `${value} ${few}`;
  }
  if (value % 10 >= 5) {
    return `${value} ${many}`;
  }
  return `${value} ${other}`;
}
