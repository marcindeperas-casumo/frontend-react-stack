import React from "react";
import { shallow, mount } from "enzyme";
import { TransactionsAnnualOverview } from "./TransactionsAnnualOverview";

describe("TransactionsAnnualOverview", () => {
  const props = {
    locale: "en-GB",
    currency: "GBP",
    content: {
      annual_transactions_starting_balance: "Label #1",
      annual_transactions_total_deposits: "Label #2",
      annual_transactions_total_withdrawals: "Label #3",
      annual_transactions_total_wagers: "Label #4",
      annual_transactions_total_wins: "Label #5",
      annual_transactions_total_bonus_awarded: "Label #6",
      annual_transactions_total_bonus_converted: "Label #7",
      annual_transactions_end_balance: "Label #8",
      annual_transactions_download_pdf: "Label #9",
    },
    data: {
      betsAmount: 34.6,
      depositsAmount: 12.4,
      withdrawalsAmount: 55.5,
      winningsAmount: 34.5,
      awardedBonusesAmount: 11.2,
      convertedBonusesAmount: 2,
      currency: "GBP",
    },
    navigateToHistory: () => {},
  };

  test("should display a list of rows with a label and a value with currency", () => {
    const rendered = shallow(<TransactionsAnnualOverview {...props} />);
    const rows = rendered.find("ListItem");

    expect(rows.at(0).prop("label")).toEqual(
      props.content.annual_transactions_starting_balance
    );
    expect(rows.at(0).prop("amount")).toEqual(0);

    expect(rows.at(1).prop("label")).toEqual(
      props.content.annual_transactions_total_deposits
    );
    expect(rows.at(1).prop("amount")).toEqual(props.data.depositsAmount);

    expect(rows.at(2).prop("label")).toEqual(
      props.content.annual_transactions_total_withdrawals
    );
    expect(rows.at(2).prop("amount")).toEqual(props.data.withdrawalsAmount);

    expect(rows.at(3).prop("label")).toEqual(
      props.content.annual_transactions_total_wagers
    );
    expect(rows.at(3).prop("amount")).toEqual(0);

    expect(rows.at(4).prop("label")).toEqual(
      props.content.annual_transactions_total_wins
    );
    expect(rows.at(4).prop("amount")).toEqual(props.data.winningsAmount);

    expect(rows.at(5).prop("label")).toEqual(
      props.content.annual_transactions_total_bonus_awarded
    );
    expect(rows.at(5).prop("amount")).toEqual(props.data.awardedBonusesAmount);

    expect(rows.at(6).prop("label")).toEqual(
      props.content.annual_transactions_total_bonus_converted
    );
    expect(rows.at(6).prop("amount")).toEqual(
      props.data.convertedBonusesAmount
    );

    expect(rows.at(7).prop("label")).toEqual(
      props.content.annual_transactions_end_balance
    );
    expect(rows.at(7).prop("amount")).toEqual(0);
  });
});
