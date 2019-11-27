// @flow
export type JackpotMoney = {
  amount: number,
  currency: string,
};

export type Jackpot = {
  id: string,
  value: JackpotMoney,
};
