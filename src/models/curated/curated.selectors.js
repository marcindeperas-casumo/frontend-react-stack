import { createSelector } from "reselect";
import { prop, compose, isEmpty } from "ramda";
import { getPage } from "Models/cms";
import { gameSelector } from "Models/schema";
import { hasMadeFirstDepositSelector } from "Models/handshake";
import { CURATED_SLUG, WELCOME_OFFER_CARD } from "Models/curated";

export const curatedSlugSelector = slug =>
  createSelector(
    hasMadeFirstDepositSelector,
    hasMadeFirstDeposit => {
      if (!hasMadeFirstDeposit) {
        return `${CURATED_SLUG}.${WELCOME_OFFER_CARD}`;
      }

      return `${CURATED_SLUG}.${slug}`;
    }
  );

export const curatedSelector = slug =>
  createSelector(
    getPage(slug),
    state => state,
    (page, state) => {
      const { fields = {} } = page;
      const gameId = compose(
        prop(0),
        prop("game")
      )(fields);

      if (!gameId) {
        return fields;
      }

      const gameData = gameSelector(gameId)(state);
      const game = { gameId, gameData };

      return {
        ...fields,
        ...(!isEmpty(gameData) && game),
      };
    }
  );

export const isCuratedLoadedFactory = slug =>
  createSelector(
    getPage(slug),
    state => state,
    (page, state) => {
      const { fields = {} } = page;
      const gameId = compose(
        prop(0),
        prop("game")
      )(fields);

      const isPromoCard = !gameId;

      return !isEmpty(fields) && isPromoCard
        ? true
        : !isEmpty(gameSelector(gameId)(state));
    }
  );
