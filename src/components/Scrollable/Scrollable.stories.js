// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import Scrollable from "Components/Scrollable";

const stories = storiesOf("Scrollable", module);
const numberOfCells = 20;

const cellRenderer = ({ columnIndex, style }) => {
  return (
    <div style={style}>
      <div
        style={{ height: "100%", width: 200 }}
        className={columnIndex !== numberOfCells - 1 ? "u-padding-right" : null}
      >
        <div
          style={{ height: "100%" }}
          className="t-color-white t-background-red o-flex-justify--center o-flex-align--center"
        >
          {columnIndex}
        </div>
      </div>
    </div>
  );
};

const cellRendererAltWidths = ({ columnIndex, style }) => {
  const width = columnIndex % 3 === 0 ? 300 : 200;
  return (
    <div style={style}>
      <div
        style={{ height: "100%" }}
        className={columnIndex !== numberOfCells ? "u-padding-right" : null}
      >
        <div
          style={{ height: "100%" }}
          className="t-color-white t-background-red"
        >
          <div
            style={{ height: "100%", width: width }}
            className="o-flex-justify--center o-flex-align--center"
          >
            {columnIndex}
          </div>
        </div>
      </div>
    </div>
  );
};

stories.add(
  "Default",
  () => (
    <div style={{ height: 275 }}>
      <Scrollable
        columnCount={numberOfCells}
        height={275}
        cellRenderer={cellRenderer}
      />
    </div>
  ),
  info({ text: "Default" })
);

stories.add(
  "Mixed width elements",
  () => (
    <div style={{ height: 204 }}>
      <Scrollable
        columnCount={numberOfCells}
        height={204}
        cellRenderer={cellRendererAltWidths}
      />
    </div>
  ),
  info({ text: "Default" })
);
