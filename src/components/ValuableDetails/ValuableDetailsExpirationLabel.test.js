import React from "react";
import { mount, shallow } from "enzyme";
import Text from "@casumo/cmp-text";
import { ValuableDetailsExpirationLabel } from "./ValuableDetailsExpirationLabel";

describe("ValuableDetailsExpirationLabel", () => {
  const text = "foo";
  let rendered;

  test("Should render the text passed on", () => {
    rendered = mount(<ValuableDetailsExpirationLabel text={text} />);

    const renderedText = rendered
      .find("[data-test='expiration-label']")
      .find(Text)
      .text();

    expect(renderedText).toEqual(text);
  });

  test("Should apply the classes passed as props", () => {
    const className = "foo-bar";
    rendered = shallow(
      <ValuableDetailsExpirationLabel className={className} text={text} />
    );

    expect(rendered.hasClass(className)).toBe(true);
  });
});
