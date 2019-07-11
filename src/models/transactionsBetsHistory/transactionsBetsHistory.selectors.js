// @flow
import { createSelector } from "reselect";
import { pathOr, identity } from "ramda";
import type { AnnualOverview } from "./transactionsBetsHistory.types";

export const transactionsBetsHistoryAnnualOverviewSelector: number => any => AnnualOverview = year =>
  createSelector(
    pathOr({}, ["schema", "transactionsBetsHistory", "annualOverview", year]),
    identity
  );
