// @flow
import * as React from "react";
import classNames from "classnames";
import { equals } from "ramda";
import {
  Grid,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import type {
  CellRenderer,
  CellRendererParams,
  Scroll,
  GridRef,
} from "Types/ReactVirtualized/Grid";
import "./Scrollable.scss";

export type overscanColumnCountType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type Props = {
  /** The renderProp responsible for rendering each "cell" */
  cellRenderer: CellRenderer,
  /** Custom classname for styling the Scrollable */
  className: string,
  /** The total number of columns that can be rendered. */
  columnCount: number,
  /** The height of the horizontal scrolling container in pixels. */
  height: number,
  /** A function to listen to the scroll event of the component */
  scrollHandler: Scroll => void,
  /** A ref for access to the Grid component API */
  innerRef?: *,
  /** Used to set the horizontal scroll position of the Grid */
  scrollLeft?: ?number,
  /** Number of items to render before/after the visible slice of the grid.
  Note this is limited to 10 for performance reasons: https://github.com/bvaughn/react-virtualized/blob/master/docs/overscanUsage.md
   */
  overscanColumnCount: overscanColumnCountType,
  /** A "default" width value to allow the Grid to guess the width of items as scrolling occurs */
  defaultWidth: number,
  /** A way to force the column widths to recalculate by changing the string passed here */
  cacheBuster?: string,
};

export const DEFAULT_OVERSCAN_COLUMN_COUNT = 10;
export class Scrollable extends React.Component<Props> {
  static defaultProps = {
    className: "",
    scrollHandler: (x: any) => {},
    overscanColumnCount: DEFAULT_OVERSCAN_COLUMN_COUNT,
    defaultWidth: 40,
  };

  cellSizeCache = new CellMeasurerCache({
    defaultWidth: this.props.defaultWidth,
    fixedHeight: true,
  });

  shouldComponentUpdate(nextProps: Props) {
    if (this.props.cacheBuster !== nextProps.cacheBuster) {
      this.cellSizeCache.clearAll();
    }

    return !equals(this.props, nextProps);
  }

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
            className={classNames("c-scrollable", className)}
            cellRenderer={(x: CellRendererParams) => (
              <CellMeasurer
                key={x.key}
                columnIndex={x.columnIndex}
                cache={this.cellSizeCache}
                parent={x.parent}
                rowIndex={x.rowIndex}
              >
                {this.props.cellRenderer(x)}
              </CellMeasurer>
            )}
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
            overscanColumnCount={overscanColumnCount}
            cacheBuster={this.props.cacheBuster}
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
