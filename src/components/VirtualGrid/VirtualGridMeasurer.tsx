// @flow
import * as React from "react";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";
import spacerSizesMap from "./spacerSizesMap";

type Props = {
  spacerSize: spacerSizes,
  tileWidth: number,
  tileHeight: number,
  children: ({
    // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'number'.
    columnWidth: number,
    // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'number'.
    rowHeight: number,
    // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'number'.
    width: number, // TO BE REMOVED?
    // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'number'.
    cardMargin: number,
    // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'number'.
    columnCount: number,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
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
