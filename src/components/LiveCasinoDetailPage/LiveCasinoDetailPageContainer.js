// @flow
import { connect } from "react-redux";
import { groupBy, map, path, pipe, sort, toPairs } from "ramda";
import { gameListSelector, gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import LiveCasinoDetailPage from "./LiveCasinoDetailPage";
import type { Game } from "Types/game";
import type { GroupedGamesList } from "./types";

type PropFn = Game => number;
const propMax: PropFn = path(["lobby", "bets", "max"]);
const propMin: PropFn = path(["lobby", "bets", "min"]);

// TODO: find proper name in CMS
const getTitleForLobbyType = (x: string): string => x;

type SortFn = (Array<Game>) => Array<Game>;
const sortByBetRange: SortFn = sort((a, b) => {
  const maxPropDiff = propMax(b) - propMax(a);
  if (maxPropDiff !== 0) return maxPropDiff;
  // if max bet values are equal we are checking which bet starts from greater value
  return propMin(b) - propMin(a);
});

type GroupFn = (Array<Game>) => GroupedGamesList;
const groupForSectionList: GroupFn = pipe(
  groupBy(path(["lobby", "type"])),
  toPairs,
  map(([id, gamesInSection]) => ({
    id,
    title: getTitleForLobbyType(id),
    gamesInSection: sortByBetRange(gamesInSection),
  }))
);

export default connect(
  state => {
    const { games } = gameListSelector("liveCasinoGames")(state);
    const gamesList = groupForSectionList(
      games.map(gameId => ({
        gameId,
        ...gameSelector(gameId)(state),
      }))
    );

    return { gamesList };
  },
  { launchGame }
)(LiveCasinoDetailPage);
