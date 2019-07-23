import React from "react";
import { mount } from "enzyme";
import { prop } from "ramda";
import { ValuableDetailsExpirationLabel } from "./ValuableDetailsExpirationLabel";

describe("ValuableDetailsExpirationLabel", () => {
  test("Should render the expirationText together with the translated label", () => {
    const expirationText = "2 Hours";
    const translations = { expiresIn: "Expires in" };

    const rendered = mount(
      <ValuableDetailsExpirationLabel
        translations={translations}
        expirationText={expirationText}
      />
    );

    const expectedText = `${prop("expiresIn", translations)} ${expirationText}`;
    const renderedText = rendered
      .find(".c-valuable-details__pill")
      .find("Text")
      .text();

    expect(renderedText).toEqual(expectedText);
  });
});
