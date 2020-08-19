// @flow

import { ENVIRONMENTS } from "Src/constants";
import { injectScript } from "Utils";
import { BaseIframeGame } from "./BaseIframeGame";
import { IFRAME_ID } from "./constants";

export const EVOLUTION_SCRIPT_URL = {
  [ENVIRONMENTS.TEST]:
    "https://uat1-casumo.evolutiongaming.com/mobile/js/iframe.js",
  [ENVIRONMENTS.PRODUCTION]:
    "https://evo-livecasino.casumo.com/mobile/js/iframe.js",
};

declare var EvolutionGaming: { init: Function };

export class EvolutionGame extends BaseIframeGame {
  swipeUpToPlayPanelPossible = true;

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
      EvolutionGaming.init({
        iframeId: IFRAME_ID,
        // The offset value should be equal to the height of the playokay bar
        topBar: 48,
        allowFullscreen: true,
      });
    });
  }
}
