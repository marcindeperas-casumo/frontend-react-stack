import React from "react";
import { shallow } from "enzyme";
import MigrationComponent, {
  MigrationComponentManager,
} from "Components/MigrationComponent";

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

  test("supports an array as migrationKey", () => {
    const fooComponent = <MigrationComponent migrationKey={["foo", "baz"]} />;
    const barComponent = <MigrationComponent migrationKey="bar" />;
    const component = shallow(
      <MigrationComponentManager activeKeys={["baz"]}>
        {fooComponent}
        {barComponent}
      </MigrationComponentManager>
    );

    expect(component.contains(fooComponent)).toBe(true);
    expect(component.contains(barComponent)).toBe(false);
  });

  test("array migration key with one element", () => {
    const fooComponent = <MigrationComponent migrationKey={["foo"]} />;
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
