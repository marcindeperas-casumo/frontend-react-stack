// @flow
import React, { PureComponent } from "react";
import { times, identity } from "ramda";
import Skeleton from "@casumo/cmp-skeleton";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import {
  ROW_HEIGHT,
  ROW_HEIGHT_BIG,
} from "Components/GamesVirtualList/GamesVirtualList";
type Props = {
  /* Additional css classes to add to the component **/
  className: string,
  /* Whether the list has a title or not **/
  hasTitle: boolean,
  /* The number of <GameRowSkeleton /> components to show **/
  numberOfItems: number,
  /* X axis title offset **/
  titleXOffset: number,
  /* Y axis title offset **/
  titleYOffset: number,
  /** use bigger version, ie. on search page */
  big?: boolean,
};

export class GameListSkeleton extends PureComponent<Props> {
  static defaultProps = {
    className: "",
    hasTitle: true,
    numberOfItems: 8,
    titleXOffset: 0,
    titleYOffset: 0,
    big: false,
  };

  render() {
    const {
      className,
      hasTitle,
      numberOfItems,
      titleXOffset,
      titleYOffset,
      big,
    } = this.props;

    return (
      <div className={className}>
        {hasTitle && (
          <Skeleton
            colorHi="#d3d8e1"
            colorLow="#e5eaed"
            width="320"
            height="60"
            className="u-display--block"
          >
            <rect
              x={titleXOffset}
              y={titleYOffset}
              rx="3"
              ry="3"
              width="150"
              height="20"
            />
          </Skeleton>
        )}
        {times(identity, numberOfItems).map(i => (
          <div
            key={`gamelist-skeleton-${i}`}
            className="t-border-bottom t-border-grey-0"
            style={{ height: big ? ROW_HEIGHT_BIG : ROW_HEIGHT }}
          >
            <GameRowSkeleton big={big} />
          </div>
        ))}
      </div>
    );
  }
}
