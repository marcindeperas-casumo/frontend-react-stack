// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs/react";
import Flex from "@casumo/cmp-flex";
import { ArrowRightIcon, ArrowLeftIcon } from "@casumo/cmp-icons";
import ScrollablePaginated from "Components/ScrollablePaginated";
import type { State, ClickHandlerType } from "Components/ScrollablePaginated";

const stories = storiesOf("ScrollablePaginated", module);

export const myButtonRenderer = (
  scrollableState: State,
  scrollableClickHandler: ClickHandlerType
) => {
  const showLeftButton = !scrollableState.isStartOfScroll;
  const showRightButton = !scrollableState.isEndOfScroll;

  return (
    <Flex justify="space-between">
      <Flex.Item>
        {showLeftButton && (
          <div
            onClick={e => scrollableClickHandler("left")}
            className="t-background-grey-dark-3 t-border-r--circle u-padding--md u-cursor-pointer"
          >
            <ArrowLeftIcon className="t-color-grey-light-3" />
          </div>
        )}
      </Flex.Item>
      <Flex.Item>
        {showRightButton && (
          <div
            onClick={e => scrollableClickHandler("right")}
            className="t-background-grey-dark-3 t-border-r--circle u-padding--md u-cursor-pointer"
          >
            <ArrowRightIcon className="t-color-grey-light-3" />
          </div>
        )}
      </Flex.Item>
    </Flex>
  );
};

stories.add("Default", () => {
  const numberOfCells = number("Number of cells", 20);
  const cellRenderer = ({ columnIndex, style }) => {
    const width = 200;

    return (
      <div style={style}>
        <div
          style={{ height: "100%" }}
          className={
            columnIndex <= numberOfCells - 1 ? "u-padding-right" : null
          }
        >
          <div
            style={{ height: "100%", width }}
            className="t-color-white t-background-red o-flex-justify--center o-flex-align--center"
          >
            {columnIndex}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ScrollablePaginated
      columnCount={numberOfCells}
      cellRenderer={cellRenderer}
      height={240}
      buttonRenderer={myButtonRenderer}
    />
  );
});

stories.add("Mixed width elements", () => {
  const numberOfCells = number("Number of cells", 20);

  const cellRendererAltWidths = ({ columnIndex, style }) => {
    const width = columnIndex % 3 === 0 ? 300 : 200;
    return (
      <div style={style}>
        <div
          style={{ height: "100%" }}
          className={columnIndex !== numberOfCells ? "u-padding-right" : null}
        >
          <div
            style={{ height: "100%", width: width }}
            className="t-color-white t-background-red o-flex-justify--center o-flex-align--center"
          >
            {columnIndex}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ScrollablePaginated
      columnCount={numberOfCells}
      cellRenderer={cellRendererAltWidths}
      height={240}
      buttonRenderer={myButtonRenderer}
    />
  );
});
