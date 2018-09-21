import React from "react";
import { shallow } from "enzyme";
import MigrationComponent from "Components/MigrationComponent/MigrationComponent";
import MigrationComponentManager from "Components/MigrationComponent/MigrationComponentManager";

describe("MigrationComponentManager", () => {
  test("displays only children that should be visible", () => {
    const fooComponent = <MigrationComponent migrationKey="foo" />;
    const barComponent = <MigrationComponent migrationKey="bar" />;
    const component = shallow(
      <MigrationComponentManager activeKeys={["foo"]}>
        {fooComponent}
        {barComponent}
      </MigrationComponentManager>
    );

    expect(component.contains(fooComponent)).toBe(true);
    expect(component.contains(barComponent)).toBe(false);
  });
});
