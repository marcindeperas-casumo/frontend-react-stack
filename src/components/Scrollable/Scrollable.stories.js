// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs/react";
import { Scrollable } from "Components/Scrollable";

const stories = storiesOf("Scrollable", module);
const height = 240;

stories.add("Default", () => {
  const columnCount = number("Number of cells", 20);

  const cellRenderer = ({ columnIndex, style }) => {
    return (
      <div style={style}>
        <div
          style={{ height: "100%", width: 200 }}
          className={columnIndex !== columnCount - 1 ? "u-padding-right" : null}
        >
          <div
            style={{ height: "100%" }}
            className="t-color-white t-background-red-30 o-flex-justify--center o-flex-align--center"
          >
            {columnIndex}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height }}>
      <Scrollable
        columnCount={columnCount}
        height={height}
        cellRenderer={cellRenderer}
      />
    </div>
  );
});

stories.add("Mixed width elements", () => {
  const columnCount = number("Number of cells", 20);

  const cellRendererAltWidths = ({ columnIndex, style }) => {
    const width = columnIndex % 3 === 0 ? 300 : 200;
    return (
      <div style={style}>
        <div
          style={{ height: "100%" }}
          className={columnIndex !== columnCount ? "u-padding-right" : null}
        >
          <div
            style={{ height: "100%", width: width }}
            className="t-color-white t-background-red-30 o-flex-justify--center o-flex-align--center"
          >
            {columnIndex}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: height }}>
      <Scrollable
        columnCount={columnCount}
        height={height}
        cellRenderer={cellRendererAltWidths}
      />
    </div>
  );
});
