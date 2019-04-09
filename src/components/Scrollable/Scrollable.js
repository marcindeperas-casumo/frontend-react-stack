// @flow
import * as React from "react";
import classNames from "classnames";
import {
  Grid,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import type { CellRenderer } from "react-virtualized";
import "./Scrollable.scss";

type Props = {
  cellRenderer: CellRenderer,
  className: string,
  columnCount: number,
  height: string | number,
  scrollHandler: ({
    clientHeight: number,
    clientWidth: number,
    scrollHeight: number,
    scrollLeft: number,
    scrollTop: number,
    scrollWidth: number,
  }) => void,
  innerRef?: *,
  scrollLeft?: ?number,
};

export default class Scrollable extends React.PureComponent<Props> {
  static defaultProps = {
    className: "",
    scrollHandler: (x: any) => {},
  };

  cellSizeCache = new CellMeasurerCache({
    defaultWidth: 170,
    fixedHeight: true,
    minWidth: 170,
  });

  // TODO(mm): Grid's cellRenderer instead of any
  cellRenderer = ({ columnIndex, key, parent, rowIndex, style }: any) => {
    return (
      <CellMeasurer
        key={key}
        columnIndex={columnIndex}
        cache={this.cellSizeCache}
        parent={parent}
        rowIndex={rowIndex}
      >
        {this.props.cellRenderer({ columnIndex, key, parent, rowIndex, style })}
      </CellMeasurer>
    );
  };

  get componentClasses() {
    return classNames("c-scrollable", this.props.className);
  }

  render() {
    const { columnCount, innerRef, height } = this.props;

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
            onScroll={this.props.scrollHandler}
            scrollLeft={this.props.scrollLeft}
          />
        )}
      </AutoSizer>
    );
  }
}

export type GridRef = {
  // TODO(mm): should be just `Grid`, but types are fucked in react-virtualized
  _columnStartIndex: number,
  _columnStopIndex: number,
  _scrollingContainer: HTMLDivElement,
  _renderedColumnStopIndex: number,
  getOffsetForCell: Function,
};

export const ScrollableWithRef = React.forwardRef<
  $Diff<Props, typeof Scrollable.defaultProps>, // that's to make flow understand which props are optional because they have default value
  GridRef
>((props, ref) => <Scrollable innerRef={ref} {...props} />);
