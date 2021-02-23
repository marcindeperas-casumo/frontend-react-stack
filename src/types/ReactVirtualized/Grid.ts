// @flow
// These are taken from https://github.com/bvaughn/react-virtualized/blob/master/source/Grid/types.js
// This is horrible but the types in the dist are a wee bit broken. :(
import * as React from "react";

export type CellRendererParams = {
  columnIndex: number,
  isScrolling: boolean,
  isVisible: boolean,
  key: string,
  parent: Object,
  rowIndex: number,
  style: Object,
};

export type CellRenderer = (props: CellRendererParams) => React.Element<*>;

export type CellCache = { [key: string]: React.Element<*> };

export type Scroll = {
  clientHeight: number,
  clientWidth: number,
  scrollHeight: number,
  scrollLeft: number,
  scrollTop: number,
  scrollWidth: number,
};

export type GridRef = {
  // TODO(mm): should be just `Grid`, but types are broken in react-virtualized
  _renderedColumnStartIndex: number,
  _renderedColumnStopIndex: number,
  _scrollingContainer: HTMLDivElement,
  _renderedColumnStopIndex: number,
  getOffsetForCell: Function,
};
