import { JackpotStatus } from "../blueRibbonConsts"
import { normalizePots } from "../utils";
export const jackpots = [
  {
    communityWinRatio: 0,
    label: "MINI",
    mainWinRatio: 1,
    potId: "EmfHE1601029307968",
    status: "WARM",
    value: 10000,
  }, {
    communityWinRatio: 0,
    label: "MAJOR",
    mainWinRatio: 1,
    potId: "mdWQO1601029307972",
    status: "CHILLY",
    value: 100000,
  }, {
    communityWinRatio: 0.5,
    label: "MEGA",
    mainWinRatio: 0.5,
    potId: "tikxy1601029307975",
    status: "CHILLY",
    value: 1000000,
  }
];

export const composedPots = [
  {
    externalId: "OItzF1620896705196",
    potKey: "pot1",
    name: "Mini Jackpot",
    shortName: "Mini",
    mainWinRatio: 100,
    communityWinRatio: 0,
    icon: "https://cms.casumo.com/wp-content/uploads/2020/10/mini.svg",
    potExplanation: "",
    potTitleColor: "",
    sharedPot: null,
    value: 10,
    status: "COLD" as JackpotStatus,
    lastWinTs: 1623840522309,
  },
  {
    externalId: "VYfZq1620896705199",
    potKey: "pot2",
    name: "Major Jackpot",
    shortName: "Major",
    mainWinRatio: 100,
    communityWinRatio: 0,
    icon: "https://cms.casumo.com/wp-content/uploads/2020/10/major.svg",
    potExplanation: "",
    potTitleColor: "",
    sharedPot: null,
    value: 63.2,
    status: "WARM" as JackpotStatus,
    lastWinTs: 1622464889432,
  },
  {
    externalId: "zpqdZ1620896705200",
    potKey: "pot3",
    name: "Mega Jackpot",
    shortName: "Mega",
    mainWinRatio: 50,
    communityWinRatio: 50,
    icon: "https://cms.casumo.com/wp-content/uploads/2020/10/mega.svg",
    potExplanation: "Goes to 1 winner",
    potTitleColor: "",
    sharedPot: {
      name: "Community pot",
      shortName: "Community",
      icon: "https://cms.casumo.com/wp-content/uploads/2020/10/community.svg",
      splitExplanation: "Shared pot",
    },
    value: 106.6,
    status: "COLD" as JackpotStatus,
    lastWinTs: 1623840504722,
  },
];

export const normalizedPots = normalizePots(composedPots);
