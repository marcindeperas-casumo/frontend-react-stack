import * as React from "react";
import * as R from "ramda";
import * as A from "Types/apollo";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameRow, GameRowText } from "Components/GameRow";
import {
  topListWidgetWidth,
  topListWidgetHeight,
  topListWidgetHeightTwoRows,
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

  const itemRenderer = ({ style, columnIndex, key }) => {
    return (
      <div key={key} style={style}>
        {columnIndex === 1 && JackpotOnboardingWidget && (
          <JackpotOnboardingWidget />
        )}
        {columnIndex === 0 ? (
          <JackpotWidget />
        ) : (
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
          ))
        )}
      </div>
    );
  };
  return (
    <div className={`o-wrapper ${topMarginClasses} ${xPaddingClasses}`}>
      <ScrollableListPaginated
        title={name}
        itemCount={
          /* +1 because widget takes up one column, and is not inside columns array */
          columns.length + 1
        }
        itemRenderer={itemRenderer}
        tileHeight={
          gamesInColumn < 3 ? topListWidgetHeightTwoRows : topListWidgetHeight
        }
        seeMore={seeMore}
      />
    </div>
  );
};
