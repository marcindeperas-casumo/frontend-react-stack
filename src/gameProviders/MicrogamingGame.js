// @flow
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

// ISSUES:
// concern with multiple target domains (ref to targetDomain)

export class MicrogamingGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = "StopGamePlay";
    this.api.events.onGameRoundStart = { event: "gameBusy" };
    this.api.events.onGameRoundEnd = { event: "gameNotBusy" };
    this.targetDomain = "https://mobile2.gameassists.co.uk";
  }

  get componentProps() {
    return {
      ...super.componentProps,
      scrolling: "no",
    };
  }

  parseMessageData(data: any) {
    return JSON.parse(data);
  }

  extractEventId(data: any) {
    return data.event;
  }
}
