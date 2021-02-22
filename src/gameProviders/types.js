// @flow
import type { AppLanguage, AppEnvironment } from "Src/types";
import { PROVIDERS } from "./constants";

export type GameProviderType = $Values<typeof PROVIDERS>;

export type IframeGameLaunchData = {|
  url: string,
  providerType: string,
  providerName: string,
  isEmbedded?: boolean,
|};

export type NetentGameLaunchData = {|
  gameId: string,
  gameServer: string,
  width: string,
  casinoId: string,
  sessionId: string,
  isEmbedded?: boolean,
  staticServer: string,
  providerName: string,
  providerType: string,
  height: string,
  lang: string,
|};

export type GameLaunchData = IframeGameLaunchData | NetentGameLaunchData;

export type GameRef = {
  current: null | HTMLIFrameElement | HTMLDivElement,
};

export type GameProviderModelProps = {
  gameData: GameLaunchData,
  gameRef: GameRef,
  language: AppLanguage,
  environment: AppEnvironment,
  urlPrefix: string,
};

export type IframeGameApiMessage = ?string | ?{};

export type IframeGameApi = {
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

export type GameProviderModel = {
  props: GameProviderModelProps,
  componentProps: {},
  componentTag: "div" | "iframe",
  onMount: () => {},
  onUnmount: () => {},
  lobbyUrl: string,
  pauseGame: () => Promise<void>,
  resumeGame: () => {},
};

export type GameUrlParams = {
  key: string,
  value: string,
};

export type GameUrlProps = {
  url: string,
  paramsToAdd: Array<GameUrlParams>,
};
