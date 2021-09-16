import clientHttp from "Lib/http";
import { getDeveloperOptions } from "Utils/developerOptions";

export const URL = {
  GAME_LAUNCH: "/api/common/command/launchGame",
  GAME_SLUG_TO_PROVIDER_GAME_NAME:
    "/casino-player/casino-games/api/v1/mapping/slug",
};

const { showDisabledGames } = getDeveloperOptions();

type LaunchProps = {
  gameName: string;
  playForFun: boolean;
  platform: string;
  appVersion?: string;
};

type HTTPClient = typeof clientHttp;

export const getGameProviderName = (
  slug: string,
  platform: string,
  http: HTTPClient = clientHttp
) =>
  http.get(
    `${URL.GAME_SLUG_TO_PROVIDER_GAME_NAME}/${slug}`,
    {},
    {
      headers: {
        "content-type": "application/json",
        "X-Request-Device": platform,
      },
    }
  );

export const getGameLaunchParameters = (
  {
    gameName,
    playForFun,
    platform,
    appVersion = window?.native?.version || "",
  }: LaunchProps,
  http: HTTPClient = clientHttp
) =>
  http.post(
    URL.GAME_LAUNCH,
    {
      gameName,
      playForFun,
      platform,
      appVersion,
    },
    {
      headers: {
        "content-type": "application/json",
        "X-Request-Device": platform,
        "X-Request-Features": showDisabledGames ? "HIDDEN_GAMES" : null,
      },
    }
  );
