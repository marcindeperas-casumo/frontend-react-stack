import React from "react";
import { shallow } from "enzyme";

import GroupPill from "./GroupPill";
import { Pill } from "Components/Pill";

const testGroup = { name: "Group A", flagEmoji: "🇸🇪" };

describe("<GroupPill />", () => {
  test("renders out a pill with the correct contents", () => {
    const rendered = shallow(<GroupPill group={testGroup} />);

    expect(rendered.find(Pill).html()).toContain(
      `${testGroup.flagEmoji} ${testGroup.name}`
    );
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

  test("passes down onClick to Pill", () => {
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
