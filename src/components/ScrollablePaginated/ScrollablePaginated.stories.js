// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import ScrollablePaginated from "Components/ScrollablePaginated";

const stories = storiesOf("ScrollablePaginated", module);

const cellRenderer = ({ columnIndex, style }) => {
  return (
    <div style={style} onClick={action(`Clicked item ${columnIndex}`)}>
      <div
        style={{ height: 240, width: 200 }}
        className={columnIndex !== 0 ? "u-padding-left" : null}
      >
        <div
          style={{ height: "100%", width: "100%" }}
          className="o-flex-justify--center o-flex-align--center t-background-red t-color-white"
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
        className={columnIndex !== 0 ? "u-padding-left" : null}
      >
        <div
          style={{ height: "100%" }}
          className="t-color-white t-background-red"
        >
          <div
            style={{ height: "100%", width: width }}
            className="o-flex-justify--center o-flex-align--center"
          >
            {" "}
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
    <ScrollablePaginated
      columnCount={20}
      cellRenderer={cellRenderer}
      height={240}
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "Mixed width elements",
  () => (
    <div style={{ height: 204 }}>
      <ScrollablePaginated
        columnCount={20}
        height={204}
        cellRenderer={cellRendererAltWidths}
      />
    </div>
  ),
  info({ text: "Default" })
);
