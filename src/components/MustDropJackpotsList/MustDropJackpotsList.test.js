// __FIX__: this should be testing more things, however it is depending on the
// Scrollable changes to be finished first.
import React from "react";
import { shallow } from "enzyme";
import { setMobileViewport } from "Utils/testUtils";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import jackpotsMocked from "Components/MustDropJackpotsWidget/__mocks__/jackpots.json";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import MustDropJackpotsList from "./MustDropJackpotsList";

describe("<MustDropJackpotsList /> - Mobile and Tablet", () => {
  setMobileViewport();

  const rendered = shallow(
    <MustDropJackpotsList
      jackpots={jackpotsMocked}
      seeMore="👀"
      name="This cute list!"
    />
  );

  test("should not render ScrollableListPaginated component", () => {
    expect(
      rendered.find(MobileAndTablet).find(ScrollableListPaginated)
    ).toHaveLength(0);
  });

  test("Should render a ScrollableListTitleRow component", () => {
    expect(
      rendered.find(MobileAndTablet).find(ScrollableListTitleRow)
    ).toHaveLength(1);
  });
});

describe("<MustDropJackpotsList /> - Desktop", () => {
  const rendered = shallow(
    <MustDropJackpotsList
      jackpots={jackpotsMocked}
      seeMore="👀"
      title="This cute list!"
    />
  );

  test("Should render a ScrollableListPaginated component", () => {
    expect(rendered.find(Desktop).find(ScrollableListPaginated)).toHaveLength(
      1
    );
  });

  test("Should render a ScrollableListTitleRow component", () => {
    expect(rendered.find(Desktop).find(ScrollableListTitleRow)).toHaveLength(0);
  });
});
