// @flow
import { types as fetchTypes } from "Models/fetch";
import { getReelRacesReq } from "Api/api.reelRaces";
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
    const tournamentId = "13a";
    const dispatch = jest.fn();
    const getState = jest.fn();
    await optInForReelRace(tournamentId)(dispatch, getState);
    expect(dispatch).toBeCalledWith({
      payload: {
        reelRaces: {
          "13a": {
            opted: true,
          },
        },
      },
      type: "SCHEMA/MERGE_ENTITY",
    });
  });
});
