import type { CellRendererParams } from "react-virtualized";
import React from "react";
import classNames from "classnames";
import ScrollableList from "Components/ScrollableList";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameTileContainer as GameTile } from "Components/GameTile/GameTileContainer";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import "./GameListHorizontalDefault.scss";
import { topMarginClasses } from "Components/GameListHorizontal/constants";

export type Props = {
  list: A.GameListQuery["gamesList"];
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
    <div className={`o-wrapper ${topMarginClasses}`}>
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
          title={name}
          itemCount={games.length}
          itemRenderer={itemRenderer}
          tileHeight={192}
        />
      </Desktop>
    </div>
  );
};
