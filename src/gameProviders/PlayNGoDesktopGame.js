// @flow
import { injectScript } from "Utils";
import { BaseGame } from "./BaseGame";
import { COMMANDS, EVENTS } from "./PlayNGoGame.constants";

// TODO:
// check out context and events
// check out unmount scenario

type Engage = {
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

  engage: Engage;

  onMount() {
    super.onMount();
    const { url = null } = this.props.gameData;

    if (url) {
      injectScript(url).then(() => {
        this.engage = window.Engage;

        if (this.engage) {
          this.engage.request(COMMANDS.END_GAME);
          this.engage.addEventListener(
            EVENTS.ON_GAME_ROUND_START.type,
            this.setGameAsActive.bind(this)
          );
          this.engage.addEventListener(
            EVENTS.ON_GAME_ROUND_END.type,
            this.setGameAsIdle.bind(this)
          );
        }
      });
    }
  }

  onUnmount() {
    super.onUnmount();
    if (this?.engage) {
      // clear out previous engage session
      this.engage.request(COMMANDS.END_GAME);
      this.engage.removeEventListener(
        EVENTS.ON_GAME_ROUND_START.type,
        this.setGameAsActive.bind(this)
      );
      this.engage.removeEventListener(
        EVENTS.ON_GAME_ROUND_END.type,
        this.setGameAsIdle.bind(this)
      );
    }
  }

  pauseGame() {
    return new Promise<void>((resolve, reject) => {
      if (this.engage) {
        this.engage.request(COMMANDS.PAUSE);

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
    if (this.engage) {
      this.engage.request(COMMANDS.RESUME);
    }
  }

  resolveOnIdle(resolve: (result: void) => void, reject: () => void) {
    if (this.engage) {
      this.engage.addEventListener(EVENTS.ON_GAME_ROUND_END.type, function() {
        resolve();
        this.engage.removeEventListener(EVENTS.ON_GAME_ROUND_END.type, this);
      });
    } else {
      reject();
    }
  }
}
