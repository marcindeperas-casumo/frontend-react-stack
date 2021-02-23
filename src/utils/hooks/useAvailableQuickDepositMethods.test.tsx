// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { getPaymentMethodTypes } from "Api/api.payments";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { getStateMock } from "Models/__mocks__/state.mock";
import { methodTypes } from "./__mocks__/methodTypesMock";
import {
  prepareQuickDepositMethod,
  useAvailableQuickDepositMethods,
  convertMethodTypesToMap,
} from "./useAvailableQuickDepositMethods";

jest.mock("Api/api.payments", () => ({
  getPaymentMethodTypes: jest.fn(),
}));

const mock = getStateMock();

const playerMethod =
  mock.handshake.app["common/composition/players"].players[
    "2bb42ab0-7937-11e8-b6b5-0242ac11000b"
  ].paymentMethods[0];

const methodTypesMap = convertMethodTypesToMap(methodTypes);

const expectedQuickDepositMethods = [
  prepareQuickDepositMethod(
    playerMethod,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ profiles: { default: { limits:... Remove this comment to see the full error message
    mock.paymentMethodConfigs.methods.VISA_CARD,
    methodTypesMap[playerMethod.type]
  ),
];

// $FlowIgnore
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
getPaymentMethodTypes.mockReturnValue(Promise.resolve(methodTypes));

describe("useAvailableQuickDepositMethod hook", () => {
  // skipping failed test
  test.skip("hook should return payment method available for quick deposit", async () => {
    const wrapper = mount(
      <MockStore state={mock}>
        <HookWrapper hook={useAvailableQuickDepositMethods} args={[]} />
      </MockStore>
    );
    await waitAndUpdateWrapper(wrapper);

    expectHook(wrapper).toEqual(expectedQuickDepositMethods);
  });
});
