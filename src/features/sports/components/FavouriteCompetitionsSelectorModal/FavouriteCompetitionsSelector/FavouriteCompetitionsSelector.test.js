import React from "react";
import wait from "waait";
import { F } from "ramda";
import { MockedProvider } from "react-apollo/test-utils";
import { mount } from "enzyme";

import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks.js";

import FavouriteCompetitionsSelector from "./FavouriteCompetitionsSelector";
import FavouriteCompetitionsSelectorRegion from "./FavouriteCompetitionsSelectorRegion";
import favouriteCompetitionsSelectorMocks from "./__mocks__/favouriteCompetitionsSelectorQuery";
import footballData from "./__mocks__/football";

const mocks = [...cmsMocks, ...favouriteCompetitionsSelectorMocks];

describe("<FavouriteCompetitionsSelector />", () => {
  test("should render a region competition selector for each region group, and group all leaf regions into a single group", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        <FavouriteCompetitionsSelector
          groupId={1}
          isCompetitionSelected={F}
          toggleCompetition={() => {}}
        />
      </MockedProvider>
    );

    await wait(0);
    rendered.update();

    expect(rendered.find(FavouriteCompetitionsSelectorRegion)).toHaveLength(
      footballData.data.group.groups.filter(g => g.groups).length + 1
    );
  });

  test("should render the first region as expanded", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        <FavouriteCompetitionsSelector
          groupId={1}
          isCompetitionSelected={F}
          toggleCompetition={() => {}}
        />
      </MockedProvider>
    );

    await wait(0);
    rendered.update();

    expect(
      rendered
        .find(FavouriteCompetitionsSelectorRegion)
        .first()
        .props().isExpanded
    ).toBe(true);
  });

  test("should pass its toggleCompetition and isCompetition logic to the FavouriteCompetitionsSelectorRegion(s)", async () => {
    const toggleCompetition = jest.fn();
    const isCompetitionSelected = jest.fn();
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        <FavouriteCompetitionsSelector
          groupId={1}
          isCompetitionSelected={isCompetitionSelected}
          toggleCompetition={toggleCompetition}
        />
      </MockedProvider>
    );

    await wait(0);
    rendered.update();

    expect(
      rendered
        .find(FavouriteCompetitionsSelectorRegion)
        .first()
        .props().isSelected
    ).toBe(isCompetitionSelected);
    expect(
      rendered
        .find(FavouriteCompetitionsSelectorRegion)
        .first()
        .props().onClick
    ).toBe(toggleCompetition);

    expect(
      rendered
        .find(FavouriteCompetitionsSelectorRegion)
        .last()
        .props().isSelected
    ).toBe(isCompetitionSelected);
    expect(
      rendered
        .find(FavouriteCompetitionsSelectorRegion)
        .last()
        .props().onClick
    ).toBe(toggleCompetition);
  });
});
