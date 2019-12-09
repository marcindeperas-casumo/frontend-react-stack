// @flow
import type { GameProviderType, GameRef } from "./types";
import { PROVIDERS } from "./constants";
import { BaseGame } from "./BaseGame";
import { EdictGame } from "./EdictGame";
import { NetentGame } from "./NetentGame";
import { ThunderkickGame } from "./ThunderkickGame";
import { YggdrasilGame } from "./YggdrasilGame";
import { RedTigerGame } from "./RedTigerGame";
import { CasumoGame } from "./CasumoGame";

export type GameProps = {
  providerType: GameProviderType,
};

export const models = {
  [PROVIDERS.EDICT_DESKTOP]: EdictGame,
  [PROVIDERS.EDICT_MOBILE]: EdictGame,
  [PROVIDERS.NETENT]: NetentGame,
  [PROVIDERS.NETENT_FLASH]: NetentGame,
  [PROVIDERS.NETENT_LIVE]: NetentGame,
  [PROVIDERS.NETENT_GAME_INCLUSION]: NetentGame,
  [PROVIDERS.THUNDERKICK_DESKTOP]: ThunderkickGame,
  [PROVIDERS.THUNDERKICK_MOBILE]: ThunderkickGame,
  [PROVIDERS.YGGDRASIL_DESKTOP]: YggdrasilGame,
  [PROVIDERS.YGGDRASIL_MOBILE]: YggdrasilGame,
  [PROVIDERS.REDTIGER_DESKTOP]: RedTigerGame,
  [PROVIDERS.REDTIGER_MOBILE]: RedTigerGame,
  [PROVIDERS.CASUMO_HTML5]: CasumoGame,
};

export const getGameModel = (
  gameData: GameProps,
  gameRef: GameRef,
  language: string,
  environment: string
) => {
  const GameModel = models[gameData.providerType] || BaseGame;

  return new GameModel({ gameData, gameRef, language, environment });
};
