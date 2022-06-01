import { createSelector } from "reselect";
import { pathOr, identity, reduce, pipe } from "ramda";
import { getPage } from "Models/cms";
import { ENTITY_KEYS } from "Models/schema";
import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";
import type { AnnualOverviewType } from "./transactionsBetsHistory.types";

type ContentSelector = (o: Object) => { [s: string]: string };
type AnnualOverviewSelector = (n: number) => (o: Object) => AnnualOverviewType;
type AnnualOverviewFetchingSelector = (n: number) => (o: Object) => boolean;

export const annualOverviewSelector: AnnualOverviewSelector = year =>
  // @ts-expect-error: apply fix if you know the context
  createSelector(
    pathOr(null, [
      "schema",
      ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW,
      year,
      "data",
    ]),
    identity
  );

export const transactionsBetsHistoryContentSelector: ContentSelector =
  createSelector(
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

export const isAnnualOverviewFetchingSelector: AnnualOverviewFetchingSelector =
  year =>
    // @ts-expect-error: apply fix if you know the context
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
