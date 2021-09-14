import { redirectTo } from "@reach/router";
import { getPlatform } from "Utils";
import { useTranslatedUrl } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import logger from "Services/logger";
import {
  getGameProviderName,
  getGameLaunchParameters,
} from "Api/api.gameLaunch";
import { imageOptimizer } from "./ImageOptimizer";
import { CHANNELS } from "./channels.constants";
import { sendMessage } from "./sendMessage";

export const WEB_INTERNAL = "webInternal";
export const EMBEDDED = "embedded";
export const DEFAULT_RUN_MODE = WEB_INTERNAL;

type TGetIconPartial = Partial<{
  backgroundImage: string;
  logo: string;
}>;

function getIcon(game: TGetIconPartial): string {
  return imageOptimizer.getOptimizedUrl(game.backgroundImage, {
    fm: "png",
    mask: "ellipse",
    markscale: 100,
    fit: "crop",
    crop: "top",
    w: 160,
    h: 160,
    markalign: "top center",
    mark: game.logo,
  });
}

type TGamePartial = Partial<{
  slug: string;
  name: string;
  originalUrl: string;
  thumbnail: string;
  logo: string;
  gameStudio: string;
}>;

export async function launchGame(
  game: TGamePartial,
  gameDetailsPath: string,
  isPractice = false
) {
  const platform = getPlatform();

  function fallback() {
    // Fallback to normal game opening if we fail to send the message
    redirectTo(gameDetailsPath);
  }

  try {
    const { providerGameName } = await getGameProviderName(game.slug, platform);
    const { responseData } = await getGameLaunchParameters({
      gameName: providerGameName,
      playForFun: isPractice,
      platform,
      appVersion: window?.native?.version || "",
    });

    sendMessage(
      CHANNELS.LAUNCH_GAME,
      {
        id: game.slug,
        name: game.name,
        url: gameDetailsPath,
        provider: responseData?.providedSession?.parameters?.providerType,
        isPractice: isPractice,
        originalUrl: gameDetailsPath,
        thumbnail: game.thumbnail,
        logo: game.logo,
        // TODO: embedded run mode is not available on React stack yet,
        // to run embedded game use KO native bridge,
        runMode: DEFAULT_RUN_MODE,
        icon: getIcon(game),
      },
      fallback
    );
  } catch {
    logger.error("Native bridge on React: failed to launch the game", game);
    fallback();
  }
}

export function useLaunchGame(game: TGamePartial, isPractice = false) {
  const routeId = isPractice
    ? ROUTE_IDS.PRACTICE_NATIVE
    : ROUTE_IDS.PLAY_NATIVE;
  const gameDetailsPath = useTranslatedUrl(routeId, {
    slug: game.slug,
  });

  const fullUrl = `${window.location.origin}/${gameDetailsPath}`;

  return {
    launchGame: () => launchGame(game, fullUrl, isPractice),
  };
}
