import React from "react";
import { shallow } from "enzyme";
import SportsTopBar, { SportsTopBarTab } from "./SportsTopBar";

const render = () =>
  shallow(<SportsTopBar currentHash="home" isSearchVisible={false} />);

describe("<SportsTopBar />", () => {
  test("renders a title", () => {
    const title = render().find("[data-test='sports-top-bar-title']");

    expect(title.length).toBe(1);
  });

  test("renders three tabs", () => {
    const tabs = render().find(SportsTopBarTab);

    expect(tabs.length).toBe(3);
  });

  test("renders the 'home' tab first", () => {
    const homeTab = render()
      .find(SportsTopBarTab)
      .at(0);

    expect(homeTab.props()).toMatchObject({
      isActive: true,
      termKey: "desktop.tab.home",
    });
  });

  test("renders the 'search' tab second", () => {
    const searchTab = render()
      .find(SportsTopBarTab)
      .at(1);

    expect(searchTab.props()).toMatchObject({
      className: "c-sports-top-bar--search",
      isActive: false,
      termKey: "desktop.tab.search",
    });
  });

  test("renders the 'bet history' tab last", () => {
    const betHistoryTab = render()
      .find(SportsTopBarTab)
      .at(2);

    expect(betHistoryTab.props()).toMatchObject({
      className: "c-sports-top-bar--bet-history",
      isActive: false,
      termKey: "desktop.tab.bet-history",
    });
  });
});
