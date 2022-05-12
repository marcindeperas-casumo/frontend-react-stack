import {
  ComposedJackpot,
  HandshakeResponse,
  urls,
} from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import http from "Lib/http";
import { types as fetchTypes } from "Models/fetch";
import { types } from "./constants";

const fetchBlueRibbonJackpotHandshakeCall = (): Promise<HandshakeResponse> =>
  http.get(urls.handshake);

export const fetchBlueRibbonHandshake = () => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_BLUERIBBON_JACKPOTS_HANDSHAKE,
  asyncCall: fetchBlueRibbonJackpotHandshakeCall,
  postFetch: types.UPDATE_BLUERIBBON_JACKPOTS_HANDSHAKE,
});

export const setBlueRibbonJackpots = (jackpot: ComposedJackpot) => ({
  type: types.SET_BLUE_RIBBON_JACKPOTS,
  jackpot,
});

export const setSdkPots = jackpotPotState => ({
  type: types.SET_SDK_POTS,
  jackpotPotState,
});
