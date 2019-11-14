import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyAnnualTransactionsOverview = props => (
  <>
    <LazyPortal
      hostElementId="react-host-transactions-annual-overview"
      loader={() => import("Components/TransactionsAnnualOverview")}
      namedExport="TransactionsAnnualOverview"
      {...props}
    />
    <LazyPortal
      hostElementId="react-host-transactions-annual-overview-year"
      loader={transactionsAnnualOverviewYearSelectorLoader}
      namedExport="TransactionsAnnualOverviewYearSelector"
      {...props}
    />
  </>
);

function transactionsAnnualOverviewYearSelectorLoader() {
  return import("Components/TransactionsAnnualOverviewYearSelector");
}
