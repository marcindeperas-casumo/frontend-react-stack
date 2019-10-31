import React from "react";
import { all, equals, F } from "ramda";
import { MockedProvider } from "@apollo/react-testing";
import { mount } from "enzyme";
import { updateWrapper, isNilOrEmpty } from "Utils";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
import {
  FavouriteCompetitionsSelector,
  isOrphanGroup,
  isPopularGroup,
  transformOrphanGroup,
} from "./FavouriteCompetitionsSelector";
import FavouriteCompetitionsSelectorRegion from "./FavouriteCompetitionsSelectorRegion";
import favouriteCompetitionsSelectorMocks from "./__mocks__/favouriteCompetitionsSelectorQuery";
import footballData from "./__mocks__/football";

const mocks = [...cmsMocks, ...favouriteCompetitionsSelectorMocks];

describe("isOrphanGroup", () => {
  test("should return true for orphaned groups", () => {
    const orphanedGroups = [
      isOrphanGroup({ groups: undefined }),
      isOrphanGroup({ groups: null }),
      isOrphanGroup({ groups: [] }),
    ];

    expect(all(equals(true), orphanedGroups)).toBe(true);
  });

  test("should return false for non-orphaned groups", () => {
    const orphanGroup = isOrphanGroup({ groups: ["non-empty-array"] });
    expect(orphanGroup).toBe(false);
  });
});

describe("isPopularGroup", () => {
  test("should return true for a popular group", () => {
    const popularGroup = isPopularGroup({
      groups: [{ popular: true }, { popular: false }],
    });
    expect(popularGroup).toBe(true);
  });

  test("should return false for a non-popular group", () => {
    const unpopularGroups = isPopularGroup({
      groups: [
        { popular: "true" },
        { popular: null },
        { popular: undefined },
        { popular: 42 },
      ],
    });

    expect(all(equals(false), unpopularGroups)).toBe(true);
  });
});

describe("transformOrphanGroup", () => {
  test("should add default properties without overriding ones from the input", () => {
    const orphanGroups = [
      {
        __typename: "EventGroup",
        id: 1000093381,
        popular: false,
        name: "Champignons League 🍄",
        groups: [],
      },
      {},
    ];

    const transformedOrphanGroups = orphanGroups.map(transformOrphanGroup);

    expect(transformedOrphanGroups).toEqual([
      {
        __typename: "EventGroup",
        id: 1000093381,
        popular: false,
        name: "Champignons League 🍄",
        groups: [],
        regionCode: "",
        userFavourite: true,
      },
      {
        popular: false,
        groups: undefined,
        regionCode: "",
        userFavourite: true,
      },
    ]);
  });
});

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

    await updateWrapper(rendered);

    expect(rendered.find(FavouriteCompetitionsSelectorRegion)).toHaveLength(
      footballData.data.group.groups.filter(g => !isNilOrEmpty(g.groups))
        .length + 1
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

    await updateWrapper(rendered);

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

    await updateWrapper(rendered);

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
