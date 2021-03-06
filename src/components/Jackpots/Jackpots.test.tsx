import React from "react";
import { mount } from "enzyme";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { Jackpots } from "Components/Jackpots/Jackpots";
import MockStore from "Components/MockStore";
import jackpotsMock from "./__mocks__/response.games.mock";

describe("<Jackpots />", () => {
  test("Should render ScrollableListPaginated and a title on Desktop", () => {
    setDesktopViewport();
    const rendered = mount(
      <MockStore>
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <Jackpots jackpots={jackpotsMock} title="All them jackpots" />
      </MockStore>
    );

    expect(rendered.find(ScrollableListPaginated)).toHaveLength(1);
    expect(rendered.find(ScrollableListTitle)).toHaveLength(1);
  });

  test("Should not render ScrollableListPaginated on Mobile and Tablet", () => {
    setMobileViewport();
    const rendered = mount(
      <MockStore>
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <Jackpots jackpots={jackpotsMock} />
      </MockStore>
    );

    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
    expect(rendered.find(ScrollableListTitle)).toHaveLength(1);
  });
});
