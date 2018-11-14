import React from "react";
import { shallow } from "enzyme";
import TableHeader, {
  camelCaseToSentenceCase,
} from "Components/Table/TableHeader";

describe("TableHeader", () => {
  const cols = ["name", "age"];
  test("should render a table header", () => {
    const rendered = shallow(<TableHeader columns={cols} />);
    expect(rendered.find("thead").length).toBe(1);
    expect(rendered.find("tr").hasClass("t-border-bottom")).toBe(true);
    expect(rendered.find("th").length).toBe(2);
  });

  test("should change cellPadding", () => {
    const rendered = shallow(
      <TableHeader columns={cols} cellPadding="large" />
    );
    expect(
      rendered
        .find("th")
        .first()
        .hasClass("u-padding--large")
    ).toBe(true);
  });
});

describe("camelCaseToSentenceCase", () => {
  test("should take in camel cased text and output sentence case", () => {
    const test = camelCaseToSentenceCase("spiritAnimalsLikeToParty🐪");
    const expected = "Spirit animals like to party🐪";
    expect(test).toBe(expected);
  });
});
