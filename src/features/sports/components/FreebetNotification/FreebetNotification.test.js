import React from "react";
import { shallow } from "enzyme";
import { FreebetNotification } from "Features/sports/components/FreebetNotification";

describe("FreebetNotification", () => {
  test("should do something", () => {
    const rendered = shallow(<FreebetNotification msg="hi" />);
    expect(rendered.find("div").length).toBe(1);
    expect(rendered.text()).toBe("FreebetNotification says: hi");
    expect(1).toBe(2);
  });
});
