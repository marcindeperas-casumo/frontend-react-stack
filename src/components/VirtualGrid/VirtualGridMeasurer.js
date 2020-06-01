// @flow
import * as React from "react";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";

export const spacerSizesMap = {
  none: 0,
  sm: 4,
  default: 8,
  md: 16,
  lg: 24,
  xlg: 32,
  "2xlg": 40,
  "3xlg": 48,
  "4xlg": 56,
  "5xlg": 64,
};

type Props = {
  spacerSize: spacerSizes,
  tileWidth: number,
  tileHeight: number,
  children: ({
    columnWidth: number,
    rowHeight: number,
    width: number, // TO BE REMOVED?
    cardMargin: number,
    columnCount: number,
  }) => React.Node,
};

export const VirtualGridMeasurer = ({
  spacerSize,
  tileWidth,
  tileHeight,
  ...props
}: Props) => {
  const cardMargin = spacerSizesMap[spacerSize];
  const columnWidth = tileWidth + 2 * cardMargin;
  const rowHeight = tileHeight + 2 * cardMargin;
  const [containerWidth, setContainerWidth] = React.useState(columnWidth * 6);
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setContainerWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const columnCount = Math.floor(containerWidth / columnWidth);
  const width = columnWidth * columnCount;

  return (
    <div
      ref={measuredRef}
      className="u-width--full"
      style={{ margin: -cardMargin }}
    >
      {props.children({
        columnWidth,
        rowHeight,
        width,
        cardMargin,
        columnCount,
      })}
    </div>
  );
};
