// @flow
import React from "react";
import { connect } from "react-redux";
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
      const href = annualOverview && annualOverview.pdfUrl;

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
