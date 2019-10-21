// @flow
import { types } from "Models/games";

export const getFetchGamesBySlugsCompleteType = (slugs: [string]) => {
  const identifierSlugs = slugs ? "_" + slugs.join("_") : "";
  return `${types.FETCH_GAMES_BY_SLUGS_COMPLETE}${identifierSlugs}`;
};
