import React from "react";
import { shallow } from "enzyme";
import MigrationComponent from "./MigrationComponent";

describe("MigrationComponent", () => {
  test("render its children", () => {
    const child = <div>foo</div>;
    const component = shallow(
      <MigrationComponent migrationKey="foo">{child}</MigrationComponent>
    );

    expect(component.contains(child)).toBe(true);
  });

  test("should have a migrationKey prop value", () => {
    expect(() => {
      shallow(
        <MigrationComponent migrationKey="">
          <div>foo</div>
        </MigrationComponent>
      );
    }).toThrowError("should have a migrationKey prop value");
  });

  test("should have only one child element", () => {
    expect(() => {
      shallow(
        <MigrationComponent migrationKey="foo">
          <div>foo</div>
          <div>foo</div>
        </MigrationComponent>
      );
    }).toThrow("should have only one child element");
  });
});
