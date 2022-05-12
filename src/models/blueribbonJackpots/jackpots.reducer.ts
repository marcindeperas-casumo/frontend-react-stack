import {
  ComposedJackpot,
  HandshakeResponse,
  PotObject,
} from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { createReducer } from "Utils";
import { types } from "./constants";

export type TJackpotsReduxStore = {
  handshake: HandshakeResponse;
  eligibleGamesBySlug: {
    [key: string]: string;
  };
  blueRibbonjackpots: {
    [key: string]: {
      potsObject: {
        [key: string]: PotObject;
      };
      composedJackpot: ComposedJackpot;
    };
  };
  sdkPots: {};
};

const DEFAULT_STATE: TJackpotsReduxStore = {
  handshake: null,
  eligibleGamesBySlug: {},
  blueRibbonjackpots: {},
  sdkPots: {},
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

const formatPot = (state, action) => pot => {
  const jackpotSlug = action.jackpot.slug;
  const value = state.blueRibbonjackpots[
    jackpotSlug
  ]?.composedJackpot?.pots.find(statePot => statePot.potKey === pot.potKey)
    .value;

  const newValue = pot?.value || value;

  return {
    ...pot,
    value: newValue,
    isLoading: !newValue,
  };
};

const handlers = {
  [types.UPDATE_BLUERIBBON_JACKPOTS_HANDSHAKE]: (state, { response }) => ({
    ...state,
    handshake: response,
    eligibleGamesBySlug: handshakeToGameJackpotSlugMapper(
      response?.jackpots || []
    ),
  }),
  [types.SET_BLUE_RIBBON_JACKPOTS]: (state: TJackpotsReduxStore, action) => {
    const jackpotSlug = action.jackpot.slug;
    const newPotsObject = {
      ...(jackpotSlug in state.blueRibbonjackpots
        ? state.blueRibbonjackpots[jackpotSlug].potsObject
        : {}),
      ...action.jackpot.pots,
    };

    return {
      ...state,
      blueRibbonjackpots: {
        ...state.blueRibbonjackpots,
        [jackpotSlug]: {
          potsObject: newPotsObject,
          composedJackpot: {
            ...action.jackpot,
            pots: action.jackpot.pots.map(formatPot(state, action)),
          },
        },
      },
    };
  },
  [types.SET_SDK_POTS]: (state: TJackpotsReduxStore, action) => ({
    ...state,
    sdkPots: {
      ...state.sdkPots,
      [action.jackpotPotState.potId]: action.jackpotPotState,
    },
  }),
};

export const blueribbonJackpotReducer = createReducer<TJackpotsReduxStore>(
  DEFAULT_STATE,
  handlers
);
