import React from "react";
import { shallow } from "enzyme";
import { LockIcon } from "@casumo/cmp-icons";
import { freebet as freebetProps } from "./__mocks__/freebet";
import { FreebetNotification } from "./FreebetNotification";

describe("FreebetNotification", () => {
  test("should show the Lock Icon if it is a locked free-bet", () => {
    const rendered = shallow(<FreebetNotification {...freebetProps} />).dive();

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });

  test("should not show the Lock Icon if it is not a locked free-bet", () => {
    const props = { ...freebetProps, valuableState: "Fresh" };
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(LockIcon)).toHaveLength(0);
  });

  test("displays the caveat if it is passed in", () => {
    const rendered = shallow(<FreebetNotification {...freebetProps} />).dive();

    expect(rendered.html()).toMatch(freebetProps.caveat);
  });
});
