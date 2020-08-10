// @flow
type Amount = {
  amount: number,
  iso4217CurrencyCode: string,
};

export type RealityCheckType = {
  totalBetAmount: ?Amount,
  totalWinAmount: ?Amount,
  intervalSeconds: number,
  sessionStartedTime: number,
};
