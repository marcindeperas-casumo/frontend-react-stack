import * as React from "react";
import { shallow } from "enzyme";
import Button from "@casumo/cmp-button";
import { PdfButton } from "./PdfButton";

describe("PdfButton", () => {
  test("should render a button in loading state when not passed href", () => {
    const rendered = shallow(<PdfButton label="Label" fetchHref={() => {}} />);
    const button = rendered.find(Button);

    expect(button.prop("disabled")).toEqual(true);
    expect(button.prop("loading")).toEqual(true);
  });

  test("should render a button in ready state when passed href", () => {
    const rendered = shallow(
      <PdfButton label="Label" fetchHref={() => {}} href="/games" />
    );
    const button = rendered.find(Button);

    expect(button.prop("disabled")).toEqual(false);
    expect(button.prop("loading")).toEqual(false);
  });
});
