// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { array, withKnobs } from "@storybook/addon-knobs";
import isNotChromatic from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import MigrationComponent from "./MigrationComponent";
import { MigrationComponentManager } from "./MigrationComponentManager";

const stories = storiesOf("MigrationComponentManager", module);
stories.addDecorator(withKnobs);

if (isNotChromatic) {
  stories.add("Show/Hide", () => {
    const label = "Active Keys";
    const value = array(label, ["foo"]);

    return (
      <MockStore>
        <MigrationComponentManager activeKeys={value}>
          <MigrationComponent migrationKey="foo">
            <h1>Foo</h1>
          </MigrationComponent>
          <MigrationComponent migrationKey="bar">
            <h1>Bar</h1>
          </MigrationComponent>
          <MigrationComponent migrationKey={["baz", "fiz"]}>
            <h1>Baz or Fiz</h1>
          </MigrationComponent>
        </MigrationComponentManager>
      </MockStore>
    );
  });
}
