import clientHttp from "Lib/http";
import { getDeveloperOptions } from "Utils/developerOptions";

export const URL = {
  GAME_LAUNCH: "/casino-player/game-launcher/api/v1/launchGame",
  GAME_SLUG_TO_PROVIDER_GAME_NAME:
    "/casino-player/casino-games/api/v1/mapping/slug",
};

const { showDisabledGames } = getDeveloperOptions();

type LaunchProps = {
  gameSlug: string;
  playMode: string;
  device: string;
  appVersion?: string;
};

type HTTPClient = typeof clientHttp;

export const getGameLaunchParameters = (
  {
    gameSlug,
    playMode,
    device,
    appVersion = window?.native?.version || "",
  }: LaunchProps,
  http: HTTPClient = clientHttp
) =>
  http.post(
    URL.GAME_LAUNCH,
    {
      gameSlug,
      playMode,
      device,
      appVersion,
    },
    {
      headers: {
        "content-type": "application/json",
        "X-Request-Device": device,
        "X-Request-Features": showDisabledGames ? "HIDDEN_GAMES" : null,
      },
    }
  );
