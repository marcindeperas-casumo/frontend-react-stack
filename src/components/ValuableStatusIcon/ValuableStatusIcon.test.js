import React from "react";
import { shallow } from "enzyme";
import { LockIcon, ClockIcon } from "@casumo/cmp-icons";
import { VALUABLE_STATES } from "Models/valuables";
import { ValuableStatusIcon } from "./ValuableStatusIcon";

describe("ValuableStatusIcon", () => {
  test("Returns Lock icon if valuable is locked", () => {
    const rendered = shallow(
      <ValuableStatusIcon hoursToExpiry={100} state={VALUABLE_STATES.LOCKED} />
    );

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });
  test("Returns Clock icon if expiry is less than 24 hours", () => {
    const rendered = shallow(
      <ValuableStatusIcon hoursToExpiry={10} state={VALUABLE_STATES.FRESH} />
    );

    expect(rendered.find(ClockIcon)).toHaveLength(1);
  });
  test("Returns Lock icon if locked even when expiry is less than 24 hours", () => {
    const rendered = shallow(
      <ValuableStatusIcon hoursToExpiry={10} state={VALUABLE_STATES.LOCKED} />
    );

    expect(rendered.find(LockIcon)).toHaveLength(1);
  });
  test("Returns null if not locked or close to expiry", () => {
    const rendered = shallow(
      <ValuableStatusIcon hoursToExpiry={100} state={VALUABLE_STATES.FRESH} />
    );

    expect(rendered.isEmptyRender());
  });
});
