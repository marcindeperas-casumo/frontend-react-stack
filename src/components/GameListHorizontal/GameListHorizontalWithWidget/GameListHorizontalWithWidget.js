// @flow
import * as React from "react";
import * as R from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import * as A from "Types/apollo";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { GameRow, GameRowText } from "Components/GameRow";
import { topListWidgetWidth, topListWidgetHeight } from "Src/constants";
import type { SeeMoreProps } from "Components/ScrollableListPaginated";
export type Props = {
  games: Array<A.GameRow_Game>,
  Widget: React.AbstractComponent<{}>,
  name: ?string,
  seeMore?: SeeMoreProps,
};

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "none",
};

export const GameListHorizontalWithWidget = ({
  name,
  seeMore,
  games,
  Widget,
}: Props) => {
  const columns = R.splitEvery(3, games);

  const mobileItemRenderer = (i: number) => {
    if (i === 0) {
      return <Widget key={i} />;
    }

    return columns[i - 1].map(game => (
      <div
        key={game.id}
        className="u-padding-bottom"
        style={{ width: topListWidgetWidth }}
      >
        <GameRow
          game={game}
          className="t-background-white u-padding--md t-border-r--md t-elevation--10"
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
        {columnIndex === 0 ? (
          <Widget />
        ) : (
          columns[columnIndex - 1].map(game => (
            <div
              key={game.id}
              className="u-padding-bottom u-padding-left"
              style={{ width: topListWidgetWidth }}
            >
              <GameRow
                game={game}
                className="t-background-white u-padding--md t-border-r--md t-elevation--10"
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
    <div className="u-margin-x--3xlg@desktop">
      <div className="o-wrapper">
        <MobileAndTablet>
          <div className="u-padding-top--xlg">
            {name && (
              <ScrollableListTitleRow
                paddingLeft
                title={name}
                seeMore={seeMore}
              />
            )}
            <Scrollable
              padding={PADDING_PER_DEVICE}
              numberOfItems={columns.length}
              itemRenderer={mobileItemRenderer}
            />
          </div>
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            title={name}
            itemCount={columns.length}
            itemRenderer={desktopItemRenderer}
            tileHeight={topListWidgetHeight}
            seeMore={seeMore}
          />
        </Desktop>
      </div>
    </div>
  );
};
