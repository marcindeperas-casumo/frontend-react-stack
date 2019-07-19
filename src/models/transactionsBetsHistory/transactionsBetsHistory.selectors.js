// @flow
import { createSelector } from "reselect";
import { pathOr, identity, reduce, pipe } from "ramda";
import { getPage } from "Models/cms";
import { ENTITY_KEYS } from "Models/schema";
import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";
import type { AnnualOverview } from "./transactionsBetsHistory.types";

type ContentSelectorResult = Object => { [string]: string };

export const transactionsBetsHistoryAnnualOverviewSelector: number => any => AnnualOverview = year =>
  createSelector(
    pathOr({}, [
      "schema",
      ENTITY_KEYS.TRANSACTIONS_BETS_HISTORY_ANNUAL_OVERVIEW,
      year,
    ]),
    identity
  );

export const transactionsBetsHistoryContentSelector: ContentSelectorResult = createSelector(
  getPage(CMS_CONTENT_SLUG),
  pipe(
    pathOr([], ["fields", "text_fields"]),
    reduce(
      (acc, entry) => ({
        ...acc,
        [entry.key]: entry.value,
      }),
      {}
    )
  )
);
