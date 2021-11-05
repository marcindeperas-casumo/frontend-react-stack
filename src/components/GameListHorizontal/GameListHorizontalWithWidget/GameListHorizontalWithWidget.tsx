import Scrollable from "@casumo/cmp-scrollable";
import * as React from "react";
import * as R from "ramda";
import * as A from "Types/apollo";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { GameRow, GameRowText } from "Components/GameRow";
import {
  topListWidgetWidth,
  topListWidgetHeight,
  topListWidgetHeightTwoRows,
  horizontalListsDevicePaddings,
} from "Src/constants";
import {
  topMarginClasses,
  xPaddingClasses,
} from "Components/GameListHorizontal/constants";
import type { SeeMoreProps } from "Components/ScrollableListPaginated";

export type Props = {
  games: Array<A.GameRow_GameFragment | A.Jackpots_GameFragment>;
  JackpotWidget: React.ComponentType;
  JackpotOnboardingWidget?: React.ComponentType;
  name: string | undefined;
  seeMore?: SeeMoreProps;
  gamesInColumn?: number;
};

export const GameListHorizontalWithWidget = ({
  name,
  seeMore,
  games,
  JackpotWidget,
  JackpotOnboardingWidget,
  gamesInColumn = 3,
}: Props) => {
  const columns = R.splitEvery(gamesInColumn, games);

  const mobileItemRenderer = (i: number) => {
    if (i === 0) {
      return <JackpotWidget />;
    }

    if (i === 1) {
      return <JackpotOnboardingWidget />;
    }

    return columns[i - 1].map(game => (
      <div
        key={game.id}
        className="u-padding-bottom"
        style={{ width: topListWidgetWidth }}
      >
        <GameRow
          game={game}
          className="bg-white t-border-r--md t-elevation--10"
          renderText={() => (
            <GameRowText name={game.name} description={game.gameStudio} />
          )}
        />
      </div>
    ));
  };

  const desktopItemRenderer = ({ style, columnIndex, key }) => {
    return (
      <div key={key} style={style}>
        {columnIndex === 0 && <JackpotWidget />}
        {columnIndex === 1 && <JackpotOnboardingWidget />}
        {columnIndex > 1 &&
          columns[columnIndex - 1].map(game => (
            <div
              key={game.id}
              className="u-padding-bottom u-padding-left"
              style={{ width: topListWidgetWidth }}
            >
              <GameRow
                game={game}
                className="bg-white t-border-r--md t-elevation--10"
                renderText={() => (
                  <GameRowText name={game.name} description={game.gameStudio} />
                )}
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className={`o-wrapper ${topMarginClasses} ${xPaddingClasses}`}>
      <MobileAndTablet>
        {name && (
          <ScrollableListTitleRow paddingLeft title={name} seeMore={seeMore} />
        )}
        <Scrollable
          numberOfItems={
            /* +1 because widget takes up one column, and is not inside columns array */
            columns.length + 1
          }
          itemRenderer={mobileItemRenderer}
          padding={horizontalListsDevicePaddings}
        />
      </MobileAndTablet>
      <Desktop>
        <ScrollableListPaginated
          title={name}
          itemCount={
            /* +1 because widget takes up one column, and is not inside columns array */
            columns.length + 1
          }
          itemRenderer={desktopItemRenderer}
          tileHeight={
            gamesInColumn < 3 ? topListWidgetHeightTwoRows : topListWidgetHeight
          }
          seeMore={seeMore}
        />
      </Desktop>
    </div>
  );
};
