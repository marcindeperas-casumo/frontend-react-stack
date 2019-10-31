import {
  complement,
  compose,
  isNil,
  prop,
  path,
  pluck,
  head,
  pipe,
  sort,
  isEmpty,
} from "ramda";
import * as gamebrowserApi from "Api/api.gamebrowser";
import {
  getCasinoPlayerGameList,
  getCasinoPlayerGamesBatch,
} from "Api/api.casinoPlayerGames";
import { GAME_LIST_IDS } from "Src/constants";
import { getJackpots } from "Api/api.jackpots";
import { getSuggestedGames } from "Api/api.gameSuggest";
import { convertHTMLToString } from "Utils";

const getLatestPlayedGame = async latestPlayedGamesPromise => {
  const latestPlayedGamesResolved = await latestPlayedGamesPromise;

  if (!latestPlayedGamesResolved) {
    return null;
  }

  return head(latestPlayedGamesResolved.games);
};

export const fetchSuggestedGames = async ({
  handshake,
  platform,
  country,
  game,
  variant = "default",
}) => {
  const { id, title } = handshake.gamesLists.suggestedGames || {};

  if (!game || !id) {
    return {};
  }

  const slugs = await getSuggestedGames({ gameSlug: game.slug });

  if (!slugs.length) {
    return {};
  }

  const games = await gamebrowserApi
    .getGamesBySlugs({
      platform,
      country,
      variant,
      slugs,
    })
    .then(
      pipe(
        prop("games"),
        // resort to ensure we've got proper order
        sort((game1, game2) => {
          return slugs.indexOf(game1.slug) - slugs.indexOf(game2.slug);
        })
      )
    );

  return {
    games,
    id,
    // The following needs to be decoupled from here also. If we wanna use fetchSuggestedGames for
    // different purposes we need to be able to choose between different string
    // https://github.com/Casumo/Home/issues/27736
    // eslint-disable-next-line no-template-curly-in-string
    title: title.replace("${GAME_NAME}", convertHTMLToString(game.name)),
  };
};

const fetchMyListGames = async ({ sessionId }) => {
  const myList = await getCasinoPlayerGameList({
    gameListName: GAME_LIST_IDS.MY_LIST,
    sessionId,
  });

  if (!myList || myList.gameIds.length === 0) {
    return null;
  }
  // Games batch endpoint explodes if passed more than 100 items.
  const GAMES_BATCH_LIMIT = 99;

  const games = await getCasinoPlayerGamesBatch({
    ids: myList.gameIds.slice(0, GAMES_BATCH_LIMIT),
    sessionId,
  }).then(myListGames =>
    myListGames.map(game => ({
      hasPlayForFun: game.hasPlayForFun,
      inMaintenanceMode: game.inMaintenance,
      jackpotId: isEmpty(game.jackpotIds) ? null : head(game.jackpotIds),
      logo: game.logo,
      logoBackground: game.backgroundImage,
      name: game.title,
      slug: game.slug,
      tableId: game.liveCasinoId,
    }))
  );

  const { name: id, title } = myList;

  return { games, id, title };
};

const fetchLatestPlayedGames = async ({
  variant = "default",
  handshake,
  country,
  platform,
  playerId,
} = {}) => {
  const latestPlayedProviderGameNames = await gamebrowserApi.getLatestPlayedGames(
    {
      playerId,
      pageSize: 20,
    }
  );

  if (
    !latestPlayedProviderGameNames ||
    latestPlayedProviderGameNames.length === 0
  ) {
    return null;
  }

  const { id, title } = handshake.gamesLists.latestPlayedGames;
  const games = await gamebrowserApi
    .getGamesByProviderGameNames({
      country,
      platform,
      variant,
      providerGameNames: pluck("gameName", latestPlayedProviderGameNames),
    })
    .then(prop("games"));
  return { games, id, title };
};

const createAllLiveGamesMap = allLiveGamesList =>
  allLiveGamesList.reduce(
    (acc, game) => ({
      ...acc,
      [game.tableId]: game,
    }),
    {}
  );

/**
 * TODO(mm): i think we should fallback to some default/other size if this
 * thumbnail isn't available
 */
const getImageForTable = path(["videoSnapshot", "thumbnails", "L"]);

export const normalizeTableData = (currency, table) => ({
  tableId: table.tableId,
  type: table.gameType,
  image: getImageForTable(table),
  bets: table.betLimits[currency],
  players: table.players,
  results: table.results || table.history || null,
  betBehind: table.betBehind || null,
  seats: table.seatsTaken ? table.seats - table.seatsTaken.length : null,
  provider: table.provider,
});

const getLiveGames = async ({ currency, allLiveGamesList }) => {
  const allLiveGamesById = createAllLiveGamesMap(allLiveGamesList);

  const liveCasinoTables = await gamebrowserApi.getLiveCasinoTable({
    ids: pluck("tableId", allLiveGamesList),
    currency,
  });

  return liveCasinoTables
    .filter(({ open }) => Boolean(open))
    .map(table => ({
      ...allLiveGamesById[table.tableId],
      lobby: normalizeTableData(currency, table),
    }));
};

const handleListsFetchErrors = promises => {
  return promises.map(p =>
    p.catch(e => {
      console.error("Caught error: ", e);

      // fallback to no data which leads to not showing a list
      return {};
    })
  );
};

export const fetchJackpots = async ({ market, currency }) => {
  try {
    const { jackpots } = await getJackpots({
      market,
      currencyCode: currency,
    });

    return jackpots;
  } catch (e) {
    return [];
  }
};

export const fetchGames = async ({
  platform,
  country,
  currency,
  market,
  playerId,
  handshake,
  sessionId,
}) => {
  const gameListsRequests = handshake.topListIds
    .map(id => prop(id, handshake.gamesLists))
    .filter(complement(isNil))
    .map(async ({ title, id, variants, variant = "default" }) => {
      const gamesLists = await gamebrowserApi
        .getGameLists({
          id,
          variant,
          platform,
          country,
          page: 0,
          pageSize: 20,
        })
        .then(prop("games"));

      if (id === "liveCasinoGames") {
        try {
          /**
           * It might be confusing, here gamesList contains all available live
           * games and additional logic is required to filter out games that are
           * currently live and get additional data (ie. thumbnails).
           */
          const liveGames = await getLiveGames({
            currency,
            allLiveGamesList: gamesLists,
          });

          return {
            games: liveGames,
            id,
            title,
          };
        } catch (e) {
          console.error(
            "Something went wrong while handling live casino games",
            e
          );
          return {};
        }
      }

      return {
        games: gamesLists,
        id,
        title,
      };
    });
  const myListGames = fetchMyListGames({ sessionId });
  const latestPlayedGames = fetchLatestPlayedGames({
    handshake,
    country,
    platform,
    playerId,
  });
  const game = await getLatestPlayedGame(latestPlayedGames);
  const suggestedGames = fetchSuggestedGames({
    handshake,
    platform,
    country,
    game,
  });
  const hasSomeGames = compose(
    i => i > 0,
    path(["games", "length"])
  );
  const allListsResponses = (await Promise.all(
    handleListsFetchErrors([
      myListGames,
      latestPlayedGames,
      suggestedGames,
      ...gameListsRequests,
    ])
  )).filter(hasSomeGames);

  const jackpots = await fetchJackpots({ market, currency });

  return {
    gameLists: allListsResponses,
    jackpots,
  };
};
