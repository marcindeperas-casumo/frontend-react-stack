import { LockIcon, CloseIcon } from "@casumo/cmp-icons";
import React from "react";
import { shallow } from "enzyme";
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
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ valuableState: "Locked"; valuableType: "fr... Remove this comment to see the full error message
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });

  test("should NOT show the Lock Icon if it is NOT a locked free-bet", () => {
    const props = {
      ...freebetProps,
      valuableState: VALUABLE_STATES.FRESH,
      valuableType: VALUABLE_TYPES.FREE_BET,
    };
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ valuableState: "Fresh"; valuableType: "fre... Remove this comment to see the full error message
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(LockIcon)).toHaveLength(0);
  });

  test("displays the caveat if it is passed in", () => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ id: string; valuableType: string; title: s... Remove this comment to see the full error message
    const rendered = shallow(<FreebetNotification {...freebetProps} />).dive();

    expect(rendered.html()).toMatch(freebetProps.caveat);
  });

  test("shows an icon for closing the notification", () => {
    const props = { ...freebetProps, onClose: () => {} };
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'translations' is missing in type '{ onCl... Remove this comment to see the full error message
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    expect(rendered.find(CloseIcon)).toHaveLength(1);
  });

  test("should call the onClose callback when you click on the close icon", () => {
    const props = { ...freebetProps, onClose: jest.fn() };
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'translations' is missing in type '{ onCl... Remove this comment to see the full error message
    const rendered = shallow(<FreebetNotification {...props} />).dive();

    rendered.find(CloseIcon).simulate("click");

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
