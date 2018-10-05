import { createSelector } from "reselect";
import { fetchStatusFactory } from "Reducers/fetch/selectors";
import { types as gameTypes } from "Reducers/games";
import { types as handshakeTypes } from "Reducers/handshake";

export const gamesListsPortalFetchStatusSelector = createSelector(
  fetchStatusFactory(gameTypes.FETCH_TOP_LISTS_START),
  fetchStatusFactory(handshakeTypes.FETCH_GAMES_HANDSHAKE),
  (fetchTopListsStatus, fetchGamesHandshakeStatus) => ({
    isFetching:
      fetchTopListsStatus.isFetching || fetchGamesHandshakeStatus.isFetching,
  })
);
