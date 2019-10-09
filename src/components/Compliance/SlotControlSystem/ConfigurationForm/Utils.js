// @flow

export function isBudgetTooLow({ budget }: { budget: number }) {
  return budget < 0.1;
}

export function isBudgetTooHigh({
  budget,
  balance,
}: {
  budget: number,
  balance: number,
}) {
  return budget > balance;
}

export function isBudgetInvalid(props: { budget: number, balance: number }) {
  return isNaN(props.budget) || isBudgetTooLow(props) || isBudgetTooHigh(props);
}
