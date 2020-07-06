// @flow
import { BaseIframeGame } from "./BaseIframeGame";

const PUSH_EVENTS = {
  BACK_TO_LOBBY: "gotoLobby",
};

type PushMessage = {
  data: {
    method?: string,
    params?: { type?: string },
  },
  origin: string,
};

export class PushGame extends BaseIframeGame {
  // constructor(props: GameProviderModelProps) {
  //   super(props);
  //   this.api.commands.pause = COMMANDS.PAUSE;
  //   this.api.commands.resume = COMMANDS.RESUME;
  //   this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
  //   this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;
  //   this.targetDomain = "https://cdn.oryxgaming.com";
  // }

  get componentProps() {
    const { url = null } = this.props.gameData;
    const encodedLobbyUrl = encodeURIComponent(super.lobbyUrl);

    if (url) {
      return {
        ...super.componentProps,
        src: `${url}&lobbyUrl=${encodedLobbyUrl}`,
      };
    }

    return super.componentProps;
  }

  onMessageHandler(message: PushMessage) {
    super.onMessageHandler(message);

    if (Boolean(message.data.method)) {
      return;
    }

    if (message.data.method === PUSH_EVENTS.BACK_TO_LOBBY) {
      this.goToLobby();
    }
  }
}
