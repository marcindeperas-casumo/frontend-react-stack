import { HandshakeResponse } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { createReducer } from "Utils";
import { types } from "./constants";

export type TJackpotsReduxStore = {
  handshake: HandshakeResponse;
  eligibleGamesBySlug: {
    [key: string]: string;
  };
};

export const DEFAULT_STATE: TJackpotsReduxStore = {
  handshake: null,
  eligibleGamesBySlug: {},
};

const handlers = {
  [types.UPDATE_BLUERIBBON_JACKPOTS_HANDSHAKE]: (state, { response }) => ({
    ...state,
    ...response,
    eligibleGamesBySlug: (response?.jackpots || []).reduce((acc, jackpot) => {
      return {
        ...acc,
        ...jackpot.matchedGames.reduce((games, game) => {
          return { ...games, [game.slug]: jackpot.jackpotSlug };
        }, {}),
      };
    }, {}),
  }),
};

export const blueribbonJackpotReducer = createReducer<TJackpotsReduxStore>(
  DEFAULT_STATE,
  handlers
);
