import React from "react";
import { shallow } from "enzyme";
import { rowData } from "Components/Table/Table.test";
import TableBody from "Components/Table/TableBody";

describe("TableBody", () => {
  const columns = Object.keys(rowData[0]);

  test("should render a table body", () => {
    const rendered = shallow(<TableBody rows={rowData} columns={columns} />);
    expect(rendered.find("tbody").length).toBe(1);
  });

  test("should render rows and columns", () => {
    const rendered = shallow(<TableBody rows={rowData} columns={columns} />);
    expect(
      rendered
        .find("tr")
        .first()
        .hasClass("t-border-bottom")
    ).toBe(true);
    expect(rendered.find("tr").length).toBe(3);
    expect(rendered.find("TableCell").length).toBe(
      rowData.length * columns.length
    );
  });

  test("should render empty cell if no value", () => {
    const rendered = shallow(
      <TableBody rows={rowData} columns={columns} cellPadding="large" />
    );
    const cell = rendered
      .find("TableCell")
      .first()
      .dive();
    expect(cell.hasClass("u-padding--large")).toBe(true);
  });

  test("should change cellPadding", () => {
    const rendered = shallow(
      <TableBody rows={rowData} columns={columns} cellPadding="large" />
    );
    const cell = rendered
      .find("TableCell")
      .first()
      .dive();

    expect(cell.hasClass("u-padding--large")).toBe(true);
  });

  test("should call a renderProp if available", () => {
    const spy = jest.fn();
    const rendered = shallow(
      <TableBody rows={rowData} columns={columns} name={spy} />
    );
    rendered
      .find("TableCell")
      .first()
      .dive();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
