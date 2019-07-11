import React from "react";
import { shallow } from "enzyme";
import Jackpots from "Components/Jackpots/Jackpots";
import jackpotsMock from "./__mocks__/response.games.mock";

describe("<Jackpots />", () => {
  test("renders a <ScrollableListTitle /> component", () => {
    const rendered = shallow(<Jackpots jackpots={jackpotsMock} />);

    expect(rendered.find("ScrollableListTitle").length).toBe(1);
  });

  test("groups 3 jackpots into a single column ", () => {
    const numberOfColumns = 6;
    const rendered = shallow(<Jackpots jackpots={jackpotsMock} />);

    expect(rendered.find("JackpotsColumn").length).toBe(numberOfColumns);
  });
});
