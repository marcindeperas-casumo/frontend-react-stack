// @flow
import React from "react";
import { connect } from "react-redux";
import { prop } from "ramda";
import {
  transactionsBetsHistoryAnnualOverviewSelector,
  initFetchAnnualOverviewPdfUrl,
} from "Models/transactionsBetsHistory";
import { PdfButton } from "./PdfButton";

type Props = {
  label: string,
  year: number,
};

export const TransactionsAnnualOverviewPdfButtonContainer = ({
  year,
  label,
}: Props) => {
  const Connected = connect(
    state => {
      const annualOverview = transactionsBetsHistoryAnnualOverviewSelector(
        year
      )(state);
      const href = prop("pdfUrl", annualOverview);

      return {
        href,
      };
    },
    dispatch => ({
      fetchHref: () => dispatch(initFetchAnnualOverviewPdfUrl({ year })),
    })
  )(PdfButton);

  return <Connected label={label} />;
};
