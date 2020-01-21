// @flow
import React from "react";
import ScrollableList from "Components/ScrollableList";
import { LiveCasinoCard } from "Components/LiveCasinoCard";
import { MobileAndTablet } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import "../GameListHorizontal.scss";

export type GameListObject = {
  id: string,
  title: string,
  games: Array<A.gameListQuery_gamesList_games>,
};

export type Props = {
  list: GameListObject,
  seeMoreText: string,
};

export const GameListHorizontalLiveCasino = ({ list, seeMoreText }: Props) => {
  const { title, games } = list;

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
            title={title}
          />
        </MobileAndTablet>
        {/* <Desktop>
            <ScrollableListPaginated
              list={{
                title,
                itemIds: games,
              }}
              itemRenderer={GameTile}
              className={className}
              itemControlClass={itemControlClass}
              tileHeight={tileHeight}
              seeMore={{
                text: seeMoreText,
                url: seeMoreUrl,
              }}
            />
          </Desktop> */}
      </div>
    </div>
  );
};
