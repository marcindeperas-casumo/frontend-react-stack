import { storiesOf } from "@storybook/react";
import React from "react";
import annualOverviewMock from "Models/transactionsBetsHistory/__mocks__/annualOverview.mock";
import { PdfButton } from "Components/PdfButton";
import { TransactionsAnnualOverview } from "./TransactionsAnnualOverview";
import cmsMocks from "./__mocks__/cms.json";

const stories = storiesOf("TransactionsAnnualOverview", module);
const props = {
  t: cmsMocks,
  data: annualOverviewMock,
  selectedYear: "2001",
  locale: "en-GB",
  navigateToHistory: () => {},
  PdfButton: buttonProps => (
    <PdfButton {...buttonProps} href="/href" fetchHref={() => {}} />
  ),
};

// @ts-expect-error ts-migrate(2322) FIXME: Type '{ t: { annual_transactions_list_heading: str... Remove this comment to see the full error message
const Stories = () => <TransactionsAnnualOverview {...props} />;

stories.add("TransactionsAnnualOverview", Stories);
