import http from "Services/http";
import { ENTITY_KEYS } from "Models/schema";

export const URLS = {
  GAME_PROVIDERS: "/casino-player/casino-games/api/v1/gameproviders",
};

export const getGameProviders = async (httpService = http) => {
  const providers = await httpService.get(URLS.GAME_PROVIDERS);
  return { [`${ENTITY_KEYS.GAME_PROVIDER}s`]: providers };
};

