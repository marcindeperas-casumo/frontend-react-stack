import { createSelector } from "reselect";
import {
  anyPass,
  complement,
  compose,
  defaultTo,
  filter,
  ifElse,
  isEmpty,
  isNil,
  keys,
  prop,
  propOr,
  unless,
} from "ramda";

import { GAME_LIST_IDS } from "Src/constants";
import config from "Src/config";

const { gameListsShowingMaintenanceGames } = config;

// TODO: Add tests for selectors for null states

export const schemaSelector = state => state.schema || {};

export const gameListEntitiesSelector = createSelector(
  schemaSelector,
  state => state.gameList
);

export const gameEntitiesSelector = createSelector(
  schemaSelector,
  state => state.game
);

export const liveTableEntitiesSelector = createSelector(
  schemaSelector,
  state => state.liveTable
);

export const liveCasinoEntitiesSelector = createSelector(
  schemaSelector,
  state => state.liveCasino
);

export const jackpotEntitiesSelector = createSelector(
  schemaSelector,
  state => state.jackpot
);

export const cmsEntitiesSelector = createSelector(schemaSelector, prop("cms"));

export const topListIds = createSelector(gameListEntitiesSelector, keys);

export const areGameListsLoaded = createSelector(
  gameListEntitiesSelector,
  complement(anyPass([isNil, isEmpty]))
);

export const jackpotIdsSelector = createSelector(
  gameListEntitiesSelector,
  compose(
    defaultTo([]),
    prop("games"),
    prop("casumoJackpotGames")
  )
);

export const mustDropJackpotsIdsSelector = createSelector(
  gameListEntitiesSelector,
  compose(
    defaultTo([]),
    prop("games"),
    prop(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)
  )
);

// If the game list does not exist in the state yet, we return null
export const isGameListFetchedFactory = listId =>
  createSelector(
    gameListEntitiesSelector,
    compose(
      defaultTo(false),
      prop("games"),
      prop(listId)
    )
  );

// Question: This could be refactored to the following, there the signature
// matches the parameters that are passed down from the mapStateToProps fn. This
// would make the call site cleaner as we one would just need to pass down the
// selector function to the connect method.
//
// export const topListSelectorById = (state, { listId }) =>
//   createSelector(gameListEntitiesSelector, state => state[listId])(state);
export const topListSelectorById = listId =>
  createSelector(
    gameListEntitiesSelector,
    compose(
      defaultTo({}),
      prop(listId)
    )
  );

export const topListSelectorByQuery = (listId, queryOptions = {}) =>
  createSelector(
    topListSelectorById(listId),
    gameEntitiesSelector,
    (list, gameObjects) => {
      // TODO: Rewrite this to be more generic
      const isNotInMaintenance = id =>
        gameObjects[id].inMaintenanceMode === false;

      const games = compose(
        unless(() => !queryOptions.maintenance, filter(isNotInMaintenance)),
        propOr([], "games")
      )(list);

      return {
        ...list,
        games,
      };
    }
  );

const filterMaintenanceGames = (list, games) => {
  const gameIds = list.games || [];
  const canShowMaintenance = gameListsShowingMaintenanceGames.includes(list.id);
  const isNotInMaintenance = id => games[id].inMaintenanceMode === false;

  if (canShowMaintenance) {
    return gameIds;
  }

  return gameIds.filter(isNotInMaintenance);
};

export const gameListSelector = (listId, options = {}) =>
  createSelector(
    topListSelectorById(listId),
    gameEntitiesSelector,
    (list, allGames) => {
      const gameIds = ifElse(
        options.maintenance,
        () => defaultTo([], list.games),
        () => filterMaintenanceGames(list, allGames)
      );

      // let gameIds = list.games || [];

      // if (options.maintenance === false) {
      // gameIds = filterMaintenanceGames(list, allGames);
      // }

      return {
        ...list,
        games: gameIds,
      };
    }
  );

export const gameSelector = id =>
  createSelector(
    gameEntitiesSelector,
    jackpotEntitiesSelector,
    liveTableEntitiesSelector,
    (gameEntities, jackpotEntities, liveTableEntities) => {
      const game = gameEntities[id] || {};
      const jackpot = jackpotEntities && jackpotEntities[game.jackpotId];
      const liveTable = liveTableEntities && liveTableEntities[game.tableId];

      return {
        ...game,
        ...(jackpot ? { jackpotInfo: jackpot } : {}),
        ...(liveTable ? { lobby: liveTable } : {}),
      };
    }
  );

export const gameListTitleSelectorFactory = listId =>
  createSelector(topListSelectorById(listId), prop("title"));
