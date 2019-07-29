import React from "react";
import { mount } from "enzyme";
import * as R from "ramda";
import MustDropJackpotsList from "Components/MustDropJackpotsList/MustDropJackpotsList";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";

const ids = R.map(R.toString, R.range(0, 8));

describe("<MustDropJackpotsList /> - Mobile", () => {
  setMobileViewport();
  const rendered = mount(
    <MockStore state={defaultState}>
      <MustDropJackpotsList ids={ids} seeMore="👀" />
    </MockStore>
  );

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(0);
  });

  test("passes down jackpot-ids to the tiles", () => {
    const firstTile = rendered.find("JackpotsListTile").first();

    expect(firstTile.props().ids).toEqual(["0", "1", "2"]);
  });

  test("Should render a ScrollableListTitle component", () => {
    expect(rendered.find("ScrollableListTitle")).toHaveLength(1);
  });

  test("Should render a MustDropJackpotsWidgetContainer component", () => {
    expect(rendered.find("MustDropJackpotsWidgetContainer")).toHaveLength(1);
  });

  test("renders tiles for every 3 game", () => {
    expect(rendered.find("JackpotsListTile").length).toBe(3);
  });
});

describe("<MustDropJackpotsList /> - Desktop", () => {
  setDesktopViewport();
  const rendered = mount(
    <MockStore state={defaultState}>
      <MustDropJackpotsList ids={ids} seeMore="👀" />
    </MockStore>
  );

  test("Should render a ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(1);
  });

  test("Should render a ScrollableListTitle component", () => {
    expect(rendered.find("ScrollableListTitle")).toHaveLength(1);
  });

  test("Should render a link to must-drop-jackpots pages with the right URL and text", () => {
    expect(rendered.find("a").prop("href")).toBe("/games/must-drop-jackpots");
    expect(rendered.find("a").html()).toContain("👀");
  });
});
