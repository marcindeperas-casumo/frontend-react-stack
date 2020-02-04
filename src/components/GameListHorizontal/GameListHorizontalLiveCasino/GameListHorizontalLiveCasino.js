// @flow
import React from "react";
import classNames from "classnames";
import type { CellRendererParams } from "react-virtualized";
import ScrollableList from "Components/ScrollableList";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { LiveCasinoCard } from "Components/LiveCasinoCard";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import "../GameListHorizontal.scss";

export type Props = {
  list: A.GameListLiveCasinoQuery_gamesList,
  seeMoreText: string,
};

export const GameListHorizontalLiveCasino = ({ list, seeMoreText }: Props) => {
  const { name, games } = list;

  const itemRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const game = games[columnIndex];
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames("u-height--full c-live-casino-card", {
      "u-margin-left": isNotFirstElement,
    });

    return (
      <div style={style}>
        <div className={elementClassNames}>
          <div className="u-margin-bottom--sm">
            <LiveCasinoCard item={game} />
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
            itemRenderer={i => <LiveCasinoCard item={games[i]} />}
            items={games}
            seeMoreText={seeMoreText}
            seeMoreUrl="/games/live-casino-details"
            title={name}
          />
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            listTitle={name}
            list={games}
            itemRenderer={itemRenderer}
            itemControlClass="c-scrollable-list-paginated__live_casino-button"
            tileHeight={305}
            // seeMore={{
            //   text: seeMoreText,
            //   url: seeMoreUrl,
            // }}
          />
        </Desktop>
      </div>
    </div>
  );
};
