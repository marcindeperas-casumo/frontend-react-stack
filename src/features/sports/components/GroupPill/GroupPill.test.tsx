import React from "react";
import { shallow } from "enzyme";
import { Pill } from "Components/Pill";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import GroupPill from "./GroupPill";

const testGroup = { name: "Group A", regionCode: "SE" };
const noRegionTestGroup = { name: "Group A", regionCode: null };

describe("<GroupPill />", () => {
  test("renders out a pill with the correct contents", () => {
    const rendered = shallow(<GroupPill group={testGroup} />);
    const renderedNoRegion = shallow(<GroupPill group={noRegionTestGroup} />);

    expect(rendered.find(Pill).html()).toContain(`${testGroup.name}`);
    expect(rendered.find(RegionFlag)).toHaveLength(1);
    expect(renderedNoRegion.find(Pill).html()).toContain(`${testGroup.name}`);
    expect(renderedNoRegion.find(RegionFlag)).toHaveLength(0);
  });

  test("passes down onRemove to Pill", () => {
    const onRemove = jest.fn();
    const rendered = shallow(
      <GroupPill onRemove={onRemove} group={testGroup} />
    );

    expect(rendered.find(Pill).props().onRemove).toEqual(onRemove);
  });

  test("passes down onClick to Pill", () => {
    const onClick = jest.fn();
    const rendered = shallow(<GroupPill onClick={onClick} group={testGroup} />);

    expect(rendered.find(Pill).props().onClick).toEqual(onClick);
  });

  test("passes down isActive to Pill", () => {
    const activeRendered = shallow(
      <GroupPill isActive={true} group={testGroup} />
    );
    const inactiveRendered = shallow(
      <GroupPill isActive={false} group={testGroup} />
    );

    expect(activeRendered.find(Pill).props().isActive).toEqual(true);
    expect(inactiveRendered.find(Pill).props().isActive).toEqual(false);
  });
});
