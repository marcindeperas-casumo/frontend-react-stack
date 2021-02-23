// @flow
import { types as fetchTypes } from "Models/fetch";
import {
  getAdventurerDetailsReq,
  getAdventurerProgressionReq,
} from "Api/api.adventure";
import {
  initAdventurerSaga,
  fetchAdventurerDetails,
  fetchAdventurerProgression,
} from "./adventure.actions";
import { actionTypes } from "./adventure.constants";

jest.mock("Api/api.adventure");
jest.mock("Models/handshake");

describe("Models/adventure/Actions", () => {
  test("initAdventurerSaga()", () => {
    const action = initAdventurerSaga();

    expect(action).toEqual({
      type: actionTypes.ADVENTURER_INIT,
    });
  });

  test("fetchAdventurerDetails()", () => {
    const asyncCallData = { playerId: "1" };
    const action = fetchAdventurerDetails(asyncCallData);

    expect(action).toEqual({
      type: fetchTypes.FETCH,
      name: actionTypes.ADVENTURER_DETAILS_FETCH_START,
      asyncCallData,
      asyncCall: getAdventurerDetailsReq,
      postFetch: actionTypes.ADVENTURER_DETAILS_FETCH_COMPLETED,
    });
  });

  test("fetchAdventurerProgression()", () => {
    const asyncCallData = { playerId: "1" };
    const action = fetchAdventurerProgression(asyncCallData);

    expect(action).toEqual({
      type: fetchTypes.FETCH,
      name: actionTypes.ADVENTURER_PROGRESSION_FETCH_START,
      asyncCallData,
      asyncCall: getAdventurerProgressionReq,
      postFetch: actionTypes.ADVENTURER_PROGRESSION_FETCH_COMPLETED,
    });
  });
});
