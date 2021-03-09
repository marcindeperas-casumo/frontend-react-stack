import type { CellRendererParams } from "react-virtualized";
import * as React from "react";
import classNames from "classnames";
import ScrollableList from "Components/ScrollableList";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameTileExclusive } from "Components/GameTileExclusive";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
import * as A from "Types/apollo";
import { exclusiveTileHeight } from "Src/constants";
import { topMarginClasses } from "Components/GameListHorizontal/constants";
import "./GameListHorizontalExclusive.scss";

export type Props = {
  list: A.GameListExclusiveQuery["gamesList"];
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
    <div className={`o-wrapper ${topMarginClasses}`}>
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
          tileHeight={exclusiveTileHeight}
        />
      </Desktop>
    </div>
  );
};
