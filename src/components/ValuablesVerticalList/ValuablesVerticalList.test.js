//@flow
import React from "react";
import { shallow } from "enzyme";
import List from "@casumo/cmp-list";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { actWait } from "Utils";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { ValuableRow } from "Components/ValuableRow";

describe("ValuablesVerticalList", () => {
  const mockedValuables = mockValuables();
  let onMoreInfo;
  let rendered;

  beforeEach(() => {
    onMoreInfo = jest.fn();
    rendered = shallow(
      <ValuablesVerticalList
        valuables={mockedValuables}
        loading={false}
        translations={{}}
        onMoreInfo={onMoreInfo}
      />
    );
  });

  test("should render skeleton while loading", async () => {
    rendered = shallow(
      <ValuablesVerticalList valuables={[]} loading={true} translations={{}} />
    );

    await actWait();

    expect(rendered.find(GameRowSkeleton).exists()).toBe(true);
  });

  test("should render a list of valuable rows", () => {
    expect(getValuableRows().length).toEqual(mockedValuables.length);
  });

  test("should pass not selected to ValuableRow if valuable is active and isItemSelectable is false", () => {
    const mockedData = [
      {
        ...mockedValuables[0],
        valuableState: "Used",
      },
    ];

    rendered = shallow(
      <ValuablesVerticalList
        valuables={mockedData}
        loading={false}
        translations={{}}
        onMoreInfo={onMoreInfo}
        isItemSelectable={false}
      />
    );

    expect(getValuableRows().prop("isSelected")).toEqual(false);
  });

  test("should pass selected to ValuableRow if valuable is active and isItemSelectable is true", () => {
    const mockedData = [
      {
        ...mockedValuables[0],
        valuableState: "Used",
      },
    ];

    rendered = shallow(
      <ValuablesVerticalList
        valuables={mockedData}
        loading={false}
        translations={{}}
        onMoreInfo={onMoreInfo}
        isItemSelectable={true}
      />
    );

    expect(getValuableRows().prop("isSelected")).toEqual(true);
  });

  const getValuableRows = () =>
    rendered
      .find(List)
      .dive()
      .find(ValuableRow);
});
