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
import { topListWidgetWidth } from "Src/constants";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export type Props = {
  jackpots: Array<A.Jackpots_GameFragment>;
  className?: string;
  locale?: string;
  title: string;
};

const JackpotsColumn = ({
  column,
  locale,
}: {
  column: Array<A.Jackpots_GameFragment>;
  locale: string | undefined;
}) => {
  const columns = column.map(game => (
    <div
      key={game.id}
      className="u-margin-top"
      style={{ width: topListWidgetWidth }}
    >
      <GameRow
        game={game}
        className="t-background-white t-border-r--md t-elevation--10"
        renderText={() => (
          <GameRowText
            locale={locale}
            name={game.name}
            description={game.gameStudio}
            bets={game.lobby?.bets}
            jackpot={game.jackpot}
          />
        )}
      />
    </div>
  ));

  return <>{columns}</>;
};

export const Jackpots = (props: Props) => {
  const getColumns = generateColumns(props.jackpots);

  const mobileJackpotColumnRenderer = (i: number) => {
    return <JackpotsColumn column={getColumns[i]} locale={props.locale} />;
  };

  const desktopJackpotColumnRenderer = ({
    columnIndex,
    style,
    games,
  }: CellRendererParams) => {
    const jackpotColumn = getColumns[columnIndex];
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
            locale={props.locale}
          />
        </Flex>
      </div>
    );
  };

  const keyGetter = (i: number) => getColumns[i][0].slug;

  return (
    <div className="u-margin-x--3xlg@desktop">
      <div className="o-wrapper">
        <MobileAndTablet>
          <div className="u-padding-top--xlg" data-test="scrollable-jackpots">
            <ScrollableListTitle paddingLeft title={props.title} />
            <Scrollable
              keyGetter={keyGetter}
              itemRenderer={mobileJackpotColumnRenderer}
              numberOfItems={getColumns.length}
              itemClassName="c-jackpots-list-tile"
              padding={PADDING_PER_DEVICE}
            />
          </div>
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            itemCount={getColumns.length}
            title={props.title}
            itemRenderer={desktopJackpotColumnRenderer}
            tileHeight={GameRow.ROW_HEIGHT * 3 + spacerSizesMap.default * 2}
          />
        </Desktop>
      </div>
    </div>
  );
};
