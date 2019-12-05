// @flow

import { PROVIDERS } from "./constants";

export type GameProviderType = $Values<typeof PROVIDERS>;

export type IframeGameLaunchData = {|
  url: string,
  providerType: string,
  providerName: string,
|};

export type NetentGameLaunchData = {|
  gameId: string,
  gameServer: string,
  width: string,
  casinoId: string,
  sessionId: string,
  staticServer: string,
  providerName: string,
  providerType: string,
  height: string,
|};

export type GameLaunchData = IframeGameLaunchData | NetentGameLaunchData;

export type GameRef = { current: null | HTMLIFrameElement | HTMLDivElement };

export type GameProviderModelProps = {
  gameData: GameLaunchData,
  gameRef: GameRef,
  language: string,
  environment: string,
};

export type IframeGameApiMessage = ?string | ?{};

export type IframeGameAPI = {
  commands: {
    pause: IframeGameApiMessage,
    resume: IframeGameApiMessage,
  },
  events: {
    onGameRoundStart: IframeGameApiMessage,
    onGameRoundEnd: IframeGameApiMessage,
  },
  features: {
    instantPause: boolean,
  },
};

export type IframeMessageEvent = {
  data: any,
  origin: string,
};
