// @flow
import { types as fetchTypes } from "Models/fetch";
import { getReelRacesReq, optInForReelRaceReq } from "Api/api.reelRaces";
import {
  initReelRacesSaga,
  fetchReelRaces,
  optInForReelRace,
} from "./reelRaces.actions";
import { types } from "./reelRaces.constants";

jest.mock("Api/api.reelRaces");

describe("Models/reelRaces/Actions", () => {
  test("initReelRacesSaga()", () => {
    const action = initReelRacesSaga();

    expect(action).toEqual({
      type: types.REEL_RACES_INIT,
    });
  });

  test("fetchReelRaces()", () => {
    const asyncCallData = { playerId: "23" };
    const action = fetchReelRaces(asyncCallData);

    expect(action).toEqual({
      type: fetchTypes.FETCH,
      name: types.FETCH_START,
      asyncCallData,
      asyncCall: getReelRacesReq,
      postFetch: types.FETCH_COMPLETED,
    });
  });

  test("optInForReelRace()", () => {
    const playerId = "23";
    const tournamentId = "13a";
    const state = {
      handshake: {
        app: { "common/composition/session": { id: playerId } },
      },
    };
    const dispatch = jest.fn();
    const getState = () => state;

    jest.fn(optInForReelRaceReq);

    optInForReelRace(tournamentId)(dispatch, getState);

    expect(optInForReelRaceReq).toBeCalledTimes(1);
    expect(optInForReelRaceReq).toBeCalledWith({ playerId, tournamentId });
  });
});
