// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { array, withKnobs } from "@storybook/addon-knobs";
import isNotChromatic from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import { Route } from "./Route";
import { Router } from "./Router";

const stories = storiesOf("Router", module);
stories.addDecorator(withKnobs);

if (isNotChromatic) {
  stories.add("Show/Hide", () => {
    const label = "Active Keys";
    const value = array(label, ["foo"]);

    return (
      <MockStore>
        <Router activePaths={value}>
          <Route path="foo">
            <h1>Foo</h1>
          </Route>
          <Route path="bar">
            <h1>Bar</h1>
          </Route>
          <Route path={["baz", "fiz"]}>
            <h1>Baz or Fiz</h1>
          </Route>
        </Router>
      </MockStore>
    );
  });
}
