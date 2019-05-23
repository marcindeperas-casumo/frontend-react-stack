import React from "react";
import { shallow } from "enzyme";
import ValuableHeaderBackground from "./ValuableHeaderBackground";

describe("ValubaleHeaderBackground", () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ValuableHeaderBackground id="123">
        <div className="foo-bar">Foo</div>
      </ValuableHeaderBackground>
    );
  });

  test("should render content inside valuable header", () => {
    expect(rendered.find(".foo-bar")).toHaveLength(1);
  });
});
