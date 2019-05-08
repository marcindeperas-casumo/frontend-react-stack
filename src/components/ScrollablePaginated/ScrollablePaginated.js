// @flow
import * as React from "react";
import { clamp, isEmpty } from "ramda";
import type {
  CellRenderer,
  GridRef,
  Scroll,
} from "Types/ReactVirtualized/Grid";
import { ScrollableWithRef } from "Components/Scrollable";
import type { overscanColumnCountType } from "Components/Scrollable";
const easeInQuad = (t: number) => t * t;

export type State = {
  startColumn: number,
  stopColumn: number,
  visibleColumns: number,
  scrollLeft: number | null,
  isEndOfScroll: boolean,
  isStartOfScroll: boolean,
};

export type ClickHandlerType = (direction: "left" | "right") => void;

type Props = {
  /** The height of the horizontal scrolling container in pixels. */
  height: number,
  /** The total number of columns that can be rendered. */
  columnCount: number,
  /** An easing function to use for animated pagination */
  easing: number => number,
  /** The duration of animated pagination */
  duration: number,
  /** The renderProp responsible for rendering each "cell" */
  cellRenderer: CellRenderer,
  /** The renderProp responsible for rendering the controls to paginate through the columns */
  buttonRenderer: (State, ClickHandlerType) => React.Node,
  /** Custom classname for styling the wrapping div elements. */
  className: string,
  /** Number of items to render before/after the visible slice of the grid.
  Note this is limited to 10 for performance reasons: https://github.com/bvaughn/react-virtualized/blob/master/docs/overscanUsage.md
   */
  overscanColumnCount?: overscanColumnCountType,
};

export default class ScrollablePaginated extends React.PureComponent<
  Props,
  State
> {
  static defaultProps = {
    easing: easeInQuad,
    duration: 300,
    className: "c-scrollable-paginated",
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

  get gridRefCurrent() {
    return this.gridRef.current || {};
  }

  get isEndOfScroll() {
    const scrollingContainer = this.gridRefCurrent._scrollingContainer;
    return (
      Math.ceil(scrollingContainer.offsetWidth) +
        Math.ceil(scrollingContainer.scrollLeft) ===
      scrollingContainer.scrollWidth
    );
  }

  get isStartOfScroll() {
    const scrollingContainer = this.gridRefCurrent._scrollingContainer;
    return Math.ceil(scrollingContainer.scrollLeft) === 0;
  }

  scrollHandler = ({ scrollLeft }: Scroll) => {
    this.currentScrollOffset = scrollLeft;
    if (!isEmpty(this.gridRefCurrent)) {
      this.setState({
        startColumn: this.gridRefCurrent._renderedColumnStartIndex,
        stopColumn: this.gridRefCurrent._renderedColumnStopIndex,
        isEndOfScroll: this.isEndOfScroll,
        isStartOfScroll: this.isStartOfScroll,
      });
    }
  };

  clickHandler: ClickHandlerType = direction => {
    if (this.isScrolling) {
      // prevent multiple clicks if the container is already scrolling.
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
    this.scrollToOffset = this.gridRefCurrent.getOffsetForCell({
      alignment: "start",
      columnIndex: nextColumn,
      rowIndex: 0,
    }).scrollLeft;
    this.isScrolling = true;
    this.animate();
  };

  animate() {
    requestAnimationFrame(time => {
      if (!this.animationStartTime) {
        this.animationStartTime = time;
      }
      const { easing, duration } = this.props;
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
          startColumn: this.gridRefCurrent._renderedColumnStartIndex,
          stopColumn: this.gridRefCurrent._renderedColumnStopIndex,
        });
      }
    });
  }

  buttonRenderer() {
    return this.props.buttonRenderer(this.state, this.clickHandler);
  }

  // Keep state in sync with column count for buttonRenderer
  componentDidUpdate(nextProps: Props) {
    if (nextProps.columnCount !== this.props.columnCount) {
      this.setState({
        isEndOfScroll: this.isEndOfScroll,
        isStartOfScroll: this.isStartOfScroll,
      });
    }
  }

  componentDidMount() {
    // Not convinced by this but pushing to the next tick
    // gives the gridRef values time to update.
    setTimeout(() => {
      this.setState({
        startColumn: this.gridRefCurrent._renderedColumnStartIndex,
        stopColumn: this.gridRefCurrent._renderedColumnStopIndex,
        visibleColumns: this.gridRefCurrent._renderedColumnStopIndex,
      });
    }, 0);
  }

  render() {
    const { className, height, columnCount, cellRenderer } = this.props;
    return (
      <div className={className}>
        <div style={{ height }} className={`${className}__list`}>
          <ScrollableWithRef
            ref={this.gridRef}
            columnCount={columnCount}
            cellRenderer={cellRenderer}
            height={height}
            scrollLeft={this.state.scrollLeft}
            scrollHandler={this.scrollHandler}
            overscanColumnCount={this.props.overscanColumnCount}
          />
        </div>
        {this.buttonRenderer()}
      </div>
    );
  }
}
