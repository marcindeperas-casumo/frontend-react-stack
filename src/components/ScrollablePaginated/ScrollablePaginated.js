// @flow
import React, { PureComponent } from "react";
import { clamp } from "ramda";
import type { CellRenderer } from "react-virtualized";
import Flex from "@casumo/cmp-flex";
import { ScrollableWithRef } from "Components/Scrollable";
import "./ScrollablePaginated.scss";

const easeInQuad = (t: number) => {
  return t * t;
};

type Props = {
  height: number | string,
  columnCount: number,
  easing: number => number,
  duration: number,
  cellRenderer: CellRenderer,
};

type State = {
  startColumn: number,
  stopColumn: number,
  visibleColumns: number,
  scrollLeft: number | null,
  isEndOfScroll: boolean,
};

export default class ScrollablePaginated extends PureComponent<Props, State> {
  static defaultProps = {
    easing: easeInQuad,
    duration: 300,
  };

  gridRef = React.createRef<{
    // TODO(mm): should be just `Grid`, but types are fucked in react-virtualized
    _columnStartIndex: number,
    _columnStopIndex: number,
    _scrollingContainer: HTMLDivElement,
    _renderedColumnStopIndex: number,
    getOffsetForCell: Function,
  }>();
  scrollToOffset = 0;
  animationStartTime: ?number = 0;
  currentScrollOffset = 0;
  isScrolling = false;
  state = {
    startColumn: 0,
    stopColumn: 0,
    visibleColumns: 0,
    scrollLeft: null,
    isEndOfScroll: false,
  };

  scrollHandler = ({ scrollLeft }) => {
    this.currentScrollOffset = scrollLeft;
    // Does this need optimising or does setState already handle a lot of this?
    if (this.gridRef.current) {
      const scrollingContainer = this.gridRef.current._scrollingContainer;
      const isEndOfScroll =
        Math.ceil(scrollingContainer.offsetWidth) +
          Math.ceil(scrollingContainer.scrollLeft) ===
        scrollingContainer.scrollWidth;
      this.setState({
        startColumn: this.gridRef.current._columnStartIndex,
        stopColumn: this.gridRef.current._columnStopIndex,
        isEndOfScroll,
      });
    }
  };

  clickHandler = (direction: string) => {
    if (this.isScrolling) {
      // dunno how to handle this but we don't want this is fire
      // multiple times otherwise animation will go bananas
      return;
    }

    const { columnCount } = this.props;
    const nextColumn = clamp(
      0,
      columnCount,
      direction === "right"
        ? this.state.startColumn + this.state.visibleColumns
        : this.state.startColumn - this.state.visibleColumns
    );
    this.scrollToOffset = this.gridRef.current.getOffsetForCell({
      alignment: "start",
      columnIndex: nextColumn,
      rowIndex: 0,
    }).scrollLeft;
    this.animate();
  };

  animate = () => {
    requestAnimationFrame(time => {
      if (!this.animationStartTime) {
        this.animationStartTime = time;
      }
      const { easing = easeInQuad, duration = 300 } = this.props;
      const elapsedTime = time - this.animationStartTime;
      const scrollDelta = this.scrollToOffset - this.currentScrollOffset;
      const easedTime = easing(Math.min(1, elapsedTime / duration));
      const scrollLeft = this.currentScrollOffset + scrollDelta * easedTime;

      this.setState({
        scrollLeft,
      });

      if (elapsedTime < duration) {
        this.animate();
      } else {
        this.isScrolling = false;
        this.currentScrollOffset = this.scrollToOffset;
        this.animationStartTime = undefined;
        this.setState({
          scrollLeft: null,
          startColumn: this.gridRef.current._columnStartIndex,
          stopColumn: this.gridRef.current._columnStopIndex,
        });
      }
    });
  };

  componentDidMount() {
    // I'm not convinced by this but pushing to the next tick
    // prevents things blowing up when current doesn't exist.
    setTimeout(() => {
      this.setState({
        startColumn: this.gridRef.current._columnStartIndex,
        stopColumn: this.gridRef.current._columnStopIndex,
        visibleColumns: this.gridRef.current._renderedColumnStopIndex,
      });
    }, 0);
  }

  render() {
    const showLeftBtn = this.state.startColumn > 0;
    const showRightBtn = !this.state.isEndOfScroll;

    return (
      <div className="c-scrollable-paginated">
        <div
          style={{ height: this.props.height }}
          className="c-scrollable-paginated__list"
        >
          <ScrollableWithRef
            ref={this.gridRef}
            columnCount={this.props.columnCount}
            cellRenderer={this.props.cellRenderer}
            height={this.props.height}
            scrollLeft={this.state.scrollLeft}
            scrollHandler={this.scrollHandler}
          />
        </div>
        <Flex
          justify="space-between"
          className="c-scrollable-paginated__controls u-pointer-events-none"
          gap="none"
        >
          <Flex.Item className="o-flex o-flex-justify--center o-flex-align--center">
            {showLeftBtn && (
              <button
                className="u-pointer-events-initial"
                onClick={e => this.clickHandler("left")}
              >
                {"<-"}
              </button>
            )}
          </Flex.Item>
          <Flex.Item className="o-flex o-flex-justify--center o-flex-align--center">
            {showRightBtn && (
              <button
                className="u-pointer-events-initial"
                onClick={e => this.clickHandler("right")}
              >
                {"->"}
              </button>
            )}
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
