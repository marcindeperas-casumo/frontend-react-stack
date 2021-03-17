import React from "react";
import { shallow, mount } from "enzyme";
import { F } from "ramda";
import FavouriteCompetitionsSelectorRegion from "./FavouriteCompetitionsSelectorRegion";
import FavouriteCompetitionsCount from "./FavouriteCompetitionsCount";
import footballData from "./__mocks__/football";

describe("<FavouriteCompetitionsSelectorRegion />", () => {
  test("should not render if group has no competitions", () => {
    const rendered = {
      emptyGroups: shallow(
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ group: { groups: undefined[]; name: string... Remove this comment to see the full error message
        <FavouriteCompetitionsSelectorRegion
          group={{ groups: [], name: "test" }}
          isExpanded={false}
          isSelected={F}
          onClick={() => {}}
        />
      ),
      nullGroups: shallow(
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ group: { groups: null; name: string; }; is... Remove this comment to see the full error message
        <FavouriteCompetitionsSelectorRegion
          group={{ groups: null, name: "test" }}
          isExpanded={false}
          isSelected={F}
          onClick={() => {}}
        />
      ),
      undefinedGroups: shallow(
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ group: { name: string; }; isExpanded: fals... Remove this comment to see the full error message
        <FavouriteCompetitionsSelectorRegion
          group={{ name: "test" }}
          isExpanded={false}
          isSelected={F}
          onClick={() => {}}
        />
      ),
    };

    expect(rendered.emptyGroups.isEmptyRender()).toBe(true);
    expect(rendered.nullGroups.isEmptyRender()).toBe(true);
    expect(rendered.undefinedGroups.isEmptyRender()).toBe(true);
  });

  test("should check if each competition is selected based on the competition id", () => {
    const isSelected = jest.fn();
    const regionGroup = footballData.data.group.groups[1];
    shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ group: { __typename: string; id: number; p... Remove this comment to see the full error message
      <FavouriteCompetitionsSelectorRegion
        group={regionGroup}
        isExpanded={true}
        isSelected={isSelected}
        onClick={() => {}}
      />
    );

    expect(isSelected).toHaveBeenCalledTimes(regionGroup.groups.length);
    expect(isSelected).toHaveBeenNthCalledWith(1, regionGroup.groups[0].id);
    expect(isSelected).toHaveBeenNthCalledWith(3, regionGroup.groups[2].id);
  });

  test("should render a CompetitionPillsList with the region's competitions", () => {
    const regionGroup = footballData.data.group.groups[1];
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ group: { __typename: string; id: number; p... Remove this comment to see the full error message
      <FavouriteCompetitionsSelectorRegion
        group={regionGroup}
        isExpanded={true}
        isSelected={F}
        onClick={() => {}}
      />
    );

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitions' does not exist on type 'HT... Remove this comment to see the full error message
    expect(rendered.find("CompetitionPillsList").props().competitions).toEqual(
      regionGroup.groups
    );
  });

  test("should display the number of selected competitions in that region", () => {
    const regionGroup = {
      name: "test",
      groups: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
    const rendered = mount(
      // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsSelectorRegion' cannot be us... Remove this comment to see the full error message
      <FavouriteCompetitionsSelectorRegion
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; groups: { id: number; }[]; }... Remove this comment to see the full error message
        group={regionGroup}
        isExpanded={true}
        isSelected={id => id % 2 !== 0}
        onClick={() => {}}
      />
    );

    expect(rendered.find(FavouriteCompetitionsCount).props().count).toBe(2);
  });

  test("should pass the onClick handler to CompetitionPillsList to handle competition selection", () => {
    const onClick = jest.fn();
    const rendered = mount(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ group: { __typename: string; id: number; p... Remove this comment to see the full error message
      <FavouriteCompetitionsSelectorRegion
        group={footballData.data.group.groups[1]}
        isExpanded={true}
        isSelected={id => id % 2 !== 0}
        onClick={onClick}
      />
    );

    expect(rendered.find("CompetitionPillsList").props().onClick).toBe(onClick);
  });
});
