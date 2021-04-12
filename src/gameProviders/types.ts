import type { AppLanguage, AppEnvironment } from "Src/types";
import { PROVIDERS } from "./constants";

export type GameProviderType = ValueOf<typeof PROVIDERS>;

export type IframeGameLaunchData = {
  url: string;
  providerType: string;
  providerName: string;
  isEmbedded?: boolean;
};

export type NetentGameLaunchData = {
  gameId: string;
  gameServer: string;
  width: string;
  casinoId: string;
  sessionId: string;
  isEmbedded?: boolean;
  staticServer: string;
  providerName: string;
  providerType: string;
  height: string;
  url: string;
  lang: string;
};

export type GameLaunchData = IframeGameLaunchData | NetentGameLaunchData;

export type GameRef = {
  current: null | HTMLIFrameElement | HTMLDivElement;
};

export type GameProviderModelProps = {
  gameData: GameLaunchData;
  gameRef: GameRef;
  language: AppLanguage;
  environment: AppEnvironment;
  urlPrefix: string;
  origin?: string;
};

export type IframeGameApiMessage = string | undefined | {};

export type IframeGameApi = {
  commands: {
    pause: IframeGameApiMessage;
    resume: IframeGameApiMessage;
  };
  events: {
    onGameRoundStart: IframeGameApiMessage;
    onGameRoundEnd: IframeGameApiMessage;
  };
  features: {
    instantPause: boolean;
  };
};

export type IframeMessageEvent = {
  data: any;
  origin: string;
};

export type GameProviderModel = {
  props: GameProviderModelProps;
  componentProps: {};
  componentTag: "div" | "iframe";
  onMount: () => void;
  onUnmount: () => void;
  lobbyUrl: string;
  pauseGame: () => Promise<void>;
  resumeGame: () => void;
};

export type TGameUrlParams = {
  key: string;
  value: string;
};

export type TGameUrlProps = {
  url: string;
  paramsToAdd: Array<TGameUrlParams>;
};
