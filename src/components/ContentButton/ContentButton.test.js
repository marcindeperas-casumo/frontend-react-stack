import React from "react";
import { shallow } from "enzyme";
import ContentButton, { ACTION_MAP } from "./ContentButton";

describe("ContentButton", () => {
  test("should reference ACTION_MAP for hrefs", () => {
    const actionKeys = Object.keys(ACTION_MAP);

    actionKeys.forEach(actionKey => {
      const action = ACTION_MAP[actionKey];
      const rendered = shallow(<ContentButton type={actionKey} />);

      expect(rendered.find("Button").prop("href")).toBe(action);
    });
  });

  test("should render nothing if ACTION_MAP[key] doesn't exist", () => {
    const rendered = shallow(<ContentButton type={"sausage"} />);
    console.log(rendered.debug());
    expect(rendered.html()).toBeNull();
  });
});
