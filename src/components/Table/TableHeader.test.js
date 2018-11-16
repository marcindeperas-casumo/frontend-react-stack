import React from "react";
import { shallow } from "enzyme";
import TableHeader from "Components/Table/TableHeader";

describe("TableHeader", () => {
  const cols = ["name", "age"];
  const columnHeadings = ["Name", "Age"];
  test("should render a table header", () => {
    const rendered = shallow(
      <TableHeader columns={cols} columnHeadings={columnHeadings} />
    );
    expect(rendered.find("thead").length).toBe(1);
    expect(rendered.find("tr").hasClass("t-border-bottom")).toBe(true);
    expect(rendered.find("th").length).toBe(2);
  });

  test("should change cellPadding", () => {
    const rendered = shallow(
      <TableHeader
        columns={cols}
        columnHeadings={columnHeadings}
        cellPadding="large"
      />
    );
    expect(
      rendered
        .find("th")
        .first()
        .hasClass("u-padding--large")
    ).toBe(true);
  });
});
