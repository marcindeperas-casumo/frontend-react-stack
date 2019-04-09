// @flow
import * as React from "react";
import { clamp } from "ramda";
import classNames from "classnames";
import type { CellRenderer } from "react-virtualized";
import Flex from "@casumo/cmp-flex";
import { ScrollableWithRef, type GridRef } from "Components/Scrollable";
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
  buttonRenderer: () => React.Node,
  buttonContainerClassName: string,
};

type State = {
  startColumn: number,
  stopColumn: number,
  visibleColumns: number,
  scrollLeft: number | null,
  isEndOfScroll: boolean,
  isStartOfScroll: boolean,
};

export default class ScrollablePaginated extends React.PureComponent<
  Props,
  State
> {
  static defaultProps = {
    easing: easeInQuad,
    duration: 300,
    buttonContainerClassName: "",
  };

  gridRef = React.createRef<GridRef>();
  scrollToOffset = 0;
  animationStartTime = 0;
  currentScrollOffset = 0;
  isScrolling = false;
  state = {
    startColumn: 0,
    stopColumn: 0,
    visibleColumns: 0,
    scrollLeft: null,
    isEndOfScroll: false,
    isStartOfScroll: true,
  };

  // TODO(mm): this function should have type of Grid's onScroll
  scrollHandler = ({ scrollLeft }: { scrollLeft: number }) => {
    this.currentScrollOffset = scrollLeft;
    // Does this need optimising or does setState already handle a lot of this?
    if (this.gridRef.current) {
      const scrollingContainer = this.gridRef.current._scrollingContainer;
      const isEndOfScroll =
        Math.ceil(scrollingContainer.offsetWidth) +
          Math.ceil(scrollingContainer.scrollLeft) ===
        scrollingContainer.scrollWidth;
      const isStartOfScroll = Math.ceil(scrollingContainer.scrollLeft) === 0;

      if (this.gridRef.current) {
        this.setState({
          startColumn: this.gridRef.current._renderedColumnStartIndex,
          stopColumn: this.gridRef.current._renderedColumnStopIndex,
          isEndOfScroll,
          isStartOfScroll,
        });
      }
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
    if (this.gridRef.current) {
      this.scrollToOffset = this.gridRef.current.getOffsetForCell({
        alignment: "start",
        columnIndex: nextColumn,
        rowIndex: 0,
      }).scrollLeft;
    }
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

        if (this.gridRef.current) {
          this.setState({
            scrollLeft: null,
            startColumn: this.gridRef.current._renderedColumnStartIndex,
            stopColumn: this.gridRef.current._renderedColumnStopIndex,
          });
        }
      }
    });
  };

  componentDidMount() {
    // I'm not convinced by this but pushing to the next tick
    // prevents things blowing up when current doesn't exist.
    setTimeout(() => {
      if (this.gridRef.current) {
        this.setState({
          startColumn: this.gridRef.current._renderedColumnStartIndex,
          stopColumn: this.gridRef.current._renderedColumnStopIndex,
          visibleColumns: this.gridRef.current._renderedColumnStopIndex,
        });
      }
    }, 0);
  }

  get buttonContainerClasses() {
    return classNames(
      "u-height--1/1 o-flex-justify--center o-flex-align--center",
      this.props.buttonContainerClassName
    );
  }

  render() {
    const showLeftBtn = !this.state.isStartOfScroll;
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
            overscanColumnCount={this.state.visibleColumns}
          />
        </div>
        <Flex
          justify="space-between"
          className="c-scrollable-paginated__controls u-pointer-events-none"
          gap="none"
        >
          <div className="o-flex u-transform--flip-x">
            {showLeftBtn && (
              <div className={this.buttonContainerClasses}>
                <div
                  className="u-pointer-events-initial"
                  onClick={e => this.clickHandler("left")}
                >
                  {this.props.buttonRenderer()}
                </div>
              </div>
            )}
          </div>
          <div className="o-flex">
            {showRightBtn && (
              <div className={this.buttonContainerClasses}>
                <div
                  className="u-pointer-events-initial"
                  onClick={e => this.clickHandler("right")}
                >
                  {this.props.buttonRenderer()}
                </div>
              </div>
            )}
          </div>
        </Flex>
      </div>
    );
  }
}
