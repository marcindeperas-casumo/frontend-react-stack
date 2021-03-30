import * as React from "react";
import { shallow } from "enzyme";
import { Deposit } from "./Deposit";

jest.mock("Utils/hooks/useTranslations", () => ({
  useTranslations: () => "",
}));

describe("Sports/Deposit", () => {
  test("renders bonus amount when bonus > 0", () => {
    const rendered = shallow(
      <Deposit balance={12345} bonus={666} locale="en-IN" currency="INR" />
    );

    expect(rendered.find(".c-sport-deposit__bonus")).toHaveLength(1);
  });

  test("renders no bonus amount when bonus = 0", () => {
    const rendered = shallow(
      <Deposit balance={12345} bonus={0} locale="en-IN" currency="INR" />
    );

    expect(rendered.find(".c-sport-deposit__bonus")).toHaveLength(0);
  });
});
