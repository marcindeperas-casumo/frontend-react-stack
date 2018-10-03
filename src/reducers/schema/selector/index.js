import { createSelector } from "reselect";

export const schemaSelector = state => state.schema;

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

export const topListIds = createSelector(gameListEntitiesSelector, state => ({
  listIds: Object.keys(state),
}));

export const gameSelector = id =>
  createSelector(
    gameEntitiesSelector,
    jackpotEntitiesSelector,
    liveTableEntitiesSelector,
    (gameEntities, jackpotEntities, liveTableEntities) => {
      const game = gameEntities[id];
      const jackpot = jackpotEntities[game.jackpotId];
      const liveTable = liveTableEntities[game.tableId];

      return {
        ...game,
        jackpotInfo: jackpot,
        lobby: liveTable,
      };
    }
  );
