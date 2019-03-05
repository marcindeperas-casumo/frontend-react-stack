// @flow
import React from "react";
import { shallow } from "enzyme";

import { DirectionUpIcon, DirectionDownIcon } from "@casumo/cmp-icons";

import ExpandableListItem from "./ExpandableListItem";

describe("<ExpandableListItem />", () => {
  test("should render without error", () => {
    const rendered = shallow(
      <ExpandableListItem label="TEST LABEL" isExpanded={true}>
        TEST CONTENT
      </ExpandableListItem>
    );

    expect(rendered.contains("TEST CONTENT")).toBe(true);
    expect(rendered.contains("TEST LABEL")).toBe(true);
  });

  test("should not be expanded by default", () => {
    const rendered = shallow(
      <ExpandableListItem label="TEST LABEL">TEST CONTENT</ExpandableListItem>
    );

    expect(rendered.state("isExpanded")).toBe(false);
  });

  test("should show up arrow when expanded and down arrow when not expanded", () => {
    const rendered = shallow(
      <ExpandableListItem label="TEST LABEL">TEST CONTENT</ExpandableListItem>
    );
    const renderedExpanded = shallow(
      <ExpandableListItem label="TEST LABEL" isExpanded={true}>
        TEST CONTENT
      </ExpandableListItem>
    );

    expect(rendered.find(DirectionUpIcon)).toHaveLength(0);
    expect(rendered.find(DirectionDownIcon)).toHaveLength(1);

    expect(renderedExpanded.find(DirectionUpIcon)).toHaveLength(1);
    expect(renderedExpanded.find(DirectionDownIcon)).toHaveLength(0);
  });

  test("should only render children when expanded", () => {
    const rendered = shallow(
      <ExpandableListItem label="TEST LABEL" isExpanded={false}>
        TEST CONTENT
      </ExpandableListItem>
    );

    const renderedExpanded = shallow(
      <ExpandableListItem label="TEST LABEL" isExpanded={true}>
        TEST CONTENT
      </ExpandableListItem>
    );

    expect(rendered.contains("TEST CONTENT")).toBe(false);
    expect(renderedExpanded.contains("TEST CONTENT")).toBe(true);
  });

  test("should toggle expanded mode when ExpandableListItem header is clicked", () => {
    const rendered = shallow(
      <ExpandableListItem label="TEST LABEL">TEST CONTENT</ExpandableListItem>
    );
    expect(rendered.contains("TEST CONTENT")).toBe(false);

    rendered
      .find('[data-test="expandable-list-item-header"]')
      .simulate("click");

    expect(rendered.contains("TEST CONTENT")).toBe(true);
  });
});