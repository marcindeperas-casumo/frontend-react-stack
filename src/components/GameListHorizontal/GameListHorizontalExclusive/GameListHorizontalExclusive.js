// @flow
import React from "react";
import classNames from "classnames";
import type { CellRendererParams } from "react-virtualized";
import ScrollableList from "Components/ScrollableList";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameTileExclusive } from "Components/GameTileExclusive";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import "./GameListHorizontalExclusive.scss";

export type Props = {
  list: A.GameListExclusiveQuery_gamesList,
};

export const GameListHorizontalExclusive = ({ list }: Props) => {
  const { name, games } = list;

  const itemRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames("u-height--full c-exclusive-game", {
      "u-margin-left": isNotFirstElement,
    });
    return (
      <div style={style}>
        <div className={elementClassNames}>
          <GameTileExclusive game={games[columnIndex]} />
        </div>
      </div>
    );
  };

  return (
    <div className="u-margin-x--3xlg@desktop">
      <div className="o-wrapper">
        <MobileAndTablet>
          <ScrollableList
            itemClassName="c-exclusive-game"
            itemRenderer={i => <GameTileExclusive game={games[i]} />}
            items={games}
            title={name}
          />
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            title={name}
            itemCount={games.length}
            itemRenderer={itemRenderer}
            tileHeight={300}
          />
        </Desktop>
      </div>
    </div>
  );
};
