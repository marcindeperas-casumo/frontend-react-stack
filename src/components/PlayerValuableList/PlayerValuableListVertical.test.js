//@flow
import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { VALUABLE_STATES } from "Models/valuables";
import {
  waitAndUpdateWrapper,
  getCacheWithIntrospections,
} from "Utils/apolloTestUtils";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { ValuableRow } from "Components/ValuableRow";
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

  test("should render the correct types under each section", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.mockedValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerValuableListVertical />
      </MockedProvider>
    );
    const expectedAvailable = mocks.allValuables.filter(
      val =>
        val.valuableState === VALUABLE_STATES.FRESH ||
        val.valuableState === VALUABLE_STATES.USED
    ).length;
    const expectedLocked = mocks.allValuables.filter(
      val => val.valuableState === VALUABLE_STATES.LOCKED
    ).length;

    await waitAndUpdateWrapper(rendered);

    const actualAvailable = rendered
      .find(ValuablesVerticalList)
      .find({ "data-test-id": "list-available" })
      .find(ValuableRow).length;
    const actualLocked = rendered
      .find(ValuablesVerticalList)
      .find({ "data-test-id": "list-locked" })
      .find(ValuableRow).length;

    expect(actualAvailable).toEqual(expectedAvailable);
    expect(actualLocked).toEqual(expectedLocked);
  });
});
