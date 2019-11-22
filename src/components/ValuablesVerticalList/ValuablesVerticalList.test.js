//@flow
import React from "react";
import { shallow } from "enzyme";
// import { mocks } from "Components/PlayerValuableList/__mocks__/playerValuableListMocks";
import { actWait } from "Utils";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";

describe("PlayerValuableListVertical", () => {
  test("should render skeleton while loading", async () => {
    const rendered = shallow(
      <ValuablesVerticalList valuables={[]} loading={true} translations={{}} />
    );

    await actWait();

    expect(rendered.find(GameRowSkeleton).exists()).toBe(true);
  });

  test("should render a list of valuable rows", async () => {
    const rendered = shallow(
      <ValuablesVerticalList valuables={[]} loading={false} translations={{}} />
    );

    await actWait();

    expect(rendered.find(GameRowSkeleton).exists()).toBe(true);
  });
});
