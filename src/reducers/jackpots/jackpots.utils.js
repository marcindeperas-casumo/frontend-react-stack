export const transformRawJackpotObject = jackpot => {
  const { formattedJackpotAmount, iso4217CurrencyCode, jackpotId } = jackpot;

  return {
    currencyCode: iso4217CurrencyCode,
    gameId: jackpotId,
    formattedJackpotAmount,
  };
};
