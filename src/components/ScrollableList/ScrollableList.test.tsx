import React from "react";
import { shallow } from "enzyme";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableList, {
  DEFAULT_SPACING,
} from "Components/ScrollableList/ScrollableList";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";

describe("ScrollableList", () => {
  test("render the title of the list", () => {
    const title = "hi";
    const rendered = shallow(<ScrollableList items={[1]} title={title} />);
    const titleComponent = rendered.find(ScrollableListTitleRow);

    expect(titleComponent.length).toBe(1);
    expect(titleComponent.props()).toMatchObject({ title });
  });

  test("do not render anything if the items are empty", () => {
    const rendered = shallow(<ScrollableList items={[]} title="hi" />);

    expect(rendered.get(0)).toBeNull();
  });

  test("should pass itemRenderer to Scrollable", () => {
    const SampleComponent = ({ id }) => <span>{id}</span>;
    const items = [{ id: 1 }, { id: 2 }];
    const rendered = shallow(
      <ScrollableList
        items={items}
        title="hi"
        itemRenderer={i => <SampleComponent id={items[i].id} />}
      />
    );

    expect(
      rendered
        .find(Scrollable)
        .dive()
        .find("SampleComponent")
    ).toHaveLength(items.length);

    expect(
      rendered
        .find(Scrollable)
        .dive()
        .find("SampleComponent")
        .first()
        .props()
    ).toMatchObject({
      id: items[0].id,
    });
  });

  test("has default spacing", () => {
    const rendered = shallow(<ScrollableList items={[1]} title="hi" />);
    const scrollable = rendered.find(Scrollable);

    expect(scrollable.props()).toMatchObject({ itemSpacing: DEFAULT_SPACING });
  });

  test("overrides the spacing if needed", () => {
    const spacing = "md";
    const rendered = shallow(
      <ScrollableList items={[1]} title="hi" spacing={spacing} />
    );
    const scrollable = rendered.find(Scrollable);

    expect(scrollable.props()).toMatchObject({ itemSpacing: spacing });
  });
});
