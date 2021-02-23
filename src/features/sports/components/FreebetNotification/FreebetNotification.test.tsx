import React from "react";
import { shallow } from "enzyme";
import { LockIcon, CloseIcon } from "@casumo/cmp-icons";
import { VALUABLE_STATES, VALUABLE_TYPES } from "Models/valuables";
import { freebetProps } from "./__mocks__/freebetProps";
import { FreebetNotification } from "./FreebetNotification";

describe("FreebetNotification", () => {
  test("should show the Lock Icon if it is a locked free-bet", () => {
    const props = {
      ...freebetProps,
      valuableState: VALUABLE_STATES.LOCKED,
      valuableType: VALUABLE_TYPES.FREE_BET,
    };
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });

  test("should NOT show the Lock Icon if it is NOT a locked free-bet", () => {
    const props = {
      ...freebetProps,
      valuableState: VALUABLE_STATES.FRESH,
      valuableType: VALUABLE_TYPES.FREE_BET,
    };
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(LockIcon)).toHaveLength(0);
  });

  test("displays the caveat if it is passed in", () => {
    const rendered = shallow(<FreebetNotification {...freebetProps} />).dive();

    expect(rendered.html()).toMatch(freebetProps.caveat);
  });

  test("shows an icon for closing the notification", () => {
    const props = { ...freebetProps, onClose: () => {} };
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(CloseIcon)).toHaveLength(1);
  });

  test("should call the onClose callback when you click on the close icon", () => {
    const props = { ...freebetProps, onClose: jest.fn() };
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    rendered.find(CloseIcon).simulate("click");

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
