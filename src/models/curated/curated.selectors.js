import { createSelector } from "reselect";
import { prop, compose, isEmpty } from "ramda";
import { getPage } from "Models/cms";
import { gameSelector } from "Models/schema";
import { hasMadeFirstDeposit, market } from "Models/handshake";
import { CURATED_SLUG, WELCOME_OFFER_CARD } from "Models/curated";
import { flavourMatchSelector, AB_TESTS_FEATURE } from "Models/ABTesting";
import { MARKETS } from "Src/constants";

export const curatedSlugSelector = slug =>
  createSelector(
    hasMadeFirstDeposit,
    market,
    flavourMatchSelector(AB_TESTS_FEATURE.DEPOSIT_NOW, "curated-card"),
    (hasMadeFirstDeposit, market, ABTestFlavourMatch) => {
      // Remove this once we are done with the test
      // for now the test is running in the uk only
      const isUK = market === MARKETS.gb_en;

      if (isUK && ABTestFlavourMatch) {
        // Keep only this code after abtest is removed
        const cardToShow = !hasMadeFirstDeposit ? WELCOME_OFFER_CARD : slug;

        return `${CURATED_SLUG}.${cardToShow}`;
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
