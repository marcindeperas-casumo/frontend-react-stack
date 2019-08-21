// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { TermsAndConditions } from "./TermsAndConditions";
import { HistoryView } from "./HistoryView";
import cms from "./__mocks__/cms";

const acks = {
  first: {
    version: 16,
    timestamp: new Date("2019-01-01T06:06:06").valueOf(),
  },
  last: {
    version: 17,
    timestamp: new Date("2019-06-01T07:07:07").valueOf(),
  },
};

describe("RSModal/T&C", () => {
  test("doesn't initialize with history view", () => {
    const wrapper = shallow(
      <TermsAndConditions
        t={cms}
        locale="en-GB"
        fetchTACAcknowledgements={() => {}}
        fetchTranslations={() => {}}
        acks={acks}
      />
    );
    expect(wrapper.find(HistoryView)).toHaveLength(0);
  });

  test("show history view after clicking toggle", () => {
    const wrapper = shallow(
      <TermsAndConditions
        t={cms}
        locale="en-GB"
        fetchTACAcknowledgements={() => {}}
        fetchTranslations={() => {}}
        acks={acks}
      />
    );
    wrapper
      .find({ "data-test-id": "toggle-history-view-btn" })
      .simulate("click");

    expect(wrapper.find(HistoryView)).toHaveLength(1); // history view present after clicking
  });
});
