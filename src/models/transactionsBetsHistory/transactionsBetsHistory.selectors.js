// @flow
import { createSelector } from "reselect";
import { pathOr, identity } from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import type { AnnualOverview } from "./transactionsBetsHistory.types";

export const transactionsBetsHistoryAnnualOverviewSelector: number => any => AnnualOverview = year =>
  createSelector(
    pathOr({}, [
      "schema",
      ENTITY_KEYS.TRANSACTIONS_BETS_HISTORY_ANNUAL_OVERVIEW,
      year,
    ]),
    identity
  );
