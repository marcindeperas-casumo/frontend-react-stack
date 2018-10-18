import { types as fetchTypes } from "Reducers/curatedCard";
import CMSService from "Services/CMSService";
import GameBrowserService from "Services/GameBrowserService";
import { head } from "ramda";

export const types = {
  FETCH_CURATED_START: "CURATED/FETCH_CURATED_START",
  FETCH_CURATED_COMPLETE: "CURATED/FETCH_CURATED_COMPLETE",
  NORMALIZE_RESPONSE: "CURATED/NORMALIZE_RESPONSE",
};

export const fetchCuratedData = async () => {
  const curatedData = await CMSService.getPage({
    slug: "curated-component",
  });
  const gameData = await GameBrowserService.gamesBySlugs({
    slugs: curatedData.fields.game,
  });

  return {
    ...curatedData,
    game: head(gameData.games),
  };
};

export const fetchCuratedCard = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_CURATED_START,
  asyncCallData,
  asyncCall: fetchCuratedData,
  postFetch: types.FETCH_CURATED_COMPLETE,
});

export const actions = {
  fetchCuratedCard,
};
