// @flow
import * as React from "react";
import classNames from "classnames";
import Scrollable from "@casumo/cmp-scrollable";
import type { CellRendererParams } from "react-virtualized";
import Flex from "@casumo/cmp-flex";
import spacerSizesMap from "Components/VirtualGrid/spacerSizesMap";
import * as A from "Types/apollo";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { GameRow, GameRowText } from "Components/GameRow";
import { generateColumns } from "Utils";
import {
  horizontalListsDevicePaddings,
  topListWidgetWidth,
} from "Src/constants";
import { topMarginClasses } from "Components/GameListHorizontal/constants";

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
}) =>
  column.map<React.Node>(game => (
    <div
      key={game.id}
      className="u-margin-top"
      style={{ width: topListWidgetWidth }}
    >
      <GameRow
        game={game}
        className="t-background-white u-padding--md t-border-r--md t-elevation--10"
        renderText={() => (
          <GameRowText
            locale={locale}
            name={game.name}
            bets={game.lobby?.bets}
            jackpot={game.jackpot}
          />
        )}
      />
    </div>
  ));

export default class Jackpots extends React.PureComponent<Props> {
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
      isNotFirstElement && "u-margin-left"
    );
    return (
      <div style={style}>
        <Flex className={elementClassNames} direction="vertical">
          <JackpotsColumn
            key={jackpotColumn[0].slug}
            column={jackpotColumn}
            locale={this.props.locale}
          />
        </Flex>
      </div>
    );
  };

  render() {
    return (
      <div className={`o-wrapper ${topMarginClasses}`}>
        <MobileAndTablet>
          <div data-test="scrollable-jackpots">
            <ScrollableListTitle paddingLeft title={this.props.title} />
            <Scrollable
              keyGetter={this.keyGetter}
              itemRenderer={this.mobileJackpotColumnRenderer}
              numberOfItems={this.columns.length}
              itemClassName="c-jackpots-list-tile"
              padding={horizontalListsDevicePaddings}
            />
          </div>
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            itemCount={this.columns.length}
            title={this.props.title}
            itemRenderer={this.desktopJackpotColumnRenderer}
            tileHeight={GameRow.ROW_HEIGHT * 3 + spacerSizesMap.default * 2}
          />
        </Desktop>
      </div>
    );
  }
}
