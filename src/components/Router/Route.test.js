import React from "react";
import { shallow } from "enzyme";
import { Route } from "./Route";

describe("Route", () => {
  test("render its children", () => {
    const child = <div>foo</div>;
    const component = shallow(<Route path="foo">{child}</Route>);

    expect(component.contains(child)).toBe(true);
  });

  test("has an error boundary", () => {
    const child = <div>foo</div>;
    const component = shallow(<Route path="foo">{child}</Route>);

    expect(component.find("ErrorBoundary")).toHaveLength(1);
  });

  test("should have a path prop value", () => {
    expect(() => {
      shallow(
        <Route path="">
          <div>foo</div>
        </Route>
      );
    }).toThrowError("should have a path prop value");
  });

  test("should have only one child element", () => {
    expect(() => {
      shallow(
        <Route path="foo">
          <div>foo</div>
          <div>foo</div>
        </Route>
      );
    }).toThrow("should have only one child element");
  });
});
