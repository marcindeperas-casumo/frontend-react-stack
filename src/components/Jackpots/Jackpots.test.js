import React from "react";
import { mount } from "enzyme";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import ScrollableListTitle from "Components/ScrollableListTitle";
import Jackpots from "Components/Jackpots/Jackpots";
import jackpotsMock from "./__mocks__/response.games.mock";

describe("<Jackpots />", () => {
  test("Should render ScrollableListPaginated and a title on Desktop", () => {
    setDesktopViewport();
    const rendered = mount(<Jackpots jackpots={jackpotsMock} />);

    expect(rendered.find(ScrollableListPaginated)).toHaveLength(1);
    expect(rendered.find(ScrollableListTitle)).toHaveLength(1);
  });

  test("Should not render ScrollableListPaginated on Mobile", () => {
    setMobileViewport();
    const rendered = mount(<Jackpots jackpots={jackpotsMock} />);

    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
    expect(rendered.find(ScrollableListTitle)).toHaveLength(1);
  });
});
