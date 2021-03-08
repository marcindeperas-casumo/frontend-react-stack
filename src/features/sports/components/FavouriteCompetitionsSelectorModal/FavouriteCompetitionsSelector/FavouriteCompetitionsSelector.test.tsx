import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { all, equals, F } from "ramda";
import { mount } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
import { isNilOrEmpty } from "Utils";
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
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ groups: undefined; }' is not a... Remove this comment to see the full error message
      isOrphanGroup({ groups: undefined }),
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ groups: null; }' is not assign... Remove this comment to see the full error message
      isOrphanGroup({ groups: null }),
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ groups: undefined[]; }' is not... Remove this comment to see the full error message
      isOrphanGroup({ groups: [] }),
    ];

    expect(all(equals(true), orphanedGroups)).toBe(true);
  });

  test("should return false for non-orphaned groups", () => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type '{ id: num... Remove this comment to see the full error message
    const orphanGroup = isOrphanGroup({ groups: ["non-empty-array"] });
    expect(orphanGroup).toBe(false);
  });
});

describe("isPopularGroup", () => {
  test("should return true for a popular group", () => {
    const popularGroup = isPopularGroup({
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ popular: true; }' is not assignable to typ... Remove this comment to see the full error message
      groups: [{ popular: true }, { popular: false }],
    });
    expect(popularGroup).toBe(true);
  });

  test("should return false for a non-popular group", () => {
    const unpopularGroups = isPopularGroup({
      groups: [
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'boolean'.
        { popular: "true" },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ popular: null; }' is not assignable to typ... Remove this comment to see the full error message
        { popular: null },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ popular: undefined; }' is not assignable t... Remove this comment to see the full error message
        { popular: undefined },
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'boolean'.
        { popular: 42 },
      ],
    });

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
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

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(group: A.FavouriteCompetitionsS... Remove this comment to see the full error message
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
  test("should render a region competition selector for each region group, and group all leaf regions into a single group", () => {
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ groupId: number; isCompetitionSelected: ()... Remove this comment to see the full error message */}
        <FavouriteCompetitionsSelector
          groupId={1}
          isCompetitionSelected={F}
          toggleCompetition={() => {}}
        />
      </MockedProvider>
    );

    wait().then(() => {
      expect(rendered.find(FavouriteCompetitionsSelectorRegion)).toHaveLength(
        footballData.data.group.groups.filter(g => !isNilOrEmpty(g.groups))
          .length + 1
      );
    });
  });

  test("should render the first region as expanded", () => {
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ groupId: number; isCompetitionSelected: ()... Remove this comment to see the full error message */}
        <FavouriteCompetitionsSelector
          groupId={1}
          isCompetitionSelected={F}
          toggleCompetition={() => {}}
        />
      </MockedProvider>
    );

    wait().then(() => {
      expect(
        rendered.find(FavouriteCompetitionsSelectorRegion).first().props()
          .isExpanded
      ).toBe(true);
    });
  });

  test("should pass its toggleCompetition and isCompetition logic to the FavouriteCompetitionsSelectorRegion(s)", () => {
    const toggleCompetition = jest.fn();
    const isCompetitionSelected = jest.fn();
    const rendered = mount(
      <MockedProvider mocks={mocks}>
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ groupId: number; isCompetitionSelected: Mo... Remove this comment to see the full error message */}
        <FavouriteCompetitionsSelector
          groupId={1}
          isCompetitionSelected={isCompetitionSelected}
          toggleCompetition={toggleCompetition}
        />
      </MockedProvider>
    );

    wait().then(() => {
      expect(
        rendered.find(FavouriteCompetitionsSelectorRegion).first().props()
          .isSelected
      ).toBe(isCompetitionSelected);
      expect(
        rendered.find(FavouriteCompetitionsSelectorRegion).first().props()
          .onClick
      ).toBe(toggleCompetition);

      expect(
        rendered.find(FavouriteCompetitionsSelectorRegion).last().props()
          .isSelected
      ).toBe(isCompetitionSelected);
      expect(
        rendered.find(FavouriteCompetitionsSelectorRegion).last().props()
          .onClick
      ).toBe(toggleCompetition);
    });
  });
});
