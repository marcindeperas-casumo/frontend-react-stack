// @flow
import { ENVIRONMENTS } from "Src/constants";
import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";

// ISSUES:
// concern with multiple target domains (ref to targetDomain)

export const TARGET_DOMAINS = {
  [ENVIRONMENTS.TEST]: "https://mobile32.gameassists.co.uk",
  [ENVIRONMENTS.PRODUCTION]: "https://mobile2.gameassists.co.uk",
};

export class MicrogamingGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = "StopGamePlay";
    this.api.events.onGameRoundStart = { event: "gameBusy" };
    this.api.events.onGameRoundEnd = { event: "gameNotBusy" };
    this.targetDomain = TARGET_DOMAINS[this.props.environment];
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
