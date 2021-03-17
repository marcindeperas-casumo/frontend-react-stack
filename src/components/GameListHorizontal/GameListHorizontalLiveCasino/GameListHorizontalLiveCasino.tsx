import type { CellRendererParams } from "react-virtualized";
import React from "react";
import classNames from "classnames";
import ScrollableList from "Components/ScrollableList";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { LiveCasinoCardContainer as LiveCasinoCard } from "Components/LiveCasinoCard/LiveCasinoCardContainer";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import { topMarginClasses } from "Components/GameListHorizontal/constants";
import * as A from "Types/apollo";
import "./GameListHorizontalLiveCasino.scss";

export type Props = {
  list: A.GameListLiveCasinoQuery["gamesList"];
  seeMoreText: string;
};

export const GameListHorizontalLiveCasino = ({ list, seeMoreText }: Props) => {
  const { name } = list;
  const games = list.games;
  const seeMoreUrl = "../live-casino";

  const itemRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames("u-height--full c-live-casino-card", {
      "u-margin-left": isNotFirstElement,
    });

    return (
      <div style={style}>
        <div className={elementClassNames}>
          <div className="u-margin-bottom--sm">
            <LiveCasinoCard game={games[columnIndex]} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`o-wrapper ${topMarginClasses}`}>
      <MobileAndTablet>
        <ScrollableList
          itemClassName="c-live-casino-card u-margin-bottom--sm"
          itemRenderer={i => <LiveCasinoCard game={games[i]} />}
          items={games}
          seeMoreText={seeMoreText}
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
            text: seeMoreText,
            url: seeMoreUrl,
          }}
        />
      </Desktop>
    </div>
  );
};
