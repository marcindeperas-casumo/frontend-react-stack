//@flow
import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { actWait, updateWrapper, getCacheWithIntrospections } from "Utils";
import mockedValuables from "Components/ValuableCard/__mocks__/Valuable";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { ValuableRow } from "Components/ValuableRow";
import SectionList from "Components/SectionList";
import { mocks } from "./__mocks__/playerValuableListMocks";
import { PlayerValuableListVertical } from "./PlayerValuableListVertical";

describe("PlayerValuableListVertical", () => {
  test("should render skeleton while loading", async () => {
    const rendered = mount(
      <MockedProvider mocks={[]}>
        <PlayerValuableListVertical />
      </MockedProvider>
    );

    await actWait();

    expect(rendered.find(GameRowSkeleton).exists()).toBe(true);
  });

  test("Should render a SectionList", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.mockedValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerValuableListVertical />
      </MockedProvider>
    );

    await updateWrapper(rendered);

    expect(rendered.find(SectionList).find(ValuableRow)).toHaveLength(
      mockedValuables.length
    );
  });

  test("should render EmptyValuablesList if no valuables are provided", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.emptyValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerValuableListVertical />
      </MockedProvider>
    );

    await updateWrapper(rendered);

    expect(rendered.find(EmptyValuablesList)).toHaveLength(1);
  });
});
