// @flow
import React from "react";
import classNames from "classnames";
import type { CellRendererParams } from "react-virtualized";
import ScrollableList from "Components/ScrollableList";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
// __FIX__ Fix this import as well.
import { LiveCasinoCardContainer as LiveCasinoCard } from "Components/LiveCasinoCard/LiveCasinoCardContainer";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import "./GameListHorizontalLiveCasino.scss";

export type Props = {
  list: A.GameListLiveCasinoQuery_gamesList,
  seeMoreText: string,
  playNowText: string,
};

export const GameListHorizontalLiveCasino = ({
  list,
  seeMoreText,
  playNowText,
}: Props) => {
  const { name, games } = list;
  const seeMoreUrl = "/games/live-casino-details";

  const itemRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames("u-height--full c-live-casino-card", {
      "u-margin-left": isNotFirstElement,
    });

    return (
      <div style={style}>
        <div className={elementClassNames}>
          <div className="u-margin-bottom--sm">
            <LiveCasinoCard
              game={games[columnIndex]}
              playNowText={playNowText}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="u-margin-x--3xlg@desktop">
      <div className="o-wrapper">
        <MobileAndTablet>
          <ScrollableList
            itemClassName="c-live-casino-card u-margin-bottom--sm"
            itemRenderer={i => (
              <LiveCasinoCard game={games[i]} playNowText={playNowText || ""} />
            )}
            items={games}
            seeMoreText={seeMoreText || ""}
            seeMoreUrl={seeMoreUrl}
            title={name}
          />
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            title={name}
            itemCount={games.length}
            itemRenderer={itemRenderer}
            itemControlClass="c-scrollable-list-paginated__live_casino-button"
            tileHeight={305}
            seeMore={{
              text: seeMoreText || "",
              url: seeMoreUrl,
            }}
          />
        </Desktop>
      </div>
    </div>
  );
};
