import { LockIcon, TimeLockedIcon } from "@casumo/cmp-icons";
import React from "react";
import { shallow } from "enzyme";
import { VALUABLE_STATES } from "Models/valuables";
import { ValuableStateIndicator } from "./ValuableStateIndicator";

describe("ValuableStateIndicator", () => {
  test("Returns Lock icon if valuable is locked", () => {
    const rendered = shallow(
      <ValuableStateIndicator state={VALUABLE_STATES.LOCKED} />
    );

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });

  test("Returns clock by default", () => {
    const rendered = shallow(
      <ValuableStateIndicator state={VALUABLE_STATES.FRESH} />
    );

    expect(rendered.find(TimeLockedIcon)).toHaveLength(1);
  });

  test("Returns null if not locked or close to expiry", () => {
    const rendered = shallow(
      <ValuableStateIndicator state={VALUABLE_STATES.FRESH} />
    );

    expect(rendered.isEmptyRender());
  });
  test("should have class to render text red if expired", () => {
    const rendered = shallow(
      <ValuableStateIndicator state={VALUABLE_STATES.FRESH} />
    );
    expect(rendered.hasClass("text-red-30"));
  });

  test("should have class to render text black if locked", () => {
    const rendered = shallow(
      <ValuableStateIndicator state={VALUABLE_STATES.LOCKED} />
    );
    expect(rendered.hasClass("text-black"));
  });
});
