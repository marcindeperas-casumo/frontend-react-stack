// @flow
import React from "react";
import { connect } from "react-redux";
import {
  transactionsAnnualOverviewPdfUrlSelector,
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
    state => ({
      href: transactionsAnnualOverviewPdfUrlSelector(year)(state),
    }),
    {
      fetchHref: () => initFetchAnnualOverviewPdfUrl({ year }),
    }
  )(PdfButton);

  return <Connected label={label} />;
};
