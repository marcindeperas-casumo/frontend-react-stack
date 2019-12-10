import React from "react";
import { shallow } from "enzyme";
import { LockIcon, CrossIcon } from "@casumo/cmp-icons";
import { VALUABLE_STATES } from "Models/valuables";
import { freebet as freebetProps } from "./__mocks__/freebet";
import { FreebetNotification } from "./FreebetNotification";

describe("FreebetNotification", () => {
  test("should show the Lock Icon if it is a locked free-bet", () => {
    const props = {
      ...freebetProps,
      valuableState: VALUABLE_STATES.FRESH,
      valuableType: "freeBetLocked",
    };
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });

  test("should not show the Lock Icon if it is not a locked free-bet", () => {
    const props = {
      ...freebetProps,
      valuableState: VALUABLE_STATES.FRESH,
      valuableType: "freeBet",
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

    expect(rendered.find(CrossIcon)).toHaveLength(1);
  });

  test("does not show a close icon when we don't pass in an onClose()", () => {
    const props = { ...freebetProps, onClose: null };
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(CrossIcon)).toHaveLength(0);
  });

  test("should not render the component if it is hidden", () => {
    const rendered = shallow(
      <FreebetNotification {...freebetProps} isHidden />
    );

    expect(rendered.html()).toBeNull();
  });

  test("should call the onClose callback when you click on the close icon", () => {
    const props = { ...freebetProps, onClose: jest.fn() };
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    rendered.find(CrossIcon).simulate("click");

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
