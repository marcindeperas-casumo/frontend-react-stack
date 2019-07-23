import React from "react";
import { mount, shallow } from "enzyme";
import { prop } from "ramda";
import {
  ValuableDetailsExpirationLabel,
  defaultColor,
  defaultBackground,
} from "./ValuableDetailsExpirationLabel";

describe("ValuableDetailsExpirationLabel", () => {
  const labelWrapperSelector = ".c-valuable-details__expiration-label";
  const expirationText = "2 Hours";
  const translations = { expiresIn: "Expires in" };
  let rendered;

  test("Should render the expirationText together with the translated label", () => {
    rendered = mount(
      <ValuableDetailsExpirationLabel
        translations={translations}
        expirationText={expirationText}
      />
    );

    const expectedText = `${prop("expiresIn", translations)} ${expirationText}`;
    const renderedText = rendered
      .find(labelWrapperSelector)
      .find("Text")
      .text();

    expect(renderedText).toEqual(expectedText);
  });

  test("Should render a red background if no color classnames are passed", () => {
    rendered = shallow(
      <ValuableDetailsExpirationLabel
        translations={translations}
        expirationText={expirationText}
      />
    );

    expect(
      rendered.find(`${labelWrapperSelector}.${defaultBackground}`)
    ).toHaveLength(1);
    expect(
      rendered.find(`${labelWrapperSelector}.${defaultColor}`)
    ).toHaveLength(1);
  });

  test("Should overwrite the defaylt colors with the passed on color classNames", () => {
    const colorClass = "t-color-foo";
    const backgroundClass = "t-background-bar";

    rendered = shallow(
      <ValuableDetailsExpirationLabel
        translations={translations}
        expirationText={expirationText}
        colorClassNames={`${colorClass} ${backgroundClass}`}
      />
    );

    expect(rendered.find(`${labelWrapperSelector}.${colorClass}`)).toHaveLength(
      1
    );
    expect(
      rendered.find(`${labelWrapperSelector}.${backgroundClass}`)
    ).toHaveLength(1);
  });
});
