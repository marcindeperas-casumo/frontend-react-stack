// @flow
import React, { PureComponent } from "react";
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
  className?: string,
  columnCount: number,
  height: string | number,
  innerRef?: any,
  scrollHandler?: () => void,
  scrollLeft?: number,
};

export default class Scrollable extends PureComponent<Props> {
  static defaultProps = {
    className: "",
    innerRef: null,
    scrollHander: () => {},
    scrollLeft: null,
  };

  cellSizeCache = new CellMeasurerCache({
    defaultWidth: 170,
    fixedHeight: true,
    minWidth: 170,
  });

  cellRenderer = ({ columnIndex, key, parent, rowIndex, style }) => {
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

export const ScrollableWithRef = React.forwardRef<Props, Scrollable>(
  (props, ref) => <Scrollable innerRef={ref} {...props} />
);
