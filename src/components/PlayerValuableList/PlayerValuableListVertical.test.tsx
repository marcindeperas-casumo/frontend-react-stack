import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { mount } from "enzyme";
import { wait, getCacheWithIntrospections } from "Utils/apolloTestUtils";
import { VALUABLE_STATES } from "Models/valuables";
import { EmptyValuablesList } from "Components/EmptyValuablesList";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { ValuableRow } from "Components/ValuableRow";
import { mocks } from "./__mocks__/playerValuableListMocks";
import { PlayerValuableListVertical } from "./PlayerValuableListVertical";

describe("PlayerValuableListVertical", () => {
  test("Should render a ValuablesVerticalList", () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.mockedValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerValuableListVertical />
      </MockedProvider>
    );

    wait().then(() => {
      expect(rendered.find(ValuablesVerticalList).exists()).toBe(true);
    });
  });

  test("should render one EmptyValuablesList if no valuables are provided", () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.emptyValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerValuableListVertical />
      </MockedProvider>
    );

    wait().then(() => {
      expect(rendered.find(EmptyValuablesList)).toHaveLength(1);
    });
  });

  test("should render the correct types under each section", () => {
    const rendered = mount(
      <MockedProvider
        mocks={mocks.mockedValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerValuableListVertical />
      </MockedProvider>
    );
    const expectedAvailable = mocks.allValuables.filter(
      val => val.valuableState === VALUABLE_STATES.FRESH
    ).length;
    const expectedUsed = mocks.allValuables.filter(
      val => val.valuableState === VALUABLE_STATES.USED
    ).length;
    const expectedLocked = mocks.allValuables.filter(
      val => val.valuableState === VALUABLE_STATES.LOCKED
    ).length;

    wait().then(() => {
      const actualAvailable = rendered
        .find(ValuablesVerticalList)
        .find({ "data-test-id": "list-available" })
        .find(ValuableRow).length;
      const actualUsed = rendered
        .find(ValuablesVerticalList)
        .find({ "data-test-id": "list-used" })
        .find(ValuableRow).length;
      const actualLocked = rendered
        .find(ValuablesVerticalList)
        .find({ "data-test-id": "list-locked" })
        .find(ValuableRow).length;

      expect(actualAvailable).toEqual(expectedAvailable);
      expect(actualUsed).toEqual(expectedUsed);
      expect(actualLocked).toEqual(expectedLocked);
    });
  });
});
