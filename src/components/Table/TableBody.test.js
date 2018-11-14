import React from "react";
import { shallow } from "enzyme";
import { rowData } from "Components/Table/Table.test";
import TableBody from "Components/Table/TableBody";

describe("TableBody", () => {
  const columns = Object.keys(rowData[0]);
  test("should render a table header", () => {
    const rendered = shallow(<TableBody rows={rowData} columns={columns} />);
    expect(rendered.find("tbody").length).toBe(1);
    expect(
      rendered
        .find("tr")
        .first()
        .hasClass("t-border-bottom")
    ).toBe(true);
    expect(rendered.find("tr").length).toBe(3);
  });

  test("should change cellPadding", () => {
    const rendered = shallow(
      <TableBody
        rows={rowData}
        columns={Object.keys(rowData)}
        cellPadding="large"
      />
    );
    expect(
      rendered
        .find("td")
        .first()
        .hasClass("u-padding--large")
    ).toBe(true);
  });

  test("should use a renderProp if available", () => {
    const spy = jest.fn();
    shallow(<TableBody rows={rowData} columns={columns} name={spy} />);

    expect(spy).toHaveBeenCalledTimes(3);
  });
});
