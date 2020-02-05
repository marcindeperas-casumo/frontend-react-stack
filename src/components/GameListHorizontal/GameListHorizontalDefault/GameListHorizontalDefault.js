// @flow
import React from "react";
import classNames from "classnames";
import type { CellRendererParams } from "react-virtualized";
import ScrollableList from "Components/ScrollableList";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameTile } from "Components/GameTile";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import "../GameListHorizontal.scss";

export type GameListObject = {
  id: string,
  name: string,
  games: Array<A.gameListQuery_gamesList_games>,
};

export type Props = {
  list: GameListObject,
};

export const GameListHorizontalDefault = ({ list }: Props) => {
  const { name, games } = list;

  const itemRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames("u-height--full c-top-game", {
      "u-margin-left": isNotFirstElement,
    });

    return (
      <div style={style}>
        <div className={elementClassNames}>
          <GameTile game={games[columnIndex]} />
        </div>
      </div>
    );
  };

  return (
    <div className="u-margin-x--3xlg@desktop">
      <div className="o-wrapper">
        <MobileAndTablet>
          <ScrollableList
            itemClassName="c-top-game"
            itemRenderer={i => <GameTile game={games[i]} />}
            items={games}
            title={name}
          />
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            listTitle={name}
            list={games}
            itemRenderer={itemRenderer}
            tileHeight={192}
          />
        </Desktop>
      </div>
    </div>
  );
};
