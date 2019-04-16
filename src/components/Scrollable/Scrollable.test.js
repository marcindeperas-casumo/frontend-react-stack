import React from "react";
import { mount } from "enzyme";
import Scrollable from "Components/Scrollable";

describe("Scrollable", () => {
  const renderItem = () => <div />;
  const height = 200;
  const columnCount = 20;

  test("should not set overscanColumnCount greater than ten", () => {
    const rendered = mount(
      <Scrollable
        columnCount={columnCount}
        height={height}
        cellRenderer={renderItem}
        overscanColumnCount={100}
      />
    );
    expect(rendered.find("Grid").prop("overscanColumnCount")).toBe(10);
  });
});
