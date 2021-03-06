import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import { shallow } from "enzyme";
import { PdfButton } from "./PdfButton";

describe("PdfButton", () => {
  test("should render a button in loading state when not passed href", () => {
    const rendered = shallow(<PdfButton label="Label" fetchHref={() => {}} />);
    const button = rendered.find(ButtonPrimary);

    expect(button.prop("isDisabled")).toEqual(true);
    expect(button.prop("isLoading")).toEqual(true);
  });

  test("should render a button in ready state when passed href", () => {
    const rendered = shallow(
      <PdfButton label="Label" fetchHref={() => {}} href="/games" />
    );
    const button = rendered.find(ButtonPrimary);

    expect(button.prop("isDisabled")).toEqual(false);
    expect(button.prop("isLoading")).toEqual(false);
  });
});
