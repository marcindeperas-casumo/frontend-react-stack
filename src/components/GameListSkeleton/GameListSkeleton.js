// @flow
import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";
import GameRowSkeleton from "Components/GameRowSkeleton";

type Props = {
  className?: string,
  title?: boolean,
  items?: number,
  titleXOffset?: string,
  titleYOffset?: string,
  gameRowHeight?: string,
};

export default class GameListSkeleton extends PureComponent<Props> {
  render() {
    const {
      className = "",
      title = true,
      items = 8,
      titleXOffset = "0",
      titleYOffset = "0",
      gameRowHeight = "75px",
    } = this.props;

    return (
      <div className={className}>
        {title && (
          <Skeleton width="320" height="60" className="u-display--block">
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
        {Array.from(Array(items).keys()).map(i => (
          <div
            key={`gamelist-skeleton-${i}`}
            className="u-margin-vert"
            style={{ height: gameRowHeight }}
          >
            <GameRowSkeleton />
          </div>
        ))}
      </div>
    );
  }
}
