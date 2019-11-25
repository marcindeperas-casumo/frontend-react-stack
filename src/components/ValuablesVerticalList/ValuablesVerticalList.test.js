//@flow
import React from "react";
import { shallow } from "enzyme";
import List from "@casumo/cmp-list";
import { mockValuables } from "Components/ValuableCard/__mocks__/Valuable.mock";
import { actWait } from "Utils";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { ValuableRow } from "Components/ValuableRow";

describe("PlayerValuableListVertical", () => {
  const mockedValuables = mockValuables();
  test("should render skeleton while loading", async () => {
    const rendered = shallow(
      <ValuablesVerticalList valuables={[]} loading={true} translations={{}} />
    );

    await actWait();

    expect(rendered.find(GameRowSkeleton).exists()).toBe(true);
  });

  test("should render a list of valuable rows", () => {
    const rendered = shallow(
      <ValuablesVerticalList
        valuables={mockedValuables}
        loading={false}
        translations={{}}
      />
    );

    expect(
      rendered
        .find(List)
        .dive()
        .find(ValuableRow).length
    ).toEqual(mockedValuables.length);
  });
});
