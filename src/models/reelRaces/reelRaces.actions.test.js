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
jest.mock("Models/handshake");

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

  test("optInForReelRace()", async () => {
    const playerId = "23";
    const tournamentId = "13a";
    const dispatch = jest.fn();
    const getState = jest.fn();

    const { playerIdSelector } = require("Models/handshake");
    playerIdSelector.mockImplementation(() => playerId);
    jest.fn(optInForReelRaceReq);

    optInForReelRace(tournamentId)(dispatch, getState);

    // $FlowIgnore
    const reqMock = optInForReelRaceReq.mock.calls;

    expect(reqMock.length).toBe(1);
    expect(reqMock[0][0].playerId).toBe(playerId);
    expect(reqMock[0][0].tournamentId).toBe(tournamentId);
  });
});
