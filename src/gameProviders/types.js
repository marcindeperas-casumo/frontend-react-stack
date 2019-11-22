// @flow

import { PROVIDERS } from "./constants";

export type GameProviderType = $Values<typeof PROVIDERS>;

export type IframeGameLaunchData = {
  url: string,
  providerType: string,
  providerName: string,
};

export type NetentGameLaunchData = {
  url: ?string,
  gameId: string,
  gameServer: string,
  width: string,
  casinoId: string,
  sessionId: string,
  staticServer: string,
  providerName: string,
  providerType: string,
  height: string,
};

export type GameRef = { current: null | HTMLIFrameElement | HTMLDivElement };
