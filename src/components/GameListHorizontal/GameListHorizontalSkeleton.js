/* @flow */
import * as React from "react";
import { times } from "ramda";
import Skeleton from "@casumo/cmp-skeleton";

const defaultClassNames = `
  u-padding-top--lg
  u-padding-top--xlg@tablet
  u-padding-top--xlg@desktop
  u-padding-left--md
  u-padding-left--3xlg@tablet
`;

type Props = {
  itemWidth: number,
  items: number,
  itemRatio: number,
  itemGap: number,
  cornerRadius: number,
  display: string,
  title: boolean,
  className: string,
};

export class GameListHorizontalSkeleton extends React.Component<Props> {
  static defaultProps = {
    itemWidth: 170,
    items: 7,
    itemRatio: 120 / 100,
    itemGap: 8,
    cornerRadius: 8,
    display: "tiles",
    title: true,
    className: defaultClassNames,
  };

  get itemsPos(): Array<number> {
    return times(
      i =>
        i === 0
          ? i * this.props.itemWidth
          : i * (this.props.itemWidth + this.props.itemGap),
      this.props.items
    );
  }

  get itemHeight() {
    return this.props.itemWidth * this.props.itemRatio;
  }

  get shouldDisplayCards() {
    return this.props.display === "cards";
  }

  get titleHeight() {
    return this.props.title ? this.itemHeight + 40 : this.itemHeight;
  }

  get renderTiles() {
    return this.itemsPos.map<React.Node>((pos, i) => (
      <rect
        key={i}
        x={pos}
        y={this.props.title ? 40 : 0}
        rx={this.props.cornerRadius}
        ry={this.props.cornerRadius}
        width={this.props.itemWidth}
        height={this.itemHeight}
      />
    ));
  }

  get renderCards() {
    const { title, itemWidth } = this.props;

    return this.itemsPos.map<React.Node>((pos, i) => (
      <React.Fragment key={i}>
        <rect
          x={pos}
          y={title ? this.itemHeight - (this.itemHeight - 30) : 0}
          rx={this.props.cornerRadius}
          ry={this.props.cornerRadius}
          width={itemWidth}
          height={this.itemHeight - 135}
        />
        <rect
          x={pos}
          y={this.itemHeight - 120}
          rx={this.props.cornerRadius}
          ry={this.props.cornerRadius}
          width={(45 / 100) * itemWidth}
          height="18"
        />
        <rect
          x={pos}
          y={this.itemHeight - 95}
          rx={this.props.cornerRadius}
          ry={this.props.cornerRadius}
          width={itemWidth / 4}
          height="14"
        />
        <rect
          x={pos + itemWidth - (40 / 100) * itemWidth}
          y={this.itemHeight - 120}
          rx="25"
          ry="25"
          width={(40 / 100) * itemWidth}
          height="50"
        />
        <rect
          x={pos}
          y={this.itemHeight - 30}
          rx="0"
          ry="0"
          width={itemWidth}
          height="1"
        />
        <rect
          x={pos}
          y={this.itemHeight - 20}
          rx="8"
          ry="8"
          width="28"
          height="16"
        />
      </React.Fragment>
    ));
  }

  render() {
    const skeletonWidth = this.props.itemWidth * this.props.items;
    const skeletonHeight = this.shouldDisplayCards
      ? this.itemHeight
      : this.titleHeight;

    return (
      <Skeleton
        width={skeletonWidth}
        height={skeletonHeight}
        preserveAspectRatio="xMinYMin"
        colorLow="#eff6f6"
        colorHi="#ffffff"
        className={this.props.className}
      >
        {this.props.title && (
          <rect x="0" y="0" rx="3" ry="3" width="80" height="18" />
        )}
        {this.shouldDisplayCards ? this.renderCards : this.renderTiles}
      </Skeleton>
    );
  }
}
