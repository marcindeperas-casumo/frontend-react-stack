import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { appendToGameUrl } from "./utils";

export const PUSH_GAME_EVENT_TYPE = {
  DISABLE: "disable",
  ENABLE: "enable",
  GO_TO_LOBBY: "gotoLobby",
  GO_TO_ACCOUNT: "gotoAccount",
  GAME_READY: "gameReady",
  GAME_ANIMATION_STARTED: "gamePlayAnimationStarted",
  GAME_ANIMATION_COMPLETE: "gameAnimationComplete",
} as const;

export type PushGameEventTypeLiteral = ValueOf<typeof PUSH_GAME_EVENT_TYPE>;

export interface PushGameEvent {
  method: PushGameEventTypeLiteral;
}

export const PUSH_GAME_COMMANDS = {
  PAUSE: { method: PUSH_GAME_EVENT_TYPE.DISABLE },
  RESUME: { method: PUSH_GAME_EVENT_TYPE.ENABLE },
  BACK_TO_LOBBY: { method: PUSH_GAME_EVENT_TYPE.GO_TO_LOBBY },
};

export const PUSH_GAME_EVENTS = {
  GAME_ROUND_START: PUSH_GAME_EVENT_TYPE.GAME_ANIMATION_STARTED,
  GAME_ROUND_END: PUSH_GAME_EVENT_TYPE.GAME_ANIMATION_COMPLETE,
};

type PushGameMessage = {
  data: {
    method?: PushGameEventTypeLiteral;
    params?: { type?: string };
  };
  origin: string;
};

export class PushGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = PUSH_GAME_COMMANDS.PAUSE;
    this.api.commands.resume = PUSH_GAME_COMMANDS.RESUME;
    this.api.events.onGameRoundStart = PUSH_GAME_EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = PUSH_GAME_EVENTS.GAME_ROUND_END;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: appendToGameUrl({
          url,
          paramsToAdd: [{ key: "lobbyUrl", value: encodedLobbyUrl }],
        }),
      };
    }

    return super.componentProps;
  }

  onMessageHandler(message: PushGameMessage) {
    super.onMessageHandler(message);

    if (message.data.method) {
      return;
    }

    if (message.data.method === PUSH_GAME_EVENT_TYPE.GO_TO_LOBBY) {
      this.goToLobby();
    }
  }
}
