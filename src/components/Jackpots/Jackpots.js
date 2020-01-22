// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import List from "@casumo/cmp-list";
import Scrollable from "@casumo/cmp-scrollable";
import type { CellRendererParams } from "react-virtualized";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { GameRow } from "Components/GameRow/GameRow";
import { generateColumns } from "Utils";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export type Props = {
  jackpots: Array<A.Jackpots_Game>,
  className?: string,
  locale?: string,
  title: string,
};

const JackpotsColumn = ({
  column,
  locale,
}: {
  column: Array<A.Jackpots_Game>,
  locale: ?string,
}) => {
  return (
    <List
      itemSpacing="sm"
      items={column}
      render={jackpot => (
        <GameRow
          game={jackpot}
          locale={locale}
          className="t-background-white t-border-r--md t-box-shadow"
          onLaunchGame={() => launchGame({ slug: jackpot.slug })}
        />
      )}
    />
  );
};

const SPACER_CLASSES = createModifierClasses("u-margin-left", "default");

export default class Jackpots extends PureComponent<Props> {
  static defaultProps = {
    jackpots: [],
    title: "",
  };

  get columns(): Array<Array<A.Jackpots_Game>> {
    return generateColumns(this.props.jackpots);
  }

  keyGetter = (i: number) => this.columns[i][0].slug;

  mobileJackpotColumnRenderer = (i: number) => {
    return (
      <JackpotsColumn column={this.columns[i]} locale={this.props.locale} />
    );
  };

  desktopJackpotColumnRenderer = ({
    columnIndex,
    style,
    games,
  }: CellRendererParams) => {
    const jackpotColumn = this.columns[columnIndex];
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames(
      "u-height--full",
      isNotFirstElement && SPACER_CLASSES
    );
    return (
      <div style={style}>
        <div className={`${elementClassNames} c-jackpots-list-tile`}>
          <JackpotsColumn
            key={jackpotColumn[0].slug}
            column={jackpotColumn}
            locale={this.props.locale}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <div className="u-padding-top--xlg" data-test="scrollable-jackpots">
              <ScrollableListTitle paddingLeft title={this.props.title} />
              <Scrollable
                keyGetter={this.keyGetter}
                itemRenderer={this.mobileJackpotColumnRenderer}
                numberOfItems={this.columns.length}
                itemClassName="c-jackpots-list-tile"
                padding={PADDING_PER_DEVICE}
              />
            </div>
          </MobileAndTablet>
          <Desktop>
            <ScrollableListPaginated
              list={this.columns}
              listTitle={this.props.title}
              itemRenderer={this.desktopJackpotColumnRenderer}
              tileHeight={315}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
