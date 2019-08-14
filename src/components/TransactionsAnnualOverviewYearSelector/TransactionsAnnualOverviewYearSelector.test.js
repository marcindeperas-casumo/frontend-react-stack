// @flow
import React from "react";
import { F } from "ramda";
import { mount } from "enzyme";
import { TransactionsAnnualOverviewYearSelector } from "./TransactionsAnnualOverviewYearSelector";

describe("TransactionsAnnualOverviewYearSelector", () => {
  const props = {
    content: {
      annual_overview_year_selector_button: "button",
      annual_overview_year_selector_heading: "heading",
      annual_overview_year_selector_label: "label",
    },
    fetchContent: () => {},
    isContentFetched: true,
    yearOptions: [1990, 1991],
    selectedYear: 1990,
    selectorHtmlId: "year-selector-id",
    isAnnualOverviewLoading: F,
    fetchYearOverview: () => {},
  };

  test("should render a select element together with a button", () => {
    const rendered = mount(
      <TransactionsAnnualOverviewYearSelector {...props} />
    );

    expect(
      rendered.find("[data-test-id='annual-overview-year-selector']").exists()
    ).toEqual(true);
    expect(
      rendered
        .find("[data-test-id='annual-overview-year-selector-button']")
        .exists()
    ).toEqual(true);
  });

  test("should render a select element with years as options", () => {
    const rendered = mount(
      <TransactionsAnnualOverviewYearSelector {...props} />
    );
    const yearSelector = rendered.find(
      "[data-test-id='annual-overview-year-selector']"
    );

    expect(yearSelector.children().map(el => parseInt(el.text()))).toEqual([
      1990,
      1991,
    ]);

    expect(yearSelector.prop("value")).toEqual(1990);
  });

  test("should call fetchYearOverview() with correct year", () => {
    const fetchYearOverview = jest.fn(() => Promise.resolve({}));
    const rendered = mount(
      <TransactionsAnnualOverviewYearSelector
        {...props}
        fetchYearOverview={fetchYearOverview}
      />
    );
    const yearSelector = rendered.find(
      "[data-test-id='annual-overview-year-selector']"
    );
    const button = rendered
      .find("[data-test-id='annual-overview-year-selector-button']")
      .first();

    yearSelector.simulate("change", { target: { value: 1991 } });
    button.simulate("click");

    expect(fetchYearOverview).toHaveBeenCalledWith(1991);
  });
});
