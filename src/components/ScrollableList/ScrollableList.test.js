import React from "react";
import { shallow } from "enzyme";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableList, {
  DEFAULT_SPACING,
} from "Components/ScrollableList/ScrollableList";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import GameTile from "Components/GameTile";

describe("ScrollableList", () => {
  test("render the title of the list", () => {
    const title = "hi";
    const rendered = shallow(<ScrollableList itemIds={[1]} title={title} />);
    const titleComponent = rendered.find(ScrollableListTitleRow);

    expect(titleComponent.length).toBe(1);
    expect(titleComponent.props()).toMatchObject({ title });
  });

  test("do not render anything if the items are empty", () => {
    const rendered = shallow(<ScrollableList itemIds={[]} title="hi" />);

    expect(rendered.get(0)).toBeNull();
  });

  test("renders with the GameTileContainer by default", () => {
    const rendered = shallow(<ScrollableList itemIds={[1, 2]} title="hi" />);

    expect(
      rendered
        .find(Scrollable)
        .dive()
        .find(GameTile)
    ).toHaveLength(2);
  });

  test("renders with the custom component if passed", () => {
    const SampleComponent = ({ id }) => <span>{id}</span>;
    const rendered = shallow(
      <ScrollableList itemIds={[1, 2]} title="hi" Component={SampleComponent} />
    );

    expect(
      rendered
        .find(Scrollable)
        .dive()
        .find("SampleComponent")
    ).toHaveLength(2);
    expect(
      rendered
        .find(Scrollable)
        .dive()
        .find("SampleComponent")
        .first()
        .props()
    ).toMatchObject({
      id: 1,
    });
  });

  test("has default spacing", () => {
    const rendered = shallow(<ScrollableList itemIds={[1]} title="hi" />);
    const scrollable = rendered.find(Scrollable);

    expect(scrollable.props()).toMatchObject({ itemSpacing: DEFAULT_SPACING });
  });

  test("overrides the spacing if needed", () => {
    const spacing = "md";
    const rendered = shallow(
      <ScrollableList itemIds={[1]} title="hi" spacing={spacing} />
    );
    const scrollable = rendered.find(Scrollable);

    expect(scrollable.props()).toMatchObject({ itemSpacing: spacing });
  });
});
