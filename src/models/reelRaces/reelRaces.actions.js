// @flow
import { types as fetchTypes } from "Models/fetch";
import { getReelRacesReq, optInForReelRaceReq } from "Api/api.reelRaces";
import { playerIdSelector } from "Models/handshake";
import { types } from "./reelRaces.constants";

export function initReelRacesSaga() {
  return { type: types.REEL_RACES_INIT };
}

export function fetchReelRaces(asyncCallData: { playerId: string }) {
  return {
    type: fetchTypes.FETCH,
    name: types.FETCH_START,
    asyncCallData,
    asyncCall: getReelRacesReq,
    postFetch: types.FETCH_COMPLETED,
  };
}

export function optInForReelRace(tournamentId: string) {
  return (dispatch: (*) => void, getState: () => {}) => {
    const playerId = playerIdSelector(getState());

    optInForReelRaceReq({ playerId, tournamentId });
  };
}
