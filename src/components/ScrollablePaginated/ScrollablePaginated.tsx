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
  scrollLeft: number | null,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
};

export type ClickHandlerType = (direction: "previous" | "next") => void;

type OwnProps = {
    /** The height of the horizontal scrolling container in pixels. */
    height: number;
    /** The total number of columns that can be rendered. */
    columnCount: number;
    /** An easing function to use for animated pagination */
    easing: number;
    number;
    /** The duration of animated pagination */
    duration: number;
    /** The renderProp responsible for rendering each "cell" */
    cellRenderer: CellRenderer;
    /** The renderProp responsible for rendering the controls to paginate through the columns */
    // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'boolean'.
    buttonRenderer: (boolean, boolean, ClickHandlerType) => React.Node;
    /** Custom classname for styling the wrapping div elements. */
    className: string;
    /** Number of items to render before/after the visible slice of the grid.
        Note this is limited to 10 for performance reasons: https://github.com/bvaughn/react-virtualized/blob/master/docs/overscanUsage.md **/
    overscanColumnCount?: overscanColumnCountType;
    /** A way to force the column widths to recalculate by changing the string passed here */
    cacheBuster?: string;
    /** The number of items that will be shown on both the current page and next/previous pages */
    overlappingItemCount: number;
    defaultWidth: number;
};

type Props = OwnProps & typeof ScrollablePaginated.defaultProps;

export default class ScrollablePaginated extends React.PureComponent<
  Props,
  State
> {
  static defaultProps = {
    easing: easeInQuad,
    duration: 300,
    className: "c-scrollable-paginated",
    overlappingItemCount: 2,
    defaultWidth: 40,
  };

  gridRef = React.createRef<GridRef>();
  scrollToOffset = 0;
  animationStartTime = 0;
  currentScrollOffset = 0;
  isScrolling = false;
  startColumn = 0;
  stopColumn = 0;
  visibleColumns = 0;
  state = {
    scrollLeft: null,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  get gridRefCurrent() {
    return this.gridRef.current || {};
  }

  get isEndOfScroll() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_scrollingContainer' does not exist on t... Remove this comment to see the full error message
    const scrollingContainer = this.gridRefCurrent._scrollingContainer;

    return (
      scrollingContainer &&
      Math.ceil(scrollingContainer.offsetWidth) +
        Math.ceil(scrollingContainer.scrollLeft) ===
        scrollingContainer.scrollWidth
    );
  }

  get isStartOfScroll() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_scrollingContainer' does not exist on t... Remove this comment to see the full error message
    const scrollingContainer = this.gridRefCurrent._scrollingContainer;
    return scrollingContainer && Math.ceil(scrollingContainer.scrollLeft) === 0;
  }

  scrollHandler = ({ scrollLeft }: Scroll) => {
    this.currentScrollOffset = scrollLeft;

    if (!isEmpty(this.gridRefCurrent)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_renderedColumnStartIndex' does not exis... Remove this comment to see the full error message
      this.startColumn = this.gridRefCurrent._renderedColumnStartIndex;
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_renderedColumnStopIndex' does not exist... Remove this comment to see the full error message
      this.stopColumn = this.gridRefCurrent._renderedColumnStopIndex;

      this.setState({
        hasNextPage: !this.isEndOfScroll,
        hasPreviousPage: !this.isStartOfScroll,
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
      direction === "next"
        ? this.startColumn +
            (this.visibleColumns - this.props.overlappingItemCount)
        : this.startColumn -
            (this.visibleColumns - this.props.overlappingItemCount)
    );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getOffsetForCell' does not exist on type... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_renderedColumnStartIndex' does not exis... Remove this comment to see the full error message
        this.startColumn = this.gridRefCurrent._renderedColumnStartIndex;
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_renderedColumnStopIndex' does not exist... Remove this comment to see the full error message
        this.stopColumn = this.gridRefCurrent._renderedColumnStopIndex;
        this.setState({
          scrollLeft: null,
        });
      }
    });
  }

  buttonRenderer = () =>
    this.props.buttonRenderer(
      this.state.hasNextPage,
      this.state.hasPreviousPage,
      this.clickHandler
    );

  // Not convinced by this but pushing to the next tick
  // gives the gridRef values time to update.
  forcePageCheck = () =>
    setTimeout(() => {
      this.setState({
        hasNextPage: !this.isEndOfScroll,
        hasPreviousPage: !this.isStartOfScroll,
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_renderedColumnStartIndex' does not exis... Remove this comment to see the full error message
      this.startColumn = this.gridRefCurrent._renderedColumnStartIndex;
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_renderedColumnStopIndex' does not exist... Remove this comment to see the full error message
      this.stopColumn = this.gridRefCurrent._renderedColumnStopIndex;
      // @ts-expect-error ts-migrate(2339) FIXME: Property '_renderedColumnStopIndex' does not exist... Remove this comment to see the full error message
      this.visibleColumns = this.gridRefCurrent._renderedColumnStopIndex;
    }, 0);

  // Keep state in sync with column count for buttonRenderer
  componentDidUpdate(nextProps: Props) {
    if (nextProps.columnCount !== this.props.columnCount) {
      this.forcePageCheck();
    }
  }

  componentDidMount() {
    this.forcePageCheck();
  }

  render() {
    const { className, height } = this.props;

    return (
      <div className={className}>
        <div style={{ height }} className={`${className}__list`}>
          <ScrollableWithRef
            ref={this.gridRef}
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ ref: RefObject<GridRef>; columnCount: numb... Remove this comment to see the full error message
            columnCount={this.props.columnCount}
            cellRenderer={this.props.cellRenderer}
            height={height}
            scrollLeft={this.state.scrollLeft}
            scrollHandler={this.scrollHandler}
            overscanColumnCount={this.props.overscanColumnCount}
            cacheBuster={this.props.cacheBuster}
            defaultWidth={this.props.defaultWidth}
          />
        </div>
        {this.buttonRenderer()}
      </div>
    );
  }
}
