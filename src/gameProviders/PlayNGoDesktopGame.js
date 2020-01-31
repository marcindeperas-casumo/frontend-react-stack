// @flow
import { injectScript } from "Utils";
import { BaseGame } from "./BaseGame";
import { COMMANDS, EVENTS } from "./PlayNGoGame.constants";

// TODO:
// check out context and events
// check out unmount scenario

declare var Engage: {
  request: Function,
  addEventListener: Function,
  removeEventListener: Function,
};

export class PlayNGoDesktopGame extends BaseGame {
  get componentProps() {
    return {
      ...super.componentProps,
      id: "pngCasinoGame",
    };
  }

  onMount() {
    const { url = null } = this.props.gameData;

    if (url) {
      injectScript(url).then(() => {
        // clear out previous engage session to ensure FS work correctly
        Engage.request(COMMANDS.END_GAME);

        Engage.addEventListener(
          EVENTS.ON_GAME_ROUND_START.type,
          this.setGameAsActive.bind(this)
        );
        Engage.addEventListener(
          EVENTS.ON_GAME_ROUND_END.type,
          this.setGameAsIdle.bind(this)
        );
      });
    }
  }

  onUnmount() {
    if (Engage) {
      // clear out previous engage session
      Engage.request(COMMANDS.END_GAME);
      Engage.removeEventListener(
        EVENTS.ON_GAME_ROUND_START.type,
        this.setGameAsActive.bind(this)
      );
      Engage.removeEventListener(
        EVENTS.ON_GAME_ROUND_END.type,
        this.setGameAsIdle.bind(this)
      );
    }
  }

  pauseGame() {
    return new Promise<void>((resolve, reject) => {
      if (Engage) {
        Engage.request(COMMANDS.PAUSE);

        if (this.isGameIdle) {
          resolve();
        } else {
          this.resolveOnIdle(resolve, reject);
        }
      } else {
        reject();
      }
    });
  }

  resumeGame() {
    if (Engage) {
      Engage.request(COMMANDS.RESUME);
    }
  }

  resolveOnIdle(resolve: (result: void) => void, reject: () => void) {
    if (Engage) {
      Engage.addEventListener(EVENTS.ON_GAME_ROUND_END.type, function() {
        resolve();
        Engage.removeEventListener(EVENTS.ON_GAME_ROUND_END.type, this);
      });
    } else {
      reject();
    }
  }
}
