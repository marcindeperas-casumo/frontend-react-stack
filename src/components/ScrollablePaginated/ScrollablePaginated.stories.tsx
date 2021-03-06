import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import Flex from "@casumo/cmp-flex";
import { ArrowRightIcon, ArrowLeftIcon } from "@casumo/cmp-icons";
import React from "react";
import ScrollablePaginated from "Components/ScrollablePaginated";
// @ts-expect-error ts-migrate(2614) FIXME: Module '"."' has no exported member 'ClickHandlerT... Remove this comment to see the full error message
import type { ClickHandlerType } from "Components/ScrollablePaginated";

const stories = storiesOf("ScrollablePaginated", module);

export const myButtonRenderer = (
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  scrollableClickHandler: ClickHandlerType
) => (
  <Flex justify="space-between">
    <Flex.Item>
      {hasPreviousPage && (
        <div
          onClick={e => scrollableClickHandler("previous")}
          className="bg-grey-90 t-border-r--circle u-padding--md u-cursor--pointer"
        >
          <ArrowLeftIcon className="text-grey-0" />
        </div>
      )}
    </Flex.Item>
    <Flex.Item>
      {hasNextPage && (
        <div
          onClick={e => scrollableClickHandler("next")}
          className="bg-grey-90 t-border-r--circle u-padding--md u-cursor--pointer"
        >
          <ArrowRightIcon className="text-grey-0" />
        </div>
      )}
    </Flex.Item>
  </Flex>
);

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
            className="text-white bg-red-30 o-flex-justify--center o-flex-align--center"
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
            className="text-white bg-red-30 o-flex-justify--center o-flex-align--center"
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
