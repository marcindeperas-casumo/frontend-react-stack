import React from "react";
import { shallow } from "enzyme";
import { ValuableDetails } from "./ValuableDetails";
import mockValuables from "./__mocks__/Valuables.json";
import translations from "./__mocks__/Translations.json";
import { ValuableDetailsBody } from "./ValuableDetailsBody";

describe("ValuableDetails", () => {
  let rendered;
  const Foo = () => <div>baz</div>;

  beforeEach(() => {
    const mockValuable = mockValuables[0];

    rendered = shallow(
      <ValuableDetails {...mockValuable} translations={translations}>
        <Foo />
      </ValuableDetails>
    );
  });

  test("should render a given component with it's props in the header", () => {
    const foo = rendered.find(Foo);

    expect(foo).toHaveLength(1);
  });

  test("should render a valuabledetails body", () => {
    expect(rendered.find(ValuableDetailsBody)).toHaveLength(1);
  });
});
