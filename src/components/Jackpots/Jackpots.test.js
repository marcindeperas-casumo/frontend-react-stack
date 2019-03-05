import React from "react";
import { shallow, mount } from "enzyme";
import Jackpots from "Components/Jackpots/Jackpots";

describe("<Jackpots />", () => {
  let jackpots = ["1", "2", "3", "4", "5", "6", "7"];

  test("renders a <ScrollableListTitle /> component", () => {
    const rendered = shallow(<Jackpots jackpots={jackpots} />);

    expect(rendered.find("ScrollableListTitle").length).toBe(1);
  });

  test("renders tiles for every 3 game", () => {
    const rendered = shallow(<Jackpots jackpots={jackpots} />);

    expect(rendered.find("JackpotsColumn").length).toBe(3);
  });

  test("renders all the jackpot rows", () => {
    const rendered = mount(<Jackpots jackpots={jackpots} />);

    expect(rendered.find("GameRow")).toHaveLength(7);
  });
});
