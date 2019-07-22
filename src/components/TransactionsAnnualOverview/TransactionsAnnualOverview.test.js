import React from "react";
import { shallow, mount } from "enzyme";
import annualOverviewMock from "Models/transactionsBetsHistory/__mocks__/annualOverview.json";
import { TransactionsAnnualOverview } from "./TransactionsAnnualOverview";
import cmsMocks from "./__mocks__/cms.json";

describe("TransactionsAnnualOverview", () => {
  const props = {
    locale: "en-GB",
    t: cmsMocks,
    data: annualOverviewMock,
    navigateToHistory: () => {},
  };

  test("should display a list of rows with a label and a value with currency", () => {
    const rendered = shallow(<TransactionsAnnualOverview {...props} />);
    const rows = rendered.find("ListItem");

    expect(rows.at(0).prop("label")).toEqual(
      props.t.annual_transactions_starting_balance
    );
    expect(rows.at(0).prop("amount")).toEqual(0);

    expect(rows.at(1).prop("label")).toEqual(
      props.t.annual_transactions_total_deposits
    );
    expect(rows.at(1).prop("amount")).toEqual(props.data.depositsAmount);

    expect(rows.at(2).prop("label")).toEqual(
      props.t.annual_transactions_total_withdrawals
    );
    expect(rows.at(2).prop("amount")).toEqual(props.data.withdrawalsAmount);

    expect(rows.at(3).prop("label")).toEqual(
      props.t.annual_transactions_total_wagers
    );
    expect(rows.at(3).prop("amount")).toEqual(0);

    expect(rows.at(4).prop("label")).toEqual(
      props.t.annual_transactions_total_wins
    );
    expect(rows.at(4).prop("amount")).toEqual(props.data.winningsAmount);

    expect(rows.at(5).prop("label")).toEqual(
      props.t.annual_transactions_total_bonus_awarded
    );
    expect(rows.at(5).prop("amount")).toEqual(props.data.awardedBonusesAmount);

    expect(rows.at(6).prop("label")).toEqual(
      props.t.annual_transactions_total_bonus_converted
    );
    expect(rows.at(6).prop("amount")).toEqual(
      props.data.convertedBonusesAmount
    );

    expect(rows.at(7).prop("label")).toEqual(
      props.t.annual_transactions_end_balance
    );
    expect(rows.at(7).prop("amount")).toEqual(0);
  });
});
