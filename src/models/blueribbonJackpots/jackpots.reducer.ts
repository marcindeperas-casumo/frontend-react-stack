import { HandshakeResponse } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { createReducer } from "Utils";
import { types } from "./constants";

export type TJackpotsReduxStore = {
  handshake: HandshakeResponse;
  eligibleGamesBySlug: {
    [key: string]: string;
  };
};

const DEFAULT_STATE: TJackpotsReduxStore = {
  handshake: null,
  eligibleGamesBySlug: {},
};

export const handshakeToGameJackpotSlugMapper = jackpots =>
  jackpots.reduce((acc, jackpot) => {
    return {
      ...acc,
      ...jackpot.matchedGames.reduce((games, game) => {
        return { ...games, [game.slug]: jackpot.jackpotSlug };
      }, {}),
    };
  }, {});

const handlers = {
  [types.UPDATE_BLUERIBBON_JACKPOTS_HANDSHAKE]: (state, { response }) => ({
    ...state,
    handshake: response,
    eligibleGamesBySlug: handshakeToGameJackpotSlugMapper(
      response?.jackpots || []
    ),
  }),
};

export const blueribbonJackpotReducer = createReducer<TJackpotsReduxStore>(
  DEFAULT_STATE,
  handlers
);