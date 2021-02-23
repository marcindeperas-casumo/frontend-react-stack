// @flow
type Amount = {
  amount: number,
  iso4217CurrencyCode: string,
};

export type RealityCheckType = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  totalBetAmount: ?Amount,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  totalWinAmount: ?Amount,
  intervalSeconds: number,
  sessionStartedTime: number,
};
