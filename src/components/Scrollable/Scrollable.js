// @flow
import * as React from "react";
import classNames from "classnames";
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
  cellRenderer: CellRenderer,
  className: string,
  columnCount: number,
  height: string | number,
  scrollHandler: Scroll => void,
  innerRef?: *,
  scrollLeft?: ?number,
  overscanColumnCount: number,
  defaultWidth: number,
};

export default class Scrollable extends React.PureComponent<Props> {
  static defaultProps = {
    className: "",
    scrollHandler: (x: any) => {},
    overscanColumnCount: 10,
    defaultWidth: 100,
  };

  cellSizeCache = new CellMeasurerCache({
    defaultWidth: this.props.defaultWidth,
    fixedHeight: true,
  });

  // TODO(mm): Grid's cellRenderer instead of any
  cellRenderer = ({
    columnIndex,
    isScrolling,
    isVisible,
    key,
    parent,
    rowIndex,
    style,
  }: any) => {
    const gridRef = this.props.innerRef;
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
          gridRef,
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
    } = this.props;

    return (
      <AutoSizer>
        {({ width }) => (
          <Grid
            className={this.componentClasses}
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
            overscanColumnCount={overscanColumnCount}
          />
        )}
      </AutoSizer>
    );
  }
}

export const ScrollableWithRef = React.forwardRef<
  $Diff<Props, typeof Scrollable.defaultProps>, // that's to make flow understand which props are optional because they have default value
  GridRef
>((props, ref) => <Scrollable innerRef={ref} {...props} />);
