import React from "react";
import { mount } from "enzyme";
import * as R from "ramda";
import MustDropJackpotsList from "Components/MustDropJackpotsList/MustDropJackpotsList";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import JackpotsListTile from "Components/JackpotsListTile";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget";

const ids = R.map(R.toString, R.range(0, 8));

describe("<MustDropJackpotsList /> - Mobile and Tablet", () => {
  setMobileViewport();
  const rendered = mount(
    <MockStore state={defaultState}>
      <MustDropJackpotsList ids={ids} seeMore="👀" title="This cute list!" />
    </MockStore>
  );

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
  });

  test("passes down jackpot-ids to the tiles", () => {
    const firstTile = rendered.find(JackpotsListTile).first();

    expect(firstTile.props().ids).toEqual(["0", "1", "2"]);
  });

  test("Should render a ScrollableListTitleRow component", () => {
    expect(rendered.find(ScrollableListTitleRow)).toHaveLength(1);
  });

  test("Should render a MustDropJackpotsWidget component if must-drop-jackpots-widget is amongst the ids", () => {
    expect(rendered.find(MustDropJackpotsWidget)).toHaveLength(1);
  });

  test("renders tiles for every 3 game", () => {
    expect(rendered.find(JackpotsListTile).length).toBe(3);
  });
});

describe("<MustDropJackpotsList /> - Desktop", () => {
  setDesktopViewport();
  const rendered = mount(
    <MockStore state={defaultState}>
      <MustDropJackpotsList ids={ids} seeMore="👀" title="This cute list!" />
    </MockStore>
  );

  test("Should render a ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(1);
  });

  test("Should render a ScrollableListTitleRow component", () => {
    expect(rendered.find(ScrollableListTitleRow)).toHaveLength(1);
  });

  test("Should render a link to must-drop-jackpots pages with the right URL and text", () => {
    expect(rendered.find("a").prop("href")).toBe("/games/must-drop-jackpots");
    expect(rendered.find("a").html()).toContain("👀");
  });
});
