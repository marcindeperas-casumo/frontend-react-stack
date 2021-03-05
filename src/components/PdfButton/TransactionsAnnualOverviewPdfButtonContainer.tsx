import React from "react";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { getSummaryUrl } from "Api/api.transactionsBetsHistory";
import { currencySelector } from "Models/handshake";
import { PdfButton } from "./PdfButton";

type Props = {
  label: string;
  year: number;
};

export const TransactionsAnnualOverviewPdfButtonContainer = ({
  year,
  label,
}: Props) => {
  const Connected = connect(state => ({
    href: getSummaryUrl({
      asPdf: true,
      date: DateTime.utc(year),
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type '"EUR" | ... Remove this comment to see the full error message
      currency: currencySelector(state),
    }),
  }))(PdfButton);

  return <Connected label={label} />;
};
