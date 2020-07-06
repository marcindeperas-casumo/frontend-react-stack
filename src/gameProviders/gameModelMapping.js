// @flow
import type { GameProviderType, GameRef, GameProviderModel } from "./types";
import { PROVIDERS } from "./constants";
import { BaseGame } from "./BaseGame";
import { BaseIframeGame } from "./BaseIframeGame";
import { EdictGame } from "./EdictGame";
import { EvolutionGame } from "./EvolutionGame";
import { NetentGame } from "./NetentGame";
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

export type GameProps = {
  providerType: GameProviderType,
};

export const models = {
  [PROVIDERS.EDICT_DESKTOP]: EdictGame,
  [PROVIDERS.EDICT_MOBILE]: EdictGame,
  [PROVIDERS.EVOLUTION_DESKTOP]: BaseIframeGame,
  [PROVIDERS.EVOLUTION_MOBILE]: EvolutionGame,
  [PROVIDERS.GREENTUBE_HTML5]: GreentubeGame,
  [PROVIDERS.MICROGAMING_FLASH]: MicrogamingGame,
  [PROVIDERS.MICROGAMING_HTML5]: MicrogamingGame,
  [PROVIDERS.ORYX_DESKTOP]: OryxGame,
  [PROVIDERS.ORYX_MOBILE]: OryxGame,
  [PROVIDERS.NETENT]: NetentGame,
  [PROVIDERS.NETENT_FLASH]: NetentGame,
  [PROVIDERS.NETENT_LIVE]: NetentGame,
  [PROVIDERS.NETENT_GAME_INCLUSION]: NetentGame,
  [PROVIDERS.NYX_HTML5]: NyxGame,
  [PROVIDERS.NYX_FLASH]: BaseIframeGame,
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
  [PROVIDERS.CASUMO_HTML5]: CasumoGame,
  [PROVIDERS.RGS_HTML5]: BaseIframeGame,
  [PROVIDERS.RGS_FLASH]: BaseIframeGame,
  [PROVIDERS.PUSHGAMING_MOBILE]: PushGame,
};

export const getGameModel = (
  gameData: GameProps,
  gameRef: GameRef,
  language: string,
  environment: string
): GameProviderModel => {
  const GameModel = models[gameData.providerType] || BaseGame;

  return new GameModel({ gameData, gameRef, language, environment });
};
