import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { launchModal } from "Services/LaunchModalService";
import { ValuablesVerticalList } from "Components/ValuablesVerticalList";
import { ValuableRowShell } from "Components/ValuableRow/ValuableRowShell";
import { mocks } from "Components/PlayerValuableList/__mocks__/playerValuableListMocks";
import {
  waitAndUpdateWrapper,
  getCacheWithIntrospections,
} from "Utils/apolloTestUtils";
import { MODALS } from "Src/constants";
import { PlayerDepositValuables } from "./PlayerDepositValuables";

jest.mock("Services/LaunchModalService", () => ({
  ...jest.requireActual("../../applicationService/LaunchModalService"),
  launchModal: jest.fn(),
}));

describe("PlayerDepositValuables", () => {
  let rendered;

  beforeEach(() => {
    jest.resetModules();

    rendered = mount(
      <MockedProvider
        mocks={mocks.mockedDepositValuables}
        cache={getCacheWithIntrospections()}
      >
        <PlayerDepositValuables />
      </MockedProvider>
    );
  });

  test("should render valuables vertical list", async () => {
    await waitAndUpdateWrapper(rendered);

    expect(rendered.find(ValuablesVerticalList).exists()).toBe(true);
  });

  test("should render valuables row shell after the deposit valuables list", async () => {
    await waitAndUpdateWrapper(rendered);

    expect(rendered.find(ValuableRowShell).exists()).toBe(true);
  });

  test("should launch bonus terms dialog on click of bonus terms link", async () => {
    await waitAndUpdateWrapper(rendered);
    rendered.find("Text[data-test-id='bonus-terms-link']").simulate("click");

    expect(launchModal).toHaveBeenCalledTimes(1);
    expect(launchModal).toHaveBeenCalledWith({
      modal: MODALS.DEPOSIT.SHOW_BONUS_TERMS,
    });
  });
});
