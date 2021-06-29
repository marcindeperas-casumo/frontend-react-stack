import { PotObject } from "./blueRibbonConsts";

export const normalizePotSplit = (pot: PotObject) => {
  return pot.sharedPot
    ? [
        {
          ...pot,
          sharedPot: null,
          value: pot.value * (pot.mainWinRatio / 100),
        },
        {
          ...pot,
          sharedPot: null,
          name: pot.sharedPot.name,
          shortName: pot.sharedPot.shortName,
          icon: pot.sharedPot.icon,
          value: pot.value * (pot.communityWinRatio / 100),
          isCommunity: true,
        },
      ]
    : [pot];
};

export const normalizePots = (pots: Array<PotObject>) =>
  pots.reduce((acc, cur) => {
    return acc.concat(normalizePotSplit(cur));
  }, []);
