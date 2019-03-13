import React from "react";
import { shallow } from "enzyme";
import { Router, Route } from "Components/Router";

describe("Router", () => {
  test("displays only children that should be visible", () => {
    const fooComponent = <Route path="foo" />;
    const barComponent = <Route path="bar" />;
    const component = shallow(
      <Router activePaths={["foo"]}>
        {fooComponent}
        {barComponent}
      </Router>
    );

    expect(component.contains(fooComponent)).toBe(true);
    expect(component.contains(barComponent)).toBe(false);
  });

  test("supports an array as path", () => {
    const fooComponent = <Route path={["foo", "baz"]} />;
    const barComponent = <Route path="bar" />;
    const component = shallow(
      <Router activePaths={["baz"]}>
        {fooComponent}
        {barComponent}
      </Router>
    );

    expect(component.contains(fooComponent)).toBe(true);
    expect(component.contains(barComponent)).toBe(false);
  });

  test("array migration key with one element", () => {
    const fooComponent = <Route path={["foo"]} />;
    const barComponent = <Route path="bar" />;
    const component = shallow(
      <Router activePaths={["foo"]}>
        {fooComponent}
        {barComponent}
      </Router>
    );

    expect(component.contains(fooComponent)).toBe(true);
    expect(component.contains(barComponent)).toBe(false);
  });
});
