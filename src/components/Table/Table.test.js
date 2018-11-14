import React from "react";
import { shallow } from "enzyme";
import Table from "Components/Table";

export const rowData = [
  {
    name: "tom",
    age: 10,
  },
  {
    name: "dick",
    age: 7,
  },
  {
    name: "harry",
    age: 13,
  },
];

describe("Table", () => {
  test("should render a table", () => {
    const rendered = shallow(<Table rows={rowData} />);
    expect(rendered.find("table").length).toBe(1);
    expect(rendered.find("table").hasClass("u-width--1/1")).toBe(true);
  });

  test("should render a header with columns", () => {
    const rendered = shallow(<Table rows={rowData} />);
    expect(rendered.find("TableHeader").length).toBe(1);
    expect(rendered.find("TableHeader").prop("columns")).toEqual([
      "name",
      "age",
    ]);
  });

  test("should not render a header if displayHeader is set to false", () => {
    const rendered = shallow(<Table rows={rowData} displayHeader={false} />);
    expect(rendered.find("TableHeader").length).toBe(0);
  });

  test("should render a body with rows and columns", () => {
    const rendered = shallow(<Table rows={rowData} />);
    expect(rendered.find("TableBody").length).toBe(1);
    expect(rendered.find("TableBody").prop("columns")).toEqual(["name", "age"]);
    expect(rendered.find("TableBody").prop("rows")).toEqual(rowData);
  });
});
