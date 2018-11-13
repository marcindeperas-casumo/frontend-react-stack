import { compose, prop, keys, defaultTo } from "ramda";
import { createSelector } from "reselect";
import config from "../../../config";

const { gameListsShowingMaintenanceGames } = config;

export const schemaSelector = state => state.schema || {};

// TODO: Add tests for selectors for null states

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

export const jackpotIdsSelector = createSelector(
  gameListEntitiesSelector,
  compose(
    defaultTo([]),
    prop("games"),
    prop("casumoJackpotGames")
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
      const games =
        queryOptions.maintenance === false
          ? (list.games || []).filter(isNotInMaintenance)
          : list.games;

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
      let gameIds = list.games || [];

      if (options.maintenance === false) {
        gameIds = filterMaintenanceGames(list, allGames);
      }

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
