// @flow
import React, { PureComponent } from "react";
import ScrollableList from "Components/ScrollableList";
import { GameTileExclusive } from "Components/GameTileExclusive";
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
};

export class GameListHorizontalExclusive extends PureComponent<Props> {
  render() {
    const { list } = this.props;
    const { title, games } = list;

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <ScrollableList
              itemClassName="c-exclusive-game"
              itemRenderer={i => <GameTileExclusive item={games[i]} />}
              items={games}
              seeMoreText=""
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
  }
}
