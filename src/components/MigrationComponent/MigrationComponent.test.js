import React from "react";
import { shallow } from "enzyme";
import MigrationComponent from "./MigrationComponent";

describe("MigrationComponent", () => {
  test("render it's children", () => {
    const child = <div>foo</div>;
    const component = shallow(
      <MigrationComponent migrationKey="foo">{child}</MigrationComponent>
    );

    expect(component.contains(child)).toBe(true);
  });

  test("may have a migrationKey prop", () => {
    expect(() => {
      shallow(
        <MigrationComponent>
          <div>foo</div>
        </MigrationComponent>
      );
    }).toThrowError("may have a migrationKey prop");
  });

  test("may have only one child element", () => {
    expect(() => {
      shallow(
        <MigrationComponent migrationKey="foo">
          <div>foo</div>
          <div>foo</div>
        </MigrationComponent>
      );
    }).toThrow("may have only one child element");
  });
});
