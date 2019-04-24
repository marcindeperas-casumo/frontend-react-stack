// @flow
import * as React from "react";
import { clamp } from "ramda";
import type {
  CellRenderer,
  GridRef,
  Scroll,
} from "Types/ReactVirtualized/Grid";
import { ScrollableWithRef } from "Components/Scrollable";

const easeInQuad = (t: number) => t * t;

export type State = {
  startColumn: number,
  stopColumn: number,
  visibleColumns: number,
  scrollLeft: number | null,
  isEndOfScroll: boolean,
  isStartOfScroll: boolean,
};

type ClickHanderType = (direction: string) => void;

type Props = {
  /** The height of the horizontal scrolling container in pixels. */
  height: number | string,
  /** The total number of columns that can be rendered. */
  columnCount: number,
  /** An easing function to use for animated pagination */
  easing: number => number,
  /** The duration of animated pagination */
  duration: number,
  /** The renderProp responsible for rendering each "cell" */
  cellRenderer: CellRenderer,
  /** The renderProp responsible for rendering the controls to paginate through the columns */
  buttonRenderer: (State, ClickHanderType) => React.Node,
  /** Custom classname for styling the wrapping div elements. */
  className: string,
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

  scrollHandler = ({ scrollLeft }: Scroll) => {
    this.currentScrollOffset = scrollLeft;
    if (this.gridRef.current) {
      const scrollingContainer = this.gridRef.current._scrollingContainer;
      const isEndOfScroll =
        Math.ceil(scrollingContainer.offsetWidth) +
          Math.ceil(scrollingContainer.scrollLeft) ===
        scrollingContainer.scrollWidth;
      const isStartOfScroll = Math.ceil(scrollingContainer.scrollLeft) === 0;

      this.setState({
        startColumn: this.gridRefCurrent._renderedColumnStartIndex,
        stopColumn: this.gridRefCurrent._renderedColumnStopIndex,
        isEndOfScroll,
        isStartOfScroll,
      });
    }
  };

  clickHandler: ClickHanderType = direction => {
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
    this.scrollToOffset = this.gridRefCurrent.getOffsetForCell({
      alignment: "start",
      columnIndex: nextColumn,
      rowIndex: 0,
    }).scrollLeft;
    this.isScrolling = true;
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
          startColumn: this.gridRefCurrent._renderedColumnStartIndex,
          stopColumn: this.gridRefCurrent._renderedColumnStopIndex,
        });
      }
    });
  };

  get gridRefCurrent() {
    return this.gridRef.current || {};
  }

  buttonRenderer = () =>
    this.props.buttonRenderer(this.state, this.clickHandler);

  // Keep state in sync with column count for buttonRenderer
  componentDidUpdate(nextProps: Props) {
    if (nextProps.columnCount !== this.props.columnCount) {
      if (this.gridRef.current) {
        const scrollingContainer = this.gridRef.current._scrollingContainer;
        const isEndOfScroll =
          Math.ceil(scrollingContainer.offsetWidth) +
            Math.ceil(scrollingContainer.scrollLeft) ===
          scrollingContainer.scrollWidth;
        const isStartOfScroll = Math.ceil(scrollingContainer.scrollLeft) === 0;
        this.setState({
          isEndOfScroll,
          isStartOfScroll,
        });
      }
    }
  }

  componentDidMount() {
    // I'm not convinced by this but pushing to the next tick
    // prevents things blowing up when current doesn't exist on mount.
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
      <div className={`${className}`}>
        <div style={{ height: height }} className={`${className}__list`}>
          <ScrollableWithRef
            ref={this.gridRef}
            columnCount={columnCount}
            cellRenderer={cellRenderer}
            height={height}
            scrollLeft={this.state.scrollLeft}
            scrollHandler={this.scrollHandler}
            overscanColumnCount={this.state.visibleColumns}
          />
        </div>
        {this.buttonRenderer()}
      </div>
    );
  }
}
