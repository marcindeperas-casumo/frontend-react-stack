// @flow
import { types as fetchTypes } from "Models/fetch";
import {
  getAdventurerDetailsReq,
  getAdventurerProgressionReq,
} from "Api/api.adventure";
import { actionTypes } from "./adventure.constants";

export function initAdventurerSaga() {
  return { type: actionTypes.ADVENTURER_INIT };
}

export function fetchAdventurerDetails(asyncCallData: { playerId: string }) {
  return {
    type: fetchTypes.FETCH,
    name: actionTypes.ADVENTURER_DETAILS_FETCH_START,
    asyncCallData,
    asyncCall: getAdventurerDetailsReq,
    postFetch: actionTypes.ADVENTURER_DETAILS_FETCH_COMPLETED,
  };
}

export function fetchAdventurerProgression(asyncCallData: {
  playerId: string,
}) {
  return {
    type: fetchTypes.FETCH,
    name: actionTypes.ADVENTURER_PROGRESSION_FETCH_START,
    asyncCallData,
    asyncCall: getAdventurerProgressionReq,
    postFetch: actionTypes.ADVENTURER_PROGRESSION_FETCH_COMPLETED,
  };
}
