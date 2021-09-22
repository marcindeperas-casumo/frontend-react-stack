import { KAMBI_OFFERINGS } from "Features/sports/constants";

export const getOffering = (market: string): string => {
  const marketKey = market.toUpperCase().trim();

  return KAMBI_OFFERINGS[marketKey] || KAMBI_OFFERINGS.DEFAULT;
};
