import React from "react";
import { shallow } from "enzyme";
import mockedValuables from "Components/ValuableCard/__mocks__/Valuable.json";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
import translationsMock from "./__mocks__/translations.mock.json";

describe("PlayerValuableListHorizontal", () => {
  const consumeValuable = jest.fn();
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <PlayerValuableListHorizontal
        valuables={mockedValuables}
        loading={false}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
      />
    );
  });

  test("should render skeleton while loading", () => {
    rendered = shallow(
      <PlayerValuableListHorizontal
        valuables={mockedValuables}
        loading={true}
        onConsumeValuable={consumeValuable}
        translations={translationsMock}
      />
    );

    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(true);
  });

  test("should render the correct number of items", () => {
    expect(rendered.find("GameListHorizontalSkeleton").exists()).toBe(false);
    expect(rendered.find("ValuableCard")).toHaveLength(mockedValuables.length);
  });

  test("should render the list title", () => {
    expect(rendered.find("ScrollableListTitle").prop("title")).toEqual(
      translationsMock.listTitleLabel
    );
  });
});
