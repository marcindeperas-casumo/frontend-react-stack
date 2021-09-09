import { includes } from "ramda";
import type { GameProviderType, GameRef, GameProviderModel } from "./types";
import { PROVIDERS } from "./constants";
import { BaseGame } from "./BaseGame";
import { BaseIframeGame } from "./BaseIframeGame";
import { EdictGame } from "./EdictGame";
import { EvolutionGame } from "./EvolutionGame";
import { EmbeddedEvolutionGame } from "./EmbeddedEvolutionGame";
import { NetentGame } from "./NetentGame";
import { EmbeddedNetentGame } from "./EmbeddedNetentGame";
import { ThunderkickGame } from "./ThunderkickGame";
import { YggdrasilGame } from "./YggdrasilGame";
import { RedTigerGame } from "./RedTigerGame";
import { OryxGame } from "./OryxGame";
import { PushGame } from "./PushGame";
import { MicrogamingGame } from "./MicrogamingGame";
import { GreentubeGame } from "./GreentubeGame";
import { RelaxGame } from "./RelaxGame";
import { PlayNGoDesktopGame } from "./PlayNGoDesktopGame";
import { PlayNGoMobileGame } from "./PlayNGoMobileGame";
import { CasumoGame } from "./CasumoGame";
import { NyxGame } from "./NyxGame";
import { PragmaticGame } from "./PragmaticGame";
import { MahjongGame } from "./MahjongGame";
import { LeapGame } from "./LeapGame";
import { SkyWindGame } from "./SkyWindGame";
import { PlaytechGame } from "./PlaytechGame";

export type GameProps = {
  providerType: GameProviderType;
  url?: string;
};

export const models = {
  [PROVIDERS.EDICT_DESKTOP]: EdictGame,
  [PROVIDERS.EDICT_MOBILE]: EdictGame,
  [PROVIDERS.EVOLUTION_DESKTOP]: BaseIframeGame,
  [PROVIDERS.EVOLUTION_MOBILE]: EvolutionGame,
  [PROVIDERS.EVOLUTION_IOS_EMBEDDED]: EmbeddedEvolutionGame,
  [PROVIDERS.GREENTUBE_HTML5]: GreentubeGame,
  [PROVIDERS.MICROGAMING_FLASH]: MicrogamingGame,
  [PROVIDERS.MICROGAMING_HTML5]: MicrogamingGame,
  [PROVIDERS.ORYX_DESKTOP]: OryxGame,
  [PROVIDERS.ORYX_MOBILE]: OryxGame,
  [PROVIDERS.NETENT]: NetentGame,
  [PROVIDERS.NETENT_FLASH]: NetentGame,
  [PROVIDERS.NETENT_LIVE]: NetentGame,
  [PROVIDERS.NETENT_GAME_INCLUSION]: NetentGame,
  [PROVIDERS.NETENT_EMBEDDED]: EmbeddedNetentGame,
  [PROVIDERS.NYX_HTML5]: NyxGame,
  [PROVIDERS.NYX_FLASH]: NyxGame,
  [PROVIDERS.PLAYNGO_DESKTOP]: PlayNGoDesktopGame,
  [PROVIDERS.PLAYNGO_MOBILE]: PlayNGoMobileGame,
  [PROVIDERS.THUNDERKICK_DESKTOP]: ThunderkickGame,
  [PROVIDERS.THUNDERKICK_MOBILE]: ThunderkickGame,
  [PROVIDERS.YGGDRASIL_DESKTOP]: YggdrasilGame,
  [PROVIDERS.YGGDRASIL_MOBILE]: YggdrasilGame,
  [PROVIDERS.REDTIGER_DESKTOP]: RedTigerGame,
  [PROVIDERS.REDTIGER_MOBILE]: RedTigerGame,
  [PROVIDERS.RELAX_IFRAME]: RelaxGame,
  [PROVIDERS.RELAX_HTML5]: RelaxGame,
  [PROVIDERS.QUICKSPIN]: RelaxGame,
  [PROVIDERS.CASUMO_HTML5]: CasumoGame,
  [PROVIDERS.RGS_HTML5]: BaseIframeGame,
  [PROVIDERS.RGS_FLASH]: BaseIframeGame,
  [PROVIDERS.PUSHGAMING_MOBILE]: PushGame,
  [PROVIDERS.PUSHGAMING_DESKTOP]: PushGame,
  [PROVIDERS.PLAYTECH_DESKTOP]: PlaytechGame,
  [PROVIDERS.PLAYTECH_MOBILE]: PlaytechGame,
  [PROVIDERS.PRAGMATIC_DESKTOP]: PragmaticGame,
  [PROVIDERS.PRAGMATIC_MOBILE]: PragmaticGame,
  [PROVIDERS.MAHJONG_DESKTOP]: MahjongGame,
  [PROVIDERS.MAHJONG_MOBILE]: MahjongGame,
  [PROVIDERS.LEAP]: LeapGame,
  [PROVIDERS.SKYWIND]: SkyWindGame,
};

export const getGameModel = (
  gameData: GameProps,
  gameRef: GameRef,
  language: string,
  environment: string,
  urlPrefix: string
): GameProviderModel => {
  const GameModel = models[gameData.providerType] || BaseGame;

  // Reconstruct netent gamedata payload from QS to json
  const isNetent = () => {
    return includes(gameData?.providerType, [
      PROVIDERS.NETENT_LIVE,
      PROVIDERS.NETENT_GAME_INCLUSION,
      PROVIDERS.NETENT_FLASH,
      PROVIDERS.NETENT,
    ]);
  };

  const deconstructNetentURL = () => {
    const params = new URLSearchParams(gameData.url);
    const obj = {};
    /* eslint-disable fp/no-mutation */
    // iterate over all keys
    // eslint-disable-next-line fp/no-loops
    for (const key of params.keys()) {
      if (key in obj) {
        continue;
      }
      const value = params.getAll(key);

      obj[key] = value.length > 1 ? value : value[0];
      /* eslint-enable fp/no-mutation */
    }
    return obj;
  };

  const netEntGameData =
    isNetent() && gameData?.url ? deconstructNetentURL() : null;

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'BaseGame | YggdrasilGame' is not assignable ... Remove this comment to see the full error message
  return new GameModel({
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'GameProps' is not assignable to type 'GameLa... Remove this comment to see the full error message
    gameData: netEntGameData || gameData,
    gameRef,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'AppLangua... Remove this comment to see the full error message
    language,
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'AppEnviro... Remove this comment to see the full error message
    environment,
    urlPrefix,
    origin: window.location.origin,
  });
};
