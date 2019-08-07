// @flow
import { DateTime } from "luxon";
import { createSelector } from "reselect";
import { pathOr, identity, reduce, pipe, prop, or } from "ramda";
import { getPage } from "Models/cms";
import { ENTITY_KEYS } from "Models/schema";
import { getFetch } from "Models/fetch";
import { CMS_CONTENT_SLUG, types } from "./transactionsBetsHistory.constants";
import { getUniqueFetchName } from "./transactionsBetsHistory.utils";
import type { AnnualOverview } from "./transactionsBetsHistory.types";

type ContentSelector = Object => { [string]: string };
type AnnualOverviewSelector = number => Object => AnnualOverview;
type AnnualOverviewPdfUrlSelector = number => Object => string;
type AnnualOverviewFetchLoadingSelector = number => Object => boolean;

export const transactionsBetsHistoryAnnualOverviewSelector: AnnualOverviewSelector = year =>
  createSelector(
    pathOr(null, ["schema", ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW, year]),
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

export const transactionsAnnualOverviewPdfUrlSelector: AnnualOverviewPdfUrlSelector = year =>
  pipe(
    transactionsBetsHistoryAnnualOverviewSelector(year),
    prop("pdfUrl")
  );

export const isAnnualOverviewFetchLoadingSelector: AnnualOverviewFetchLoadingSelector = year => {
  const dates = {
    startTime: DateTime.utc(year),
    endTime: DateTime.utc(year + 1),
  };

  return createSelector(
    getFetch(
      getUniqueFetchName({
        type: types.WALLET_TOTALS_FETCH_START,
        ...dates,
      })
    ),
    getFetch(
      getUniqueFetchName({
        type: types.WALLET_TRANSACTIONS_FETCH_START,
        ...dates,
      })
    ),
    (walletTotalsFetch, walletTransactionsFetch) =>
      Boolean(
        walletTotalsFetch?.isFetching || walletTransactionsFetch?.isFetching
      )
  );
};
