// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
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

const Stories = () => <TransactionsAnnualOverview {...props} />;

stories.add("TransactionsAnnualOverview", Stories);
