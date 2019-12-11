// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

export class ThunderkickGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = { eventid: "pausegame" };
    this.api.commands.resume = { eventid: "resumegame" };
    this.api.events.onGameRoundStart = { eventid: "roundstarted" };
    this.api.events.onGameRoundEnd = { eventid: "roundended" };
    this.api.features.instantPause = true;
  }

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

  parseMessageData(data: any) {
    return JSON.parse(data);
  }

  extractEventId(data: any) {
    return data.eventid;
  }
}
