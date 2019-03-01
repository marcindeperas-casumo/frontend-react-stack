// @flow
import { createSelector } from "reselect";
import * as R from "ramda";
import type { Game } from "Types/game";
import { getField } from "Models/cms";
import { slug } from "./liveCasino.constants";

export const liveTableEntitySelector = createSelector(
  R.pathOr({}, ["schema", "liveTable"]),
  R.identity
);

export const liveTableSelector = (id: string) =>
  createSelector(
    liveTableEntitySelector,
    R.propOr(null, id)
  );

type GameSlug = string;
export type EvolutionLobbyType =
  | "Blackjack"
  | "Roulette"
  | "MoneyWheel"
  | "Monopoly"
  | "Baccarat"
  | "Holdem"
  | "UTH"
  | "CSP"
  | "THB"
  | "TRP"
  | "DragonTiger"
  | "TopCard"
  | "TCP"
  | "ScalableBlackjack"
  | "AmericanRoulette";
export type GroupedGamesList = Array<[EvolutionLobbyType, Array<GameSlug>]>;

type PropFn = Game => number;
const propMax: PropFn = R.pathOr(0, ["lobby", "bets", "max"]);
const propMin: PropFn = R.pathOr(0, ["lobby", "bets", "min"]);

type SortFn = (Array<Game>) => Array<Game>;
const sortByBetRange: SortFn = R.sort((a, b) => {
  const maxPropDiff = propMax(b) - propMax(a);
  if (maxPropDiff !== 0) {
    return maxPropDiff;
  }
  // if max bet values are equal we are checking which bet starts from greater value
  return propMin(b) - propMin(a);
});

const filterLiveGames = R.filter(R.propSatisfies(R.is(String), "tableId"));
const liveGameTypePath = ["lobby", "type"];

export const getAllLiveGames = (state: any): Array<Game> =>
  createSelector(
    [R.pathOr({}, ["schema", "game"])],
    R.pipe(
      R.values,
      filterLiveGames,
      R.map(x => ({
        ...x,
        lobby: liveTableSelector(x.tableId)(state),
      })),
      R.filter(R.pathSatisfies(R.is(String), liveGameTypePath)) // for cases where game exist in CMS but there's not such live table. It's possible that this issue happens only on test env
    )
  )(state);

export const groupLiveGames = R.pipe(
  R.groupBy(R.path(liveGameTypePath)), // TODO(mm): it might be not enough. We might want to merge "similar" games ie. Blackjack and ScalableBlackjack
  R.toPairs,
  R.map(([gameType, gamesInSection]) => [
    gameType,
    R.pipe(
      sortByBetRange,
      R.pluck("slug")
    )(gamesInSection),
  ])
);
export const getGroupedLiveGames: GroupedGamesList = createSelector(
  [getAllLiveGames],
  groupLiveGames
);

/**
 * Evolution lobby types are pascal case, all ids in cms are snake case.
 * I decided it's better to give translations regular id's and map them
 */
const keyToLobby = {
  blackjack: "Blackjack",
  roulette: "Roulette",
  money_wheel: "MoneyWheel",
  monopoly: "Monopoly",
  baccarat: "Baccarat",
  casino_holdem: "Holdem",
  ultimate_texas_holdem: "UTH",
  caribbean_stud_poker: "CSP",
  texas_holdem_bonus: "THB",
  triple_card_poker: "TRP",
  dragon_tiger: "DragonTiger",
  top_card: "TopCard",
  three_card_poker: "TCP",
  scalable_blackjack: "ScalableBlackjack",
  american_roulette: "AmericanRoulette",
};
type getLobbyNamesT = any => {
  [EvolutionLobbyType]: string,
};

export const mapLobbyTranslations = R.pipe(
  R.map(({ key, value }) => [keyToLobby[key] || key, value]),
  R.fromPairs
);
export const getLobbyNames: getLobbyNamesT = createSelector(
  [
    getField({
      slug: slug.TRANSLATIONS,
      field: "text_fields",
      defaultValue: [],
    }),
  ],
  mapLobbyTranslations
);
