// @flow
import type { AppLanguage, AppEnvironment } from "Src/types";
// @ts-expect-error ts-migrate(1149) FIXME: File name '/Users/michalmokijewski/Projects/casumo... Remove this comment to see the full error message
import { PROVIDERS } from "./constants";

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
export type GameProviderType = $Values<typeof PROVIDERS>;

export type IframeGameLaunchData = {|
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'url'.
  url: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'providerType'.
  providerType: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'providerName'.
  providerName: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'isEmbedded'.
  isEmbedded?: boolean,
|};

export type NetentGameLaunchData = {|
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'gameId'.
  gameId: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'gameServer'.
  gameServer: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'width'.
  width: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'casinoId'.
  casinoId: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'sessionId'.
  sessionId: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'isEmbedded'.
  isEmbedded?: boolean,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'staticServer'.
  staticServer: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'providerName'.
  providerName: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'providerType'.
  providerType: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'height'.
  height: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'lang'.
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
  origin?: string,
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

export type TGameUrlParams = {
  key: string,
  value: string,
};

export type TGameUrlProps = {
  url: string,
  paramsToAdd: Array<TGameUrlParams>,
};
