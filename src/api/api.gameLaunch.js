// @flow
import clientHttp from "Lib/http";

export const URL = {
  GAME_LAUNCH: "/api/common/command/launchGame",
  GAME_SLUG_TO_PROVIDER_GAME_NAME:
    "/casino-player/casino-games/api/v1/mapping/slug",
};

type LaunchProps = {
  gameName: string,
  playForFun: boolean,
  platform: string,
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
  { gameName, playForFun, platform }: LaunchProps,
  http: HTTPClient = clientHttp
) =>
  http.post(
    URL.GAME_LAUNCH,
    {
      gameName,
      playForFun,
      platform,
    },
    {
      headers: {
        "content-type": "application/json",
        "X-Request-Device": platform,
      },
    }
  );
