// @flow

export type RawJackpot = {
  formattedJackpotAmount: string,
  iso4217CurrencyCode: string,
  jackpotId: string,
};

export type TransformedJackpot = {
  currencyCode: string,
  gameId: string,
  formattedJackpotAmount: string,
};

export const transformRawJackpotObject = (
  jackpot: RawJackpot
): TransformedJackpot => {
  const { formattedJackpotAmount, iso4217CurrencyCode, jackpotId } = jackpot;

  return {
    currencyCode: iso4217CurrencyCode,
    gameId: jackpotId,
    formattedJackpotAmount,
  };
};
