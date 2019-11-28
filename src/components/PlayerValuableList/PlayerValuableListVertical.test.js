//@flow
import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { waitAndUpdateWrapper, getCacheWithIntrospections } from "Utils";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { mocks } from "./__mocks__/playerValuableListMocks";
import { PlayerValuableListVertical } from "./PlayerValuableListVertical";

describe("PlayerValuableListVertical", () => {
  test("Should render a ValuablesVerticalList", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.mockedValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerValuableListVertical />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);

    expect(rendered.find(ValuablesVerticalList).exists()).toBe(true);
  });

  test("should render one EmptyValuablesList if no valuables are provided", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.emptyValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerValuableListVertical />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);

    expect(rendered.find(EmptyValuablesList)).toHaveLength(1);
  });
});
