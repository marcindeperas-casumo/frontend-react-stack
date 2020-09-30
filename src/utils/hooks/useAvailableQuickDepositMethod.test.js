// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { getPaymentMethodTypes } from "Api/api.payments";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { getStateMock } from "Models/__mocks__/state.mock";
import { methodTypes } from "./__mocks__/methodTypesMock";
import { useAvailableQuickDepositMethod } from "./useAvailableQuickDepositMethod";

jest.mock("Api/api.payments", () => ({
  getPaymentMethodTypes: jest.fn(),
}));

// $FlowIgnore
getPaymentMethodTypes.mockReturnValue(Promise.resolve(methodTypes));

describe("useAvailableQuickDepositMethod hook", () => {
  test("hook should return payment method available for quick deposit", async () => {
    const wrapper = mount(
      <MockStore state={getStateMock()}>
        <HookWrapper hook={useAvailableQuickDepositMethod} args={[]} />
      </MockStore>
    );
    await waitAndUpdateWrapper(wrapper);

    expectHook(wrapper).toEqual(getStateMock().paymentMethodConfigs.VISA_CARD);
  });
});
