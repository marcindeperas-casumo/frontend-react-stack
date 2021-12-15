import { ENVIRONMENTS } from "Src/constants";
import { injectScript } from "Utils";
import { GameProviderModelProps } from "./types";
import { BaseIframeGame } from "./BaseIframeGame";
import { IFRAME_ID } from "./constants";

export const EVOLUTION_SCRIPT_URL = {
  [ENVIRONMENTS.TEST]:
    "https://uat1-casumo.evolutiongaming.com/mobile/js/iframe.js",
  [ENVIRONMENTS.PRODUCTION]: "https://casumo.evo-games.com/mobile/js/iframe.js",
};

export const COMMANDS = {
  STOP_AUTOPLAY: "EVO:STOP_AUTOPLAY",
};

declare const OssGaming: { init: Function };

export class OssGame extends BaseIframeGame {
  constructor(props: GameProviderModelProps) {
    super(props);
    this.api.commands.pause = COMMANDS.STOP_AUTOPLAY;
  }

  get componentProps() {
    return {
      ...super.componentProps,
      style: {
        minHeight: "auto",
        minWidth: "auto",
      },
    };
  }
  onMount() {
    super.onMount();

    injectScript(EVOLUTION_SCRIPT_URL[this.props.environment]).then(() => {
      OssGaming.init({
        iframeId: IFRAME_ID,
        // The offset value should be equal to the height of the playokay bar
        topBar: 48,
        allowFullscreen: true,
      });
    });
  }
}
