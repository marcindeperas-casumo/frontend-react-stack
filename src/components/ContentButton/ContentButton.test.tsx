import React from "react";
import { shallow } from "enzyme";
import { ButtonPrimary } from "@casumo/cmp-button";
import { ContentButton, ACTION_MAP } from "./ContentButton";

describe("ContentButton", () => {
  test("should reference ACTION_MAP for hrefs", () => {
    const actionKeys = Object.keys(ACTION_MAP);

    actionKeys.forEach(actionKey => {
      const action = ACTION_MAP[actionKey];
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      const rendered = shallow(<ContentButton type={actionKey} />);

      expect(rendered.find(ButtonPrimary).prop("href")).toBe(action);
    });
  });

  test("should render nothing if ACTION_MAP[key] doesn't exist", () => {
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const rendered = shallow(<ContentButton type={"sausage"} />);

    expect(rendered.html()).toBeNull();
  });
});
