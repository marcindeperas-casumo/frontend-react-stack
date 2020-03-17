import React from "react";
import { shallow } from "enzyme";
import { MustDropJackpotsWidget } from "./MustDropJackpotsWidget";
import jackpots from "./__mocks__/jackpots.json";

describe("MustDropJackpotsWidget", () => {
  test("should render an a tag with a MustDropJackpot for each jackpot", () => {
    const rendered = shallow(<MustDropJackpotsWidget jackpots={jackpots} />);
    expect(rendered.find("a").prop("href")).toBe("/games/must-drop-jackpots");
    expect(rendered.find("MustDropJackpot").length).toBe(jackpots.length);
  });
});
