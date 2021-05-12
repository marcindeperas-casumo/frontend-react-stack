import type { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { GAME_ACTIVITY_STATUS_SOURCE } from "./constants";
import { appendToGameUrl } from "./utils";

// msgId: `sw2op${name}`
//op2swProperties
// msgId: "op2swPauseGame",
export const COMMANDS = {
  // The below command is to stop autoplay not pause - but since we use pausing to halt auto play it makes sense to have it live underneath pause command
  PAUSE: JSON.stringify({
    msgId: "op2swProperties",
    autoPlay: false,
  }),
  RESUME: JSON.stringify({
    msgId: "op2swResumeGame",
  }),
  // Below command blocks game ui from any interactions - unfortunately no visible ui changes to inform users of actual pause state - just nothing clickable until resume command
  FREEZE: JSON.stringify({
    msgId: "op2swPauseGame",
  }),
};

export const EVENTS = {
  GAME_ROUND_START: { msgId: "sw2opRound" },
  GAME_ROUND_END: { msgId: "sw2opRound" },
};

export class SkyWindGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.PAUSE;
    this.api.commands.resume = COMMANDS.RESUME;
    this.api.events.onGameRoundStart = EVENTS.GAME_ROUND_START;
    this.api.events.onGameRoundEnd = EVENTS.GAME_ROUND_END;
    this.scrolling = "auto";
    this.gameActivityStatusSource = GAME_ACTIVITY_STATUS_SOURCE.GAME;
  }

  get componentProps() {
    const { url = null } = this.props.gameData;

    if (url) {
      return {
        ...super.componentProps,
        src: appendToGameUrl({
          url,
          paramsToAdd: [{ key: "modules", value: "swmp" }],
        }),
      };
    }

    return super.componentProps;
  }

  parseMessageData(data: any) {
    return JSON.parse(data);
  }

  extractEventId(data: any) {
    return data.msgId;
  }
}
