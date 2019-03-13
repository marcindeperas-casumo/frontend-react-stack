import React from "react";
import { shallow } from "enzyme";
import { Router, Route } from "Components/Router";

describe("Router", () => {
  test("only renders the routes that are active", () => {
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

  test("accepts multiple active paths for a single route", () => {
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

  test("accepts a single path even if it is passed in as an array", () => {
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
