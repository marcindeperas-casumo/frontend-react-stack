import React from "react";
import { shallow } from "enzyme";
import MustDropJackpotsList from "Components/MustDropJackpotsList/MustDropJackpotsList";

describe("<MustDropJackpotsList />", () => {
  let rendered;
  let ids;

  beforeEach(() => {
    ids = ["1", "2", "3", "4", "5", "6", "7"];
    rendered = shallow(<MustDropJackpotsList ids={ids} />);
  });

  test("renders a <ScrollableListTitle /> component", () => {
    expect(rendered.find("ScrollableListTitle").length).toBe(1);
  });

  test("renders a see more link", () => {
    rendered = shallow(<MustDropJackpotsList ids={ids} seeMore="👀" />);

    expect(rendered.find("a").prop("href")).toBe("/games/must-drop-jackpots");
    expect(rendered.find("a").html()).toContain("👀");
  });

  test("renders tiles for every 3 game", () => {
    expect(rendered.find("JackpotsListTile").length).toBe(3);
  });

  test("passes down jackpot-ids to the tiles", () => {
    const firstTile = rendered.find("JackpotsListTile").first();

    expect(firstTile.props().ids).toEqual(["1", "2", "3"]);
  });

  test("renders the MustDropJackpotsWidget", () => {
    const widget = rendered.find("MustDropJackpotsWidgetContainer");

    expect(widget.length).toBe(1);
  });
});
