// @flow
import * as React from "react";
import { shallow, mount } from "enzyme";
import MockStore from "Components/MockStore";
import { TermsAndConditions } from "./TermsAndConditions";
import { HistoryView } from "./HistoryView";
import cms, { state } from "./__mocks__/cms";

const baseProps = {
  config: {},
  acceptModal: () => {},
  closeModal: () => {},
  dismissModal: () => {},
  t: cms,
};
describe("RSModal/T&C", () => {
  test("doesn't initialize with history view", () => {
    const wrapper = shallow(
      <MockStore state={state}>
        <TermsAndConditions {...baseProps} />
      </MockStore>
    );
    expect(wrapper.find(HistoryView)).toHaveLength(0);
  });

  test("show history view after clicking toggle", () => {
    const wrapper = mount(
      <MockStore state={state}>
        <TermsAndConditions {...baseProps} />
      </MockStore>
    );
    wrapper
      .find({ "data-test-id": "toggle-history-view-btn" })
      .at(0)
      .simulate("click");

    expect(wrapper.find(HistoryView)).toHaveLength(1); // history view present after clicking
  });
});
