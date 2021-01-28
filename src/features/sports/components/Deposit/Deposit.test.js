// @flow
import * as React from "react";
import { shallow } from "enzyme";
import { Deposit } from "./Deposit";

jest.mock("Utils/hooks/useTranslations", () => ({
  useTranslations: () => "",
}));

describe("Sports/Deposit", () => {
  test("renders empty IF the user not deposit yet", () => {
    const rendered = shallow(
      <Deposit
        hasDeposited={false}
        balance={12345}
        bonus={666}
        locale="en-IN"
        currency="INR"
      />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("renders component if the user deposit", () => {
    const rendered = shallow(
      <Deposit
        hasDeposited={true}
        balance={12345}
        bonus={666}
        locale="en-IN"
        currency="INR"
      />
    );

    expect(rendered.isEmptyRender()).toBe(false);
    expect(rendered.find(".c-sport-deposit")).toHaveLength(1);
  });

  test("renders bonus amount when bonus > 0", () => {
    const rendered = shallow(
      <Deposit
        hasDeposited={true}
        balance={12345}
        bonus={666}
        locale="en-IN"
        currency="INR"
      />
    );

    expect(rendered.find(".c-sport-deposit-bonus")).toHaveLength(1);
  });

  test("renders no bonus amount when bonus = 0", () => {
    const rendered = shallow(
      <Deposit
        hasDeposited={true}
        balance={12345}
        bonus={0}
        locale="en-IN"
        currency="INR"
      />
    );

    expect(rendered.find(".c-sport-deposit-bonus")).toHaveLength(0);
  });
});
