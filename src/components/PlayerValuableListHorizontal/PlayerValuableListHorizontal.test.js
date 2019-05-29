import React from "react";
import { shallow } from "enzyme";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";

describe("PlayerValuableListHorizontal", () => {
  const mockedValuables = mockValuables();
  const mockTitle = "foo";
  const consumeValuable = jest.fn();
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <PlayerValuableListHorizontal
        valuables={mockedValuables}
        loading={false}
        listTitle={mockTitle}
        onConsumeValuable={consumeValuable}
      />
    );
  });

  test("should render skeleton while loading", () => {
    rendered = shallow(<PlayerValuableListHorizontal loading={true} />);

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(true);
  });

  test("should render the correct number of items", () => {
    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(false);
    expect(rendered.find("ValuableCard")).toHaveLength(mockedValuables.length);
  });

  test("should render the list title", () => {
    expect(rendered.find("ScrollableListTitle").prop("title")).toEqual(
      mockTitle
    );
  });
});
