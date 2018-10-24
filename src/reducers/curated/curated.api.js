import gameBrowserClient from "Clients/GameBrowserClient";

export const getGamesBySlug = async ({ platform, country, slugs, variant }) => {
  return gameBrowserClient.gamesBySlugs({ platform, country, slugs, variant });
};
