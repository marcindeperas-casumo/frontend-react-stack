import { HandshakeResponse } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { createReducer } from "Utils";
import { types } from "./constants";

type TJackpotsReduxStore = HandshakeResponse;

export const DEFAULT_STATE: TJackpotsReduxStore = null;

const handlers = {
  [types.UPDATE_BLUERIBBON_JACKPOTS_HANDSHAKE]: (state, { response }) => ({
    ...state,
    ...response,
  }),
};

export const blueribbonJackpotReducer = createReducer<TJackpotsReduxStore>(
  DEFAULT_STATE,
  handlers
);
