import http from "Lib/http";
import { getAppVersion } from "Utils";

export type TGameInfo = {
  actualRtpPast6Months: string;
  actualRtpPastYear: string;
  aspectRatioHeight: string;
  aspectRatioWidth: string;
  backgroundImage: string;
  category: string;
  description: string;
  gameStudio: string;
  hasPlayForFun: boolean;
  highestJackpotValue: {
    amount: 0;
    currency: 0;
  };
  id: string;
  inMaintenance: boolean;
  jackpotIds: string[];
  liveCasinoId: string;
  logo: string;
  marketCodes: string[];
  media: Array<{
    order: 0;
    path: string;
    type: string;
  }>;
  metaDescription: string;
  metaTitle: string;
  noIndex: boolean;
  playBackground: string;
  providerId: string;
  providerSlug: string;
  realMoneyPlayRequired: boolean;
  rtp: string;
  slug: string;
  subCategory: string;
  title: string;
};

export const URL = {
  GAME_INFO: "/casino-player/casino-games/api/v2/games/slug",
};

export const getGameInfo = (
  slug: string,
  country: string,
  jurisdiction: string,
  platform: string
): Promise<TGameInfo> =>
  http.get(
    `${URL.GAME_INFO}/${slug}`,
    {},
    {
      headers: {
        "content-type": "application/json",
        "X-Player-Country": country,
        "X-Player-Jurisdiction": jurisdiction,
        "X-Request-Client-Details": getAppVersion(),
        "X-Request-Device": platform,
      },
    }
  );
