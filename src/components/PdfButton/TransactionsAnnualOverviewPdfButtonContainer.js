// @flow
import React from "react";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { getSummaryUrl } from "Api/api.transactionsBetsHistory";
import { currencySelector } from "Models/handshake";
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
      href: getSummaryUrl({
        forPdf: true,
        date: DateTime.utc(year),
        currency: currencySelector(state),
      }),
    }),
    {
      fetchHref: () => {},
    }
  )(PdfButton);

  return <Connected label={label} />;
};
