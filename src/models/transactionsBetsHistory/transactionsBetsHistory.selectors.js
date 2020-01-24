// @flow
import { createSelector } from "reselect";
import { pathOr, identity, reduce, pipe } from "ramda";
import { getPage } from "Models/cms";
import { ENTITY_KEYS } from "Models/schema";
import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";
import type { AnnualOverview } from "./transactionsBetsHistory.types";

type ContentSelector = Object => { [string]: string };
type AnnualOverviewSelector = number => Object => AnnualOverview;
type AnnualOverviewFetchingSelector = number => Object => boolean;

export const annualOverviewSelector: AnnualOverviewSelector = year =>
  createSelector(
    pathOr(null, [
      "schema",
      ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW,
      year,
      "data",
    ]),
    identity
  );

export const transactionsBetsHistoryContentSelector: ContentSelector = createSelector(
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

export const isAnnualOverviewFetchingSelector: AnnualOverviewFetchingSelector = year =>
  createSelector(
    pathOr(null, [
      "schema",
      ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW,
      year,
      "meta",
      "isFetching",
    ]),
    identity
  );
