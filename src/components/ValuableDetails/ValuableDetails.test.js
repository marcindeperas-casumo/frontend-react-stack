import React from "react";
import { shallow } from "enzyme";
import { ValuableDetails } from "./ValuableDetails";
import mock from "./__mocks__/Valuables.json";
import translations from "./__mocks__/Translations.json";

describe("ValuableDetails", () => {
  let rendered;
  const baz = "baz";
  const Foo = ({ foobar }) => <div>{foobar}</div>;

  beforeEach(() => {
    const mockValuable = mock[0];

    rendered = shallow(
      <ValuableDetails
        {...mockValuable}
        translations={translations}
        valuableRenderer={<Foo foobar={baz} />}
      />
    );
  });

  test("should render a given component with it's props in the header", () => {
    const foo = rendered.find(Foo);

    expect(foo).toHaveLength(1);
    expect(foo.prop("foobar")).toEqual(baz);
  });

  test("should render a valuabledetails body", () => {
    expect(rendered.find("ValuableDetailsBody")).toHaveLength(1);
  });
});
