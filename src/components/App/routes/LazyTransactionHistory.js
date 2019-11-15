import React from "react";
import LazyPortal from "Components/LazyPortal";

export const LazyTransactionHistory = props => (
  <LazyPortal
    hostElementId="react-host-transactions-annual-overview-year"
    loader={() => import("Components/TransactionsAnnualOverviewYearSelector")}
    namedExport="TransactionsAnnualOverviewYearSelector"
    {...props}
  />
);
