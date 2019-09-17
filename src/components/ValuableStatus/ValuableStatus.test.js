import React from "react";
import { shallow } from "enzyme";
import { LockIcon, ClockIcon } from "@casumo/cmp-icons";
import { VALUABLE_STATES } from "Models/valuables";
import { ValuableStatus } from "./ValuableStatus";

describe("ValuableStatus", () => {
  test("Returns Lock icon if valuable is locked", () => {
    const rendered = shallow(
      <ValuableStatus hoursToExpiry={100} state={VALUABLE_STATES.LOCKED} />
    );

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });
  test("Returns Clock icon if expiry is less than 24 hours", () => {
    const rendered = shallow(
      <ValuableStatus hoursToExpiry={10} state={VALUABLE_STATES.FRESH} />
    );

    expect(rendered.find(ClockIcon)).toHaveLength(1);
  });
  test("Returns Lock icon if locked even when expiry is less than 24 hours", () => {
    const rendered = shallow(
      <ValuableStatus hoursToExpiry={10} state={VALUABLE_STATES.LOCKED} />
    );

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });
  test("Returns null if not locked or close to expiry", () => {
    const rendered = shallow(
      <ValuableStatus hoursToExpiry={100} state={VALUABLE_STATES.FRESH} />
    );

    expect(rendered.isEmptyRender());
  });
  test("should have class to render text red if expired", () => {
    const rendered = shallow(
      <ValuableStatus hoursToExpiry={10} state={VALUABLE_STATES.FRESH} />
    );
    expect(rendered.hasClass("t-color-red"));
  });

  test("should have class to render text black if locked", () => {
    const rendered = shallow(
      <ValuableStatus hoursToExpiry={100} state={VALUABLE_STATES.LOCKED} />
    );
    expect(rendered.hasClass("t-color-black"));
  });
});
