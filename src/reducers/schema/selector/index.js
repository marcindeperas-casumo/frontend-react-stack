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

// Question: This could be refactored to the following, there the signature
// matches the parameters that are passed down from the mapStateToProps fn. This
// would make the call site cleaner as we one would just need to pass down the
// selector function to the connect method.
//
// export const topListSelectorById = (state, { listId }) =>
//   createSelector(gameListEntitiesSelector, state => state[listId])(state);
export const topListSelectorById = listId =>
  createSelector(gameListEntitiesSelector, state => state[listId]);

export const gameSelector = id =>
  createSelector(
    gameEntitiesSelector,
    jackpotEntitiesSelector,
    liveTableEntitiesSelector,
    (gameEntities, jackpotEntities, liveTableEntities) => {
      const game = gameEntities[id];
      const jackpot = jackpotEntities && jackpotEntities[game.jackpotId];
      const liveTable = liveTableEntities && liveTableEntities[game.tableId];

      return {
        ...game,
        jackpotInfo: jackpot,
        lobby: liveTable,
      };
    }
  );
