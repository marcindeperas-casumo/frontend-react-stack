import React from "react";
import { storiesOf } from "@storybook/react";
import { array, withKnobs } from "@storybook/addon-knobs";
import MigrationComponent from "Components/MigrationComponent";
import MigrationComponentManager from "Components/MigrationComponent/MigrationComponentManager";

const stories = storiesOf("MigrationComponentManager", module);
stories.addDecorator(withKnobs);

stories.add("Show/Hide", () => {
  const label = "Active Keys";
  const value = array(label, ["foo"]);

  return (
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
  );
});
