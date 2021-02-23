// @flow
import React from "react";
import { shallow } from "enzyme";
import annualOverviewMock from "Models/transactionsBetsHistory/__mocks__/annualOverview.mock";
import { TransactionsAnnualOverview } from "./TransactionsAnnualOverview";
import cmsMocks from "./__mocks__/cms.json";

describe("TransactionsAnnualOverview", () => {
  const props = {
    selectedYear: "2000",
    locale: "en-GB",
    t: cmsMocks,
    data: annualOverviewMock,
    navigateToHistory: () => {},
    PdfButton: () => null,
  };

  test("should display a list of rows with a label and a value with currency", () => {
    const rendered = shallow(<TransactionsAnnualOverview {...props} />);
    const rows = rendered.find("ListItem");

    expect(rows.at(0).prop("label")).toEqual(
      props.t.annual_transactions_starting_balance
    );
    expect(rows.at(0).prop("amount")).toEqual(props.data.startingBalance.real);

    expect(rows.at(1).prop("label")).toEqual(
      props.t.annual_transactions_total_deposits
    );
    expect(rows.at(1).prop("amount")).toEqual(props.data.deposits);

    expect(rows.at(2).prop("label")).toEqual(
      props.t.annual_transactions_total_withdrawals
    );
    expect(rows.at(2).prop("amount")).toEqual(props.data.withdrawals);

    expect(rows.at(3).prop("label")).toEqual(
      props.t.annual_transactions_total_wagers
    );
    expect(rows.at(3).prop("amount")).toEqual(props.data.bets.real);

    expect(rows.at(4).prop("label")).toEqual(
      props.t.annual_transactions_total_wins
    );
    expect(rows.at(4).prop("amount")).toEqual(props.data.wins.real);

    expect(rows.at(5).prop("label")).toEqual(
      props.t.annual_transactions_total_bonus_awarded
    );
    expect(rows.at(5).prop("amount")).toEqual(props.data.bonus.awarded);

    expect(rows.at(6).prop("label")).toEqual(
      props.t.annual_transactions_total_bonus_converted
    );
    expect(rows.at(6).prop("amount")).toEqual(props.data.bonus.converted);

    expect(rows.at(7).prop("label")).toEqual(
      props.t.annual_transactions_end_balance
    );
    expect(rows.at(7).prop("amount")).toEqual(props.data.endingBalance.real);
  });
});
