// @flow
import * as React from "react";
import { min } from "ramda";
import {
  Grid,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import type {
  CellRenderer,
  Scroll,
  GridRef,
} from "Types/ReactVirtualized/Grid";
import "./Scrollable.scss";

type Props = {
  /** The renderProp responsible for rendering each "cell" */
  cellRenderer: CellRenderer,
  /** Custom classname for styling the Scrollable */
  className: string,
  /** The total number of columns that can be rendered. */
  columnCount: number,
  /** The height of the horizontal scrolling container in pixels. */
  height: string | number,
  /** A function to listen to the scroll event of the component */
  scrollHandler: Scroll => void,
  /** A ref for access to the Grid component API */
  innerRef?: *,
  /** Used to set the horizontal scroll position of the Grid */
  scrollLeft?: ?number,
  /** Number of items to render before/after the visible slice of the grid. */
  overscanColumnCount: number,
  /** A "default" width value to allow the Grid to guess the width of items as scrolling occurs */
  defaultWidth: number,
};

const MAX_OVERSCAN_COLUMN_COUNT = 10;
export default class Scrollable extends React.PureComponent<Props> {
  static defaultProps = {
    className: "c-scrollable",
    scrollHandler: (x: any) => {},
    overscanColumnCount: MAX_OVERSCAN_COLUMN_COUNT,
    defaultWidth: 100,
  };

  cellSizeCache = new CellMeasurerCache({
    defaultWidth: this.props.defaultWidth,
    fixedHeight: true,
  });

  cellRenderer = ({
    columnIndex,
    isScrolling,
    isVisible,
    key,
    parent,
    rowIndex,
    style,
  }: CellRenderer) => {
    return (
      <CellMeasurer
        key={key}
        columnIndex={columnIndex}
        cache={this.cellSizeCache}
        parent={parent}
        rowIndex={rowIndex}
      >
        {this.props.cellRenderer({
          columnIndex,
          isScrolling,
          isVisible,
          key,
          parent,
          rowIndex,
          style,
        })}
      </CellMeasurer>
    );
  };

  render() {
    const {
      columnCount,
      innerRef,
      height,
      scrollHandler,
      scrollLeft,
      overscanColumnCount,
      className,
    } = this.props;

    return (
      <AutoSizer disableHeight={true}>
        {({ width }) => (
          <Grid
            className={className}
            cellRenderer={this.cellRenderer}
            columnCount={columnCount}
            columnWidth={this.cellSizeCache.columnWidth}
            deferredMeasurementCache={this.cellSizeCache}
            height={height}
            ref={innerRef}
            rowCount={1}
            rowHeight={height}
            width={width}
            onScroll={scrollHandler}
            scrollLeft={scrollLeft}
            // overscanColumnCount can have an adverse affect on performance
            overscanColumnCount={min(
              overscanColumnCount,
              MAX_OVERSCAN_COLUMN_COUNT
            )}
          />
        )}
      </AutoSizer>
    );
  }
}

// This makes flow understand which props are optional because they have default value
export const ScrollableWithRef = React.forwardRef<
  $Diff<Props, typeof Scrollable.defaultProps>,
  GridRef
>((props, ref) => <Scrollable innerRef={ref} {...props} />);
