import { BaseIframeGame } from "./BaseIframeGame";
import { appendToGameUrl } from "./utils";
import type { GameProviderModelProps, IframeMessageEvent } from "./types";

export const COMMANDS = {
  PAUSE: { id: "stopAutoplay" },
};
export const EVENTS = {
  onGameRoundStart: "gameAnimationStart",
  onGameRoundEnd: "gameAnimationComplete",
};
export class NyxGame extends BaseIframeGame {
  targetDomain = "*"; // This is needed for sending events to iframe

  constructor(props: GameProviderModelProps) {
    super(props);

    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.events = EVENTS;
  }

  get componentProps() {
    const { url = null, isEmbedded } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: !isEmbedded
          ? appendToGameUrl({
              url,
              paramsToAdd: [{ key: "lobbyUrl", value: encodedLobbyUrl }],
            })
          : "",
      };
    }

    return super.componentProps;
  }

  parseMessageData(data: { gcmevent: string }) {
    return data.gcmevent;
  }

  // On test env gameData.url doesn't match origin of the events. This combined
  // with targetDomain set to * is workaround for bad API
  messageGuard(event: IframeMessageEvent) {
    this.onMessageHandler(event);
  }
}
