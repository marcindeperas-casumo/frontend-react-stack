import {
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

export const winAnimationRunning = winAnimationStatus => ({
  type: types.WIN_ANIMATION_RUNNING,
  name: types.WIN_ANIMATION_RUNNING,
  winAnimationStatus,
});
