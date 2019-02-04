// @flow
import { connect } from "react-redux";
import { groupBy, map, path, pipe, sort, toPairs } from "ramda";
import { gameListSelector, gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import { fetchPageBySlug, getField, isPageFetched } from "Models/cms";
import LiveCasinoDetailPage from "./LiveCasinoDetailPage";
import type { Game } from "Types/game";
import type { GroupedGamesList } from "./types";

type PropFn = Game => number;
const propMax: PropFn = path(["lobby", "bets", "max"]);
const propMin: PropFn = path(["lobby", "bets", "min"]);

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
    title: id,
    gamesInSection: sortByBetRange(gamesInSection),
  }))
);

const getLobbyNamesMap = (slug, state) => {
  /**
   * lobby types have weird name style (pascal case, see values belove) it wasn't
   * present in cms so i decided it's better to give translations regular id's
   * (snake case) and map it here
   */
  const keyToLobbyType = {
    blackjack: "Blackjack",
    money_wheel: "MoneyWheel",
    roulette: "Roulette",
    top_card: "TopCard",
    ultimate_texas_holdem: "UTH",
    baccarat: "Baccarat",
  };
  const lobbyNames = getField({ slug, field: "text_fields" })(state);

  if (!lobbyNames) return {};

  return lobbyNames.reduce(
    (acc, { key, value }) => ({
      ...acc,
      [keyToLobbyType[key] || key]: value,
    }),
    {}
  );
};

const slug = "features.live-casino-lobby-names";
export default connect(
  state => {
    const isFetched = isPageFetched(slug)(state);
    const lobbyNamesMap = getLobbyNamesMap(slug, state);
    const { games: gamesIds } = gameListSelector("liveCasinoGames")(state);
    const games = gamesIds.map(gameId => ({
      gameId,
      ...gameSelector(gameId)(state),
    }));
    const gamesList = groupForSectionList(games).map(x => ({
      ...x,
      title: lobbyNamesMap[x.id] || x.id,
    }));

    return {
      gamesList,
      isFetched,
    };
  },
  { launchGame, fetchPageBySlug: () => fetchPageBySlug(slug) }
)(LiveCasinoDetailPage);
