// @flow
import { createSelector } from "reselect";
import { pathOr, identity, reduce, pipe } from "ramda";
import { getPage } from "Models/cms";
import { ENTITY_KEYS } from "Models/schema";
import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";
import type { AnnualOverviewType } from "./transactionsBetsHistory.types";

// @ts-expect-error ts-migrate(2693) FIXME: 'string' only refers to a type, but is being used ... Remove this comment to see the full error message
type ContentSelector = Object => { [string]: string };
// @ts-expect-error ts-migrate(2693) FIXME: 'AnnualOverviewType' only refers to a type, but is... Remove this comment to see the full error message
type AnnualOverviewSelector = number => Object => AnnualOverviewType;
// @ts-expect-error ts-migrate(2693) FIXME: 'boolean' only refers to a type, but is being used... Remove this comment to see the full error message
type AnnualOverviewFetchingSelector = number => Object => boolean;

// @ts-expect-error ts-migrate(2322) FIXME: Type '(year: any) => OutputSelector<any, any, (res... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(2322) FIXME: Type '(year: any) => OutputSelector<any, any, (res... Remove this comment to see the full error message
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
