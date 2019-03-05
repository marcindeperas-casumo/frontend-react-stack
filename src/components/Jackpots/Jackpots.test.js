import React from "react";
import { shallow, mount } from "enzyme";
import Jackpots from "Components/Jackpots/Jackpots";
import jackpotsMock from "./__mocks__/response.games.mock";

describe("<Jackpots />", () => {
  test("renders a <ScrollableListTitle /> component", () => {
    const rendered = shallow(<Jackpots jackpots={jackpotsMock} />);

    expect(rendered.find("ScrollableListTitle").length).toBe(1);
  });

  test("renders tiles for every 3 game", () => {
    const rendered = shallow(<Jackpots jackpots={jackpotsMock} />);

    expect(rendered.find("JackpotsColumn").length).toBe(6);
  });

  test("renders all the jackpot rows", () => {
    const rendered = mount(<Jackpots jackpots={jackpotsMock} />);

    expect(rendered.find("GameRow")).toHaveLength(17);
  });
});
