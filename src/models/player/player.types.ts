type Amount = {
  amount: number;
  iso4217CurrencyCode: string;
};

export type RealityCheckType = {
  totalBetAmount: Amount | undefined;
  totalWinAmount: Amount | undefined;
  intervalSeconds: number;
  sessionStartedTime: number;
};
