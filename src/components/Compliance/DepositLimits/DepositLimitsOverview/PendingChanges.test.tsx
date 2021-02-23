// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { PendingChanges } from "./PendingChanges";
import t from "./__mocks__/cms";

const props = {
  t,
  locale: "en-GB",
  currency: "EUR",
  pendingChanges: [],
  allRemoved: false,
};
describe("PendingChanges", () => {
  test("can cancel pending limit changes", () => {
    const limitCancel = jest.fn();
    const rendered = shallow(
      <PendingChanges
        {...props}
        limitCancel={limitCancel}
        pendingChanges={[
          {
            limitKind: "monthly",
            value: 666,
          },
        ]}
      />
    );

    expect(limitCancel).toHaveBeenCalledTimes(0);
    rendered
      .find({ "data-test-id": "cancel-pending-limit-change" })
      .simulate("click");
    expect(limitCancel).toHaveBeenCalledTimes(1);
  });
});
