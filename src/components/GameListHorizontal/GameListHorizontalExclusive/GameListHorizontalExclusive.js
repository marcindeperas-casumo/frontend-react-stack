// @flow
import React from "react";
import classNames from "classnames";
import type { CellRendererParams } from "react-virtualized";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import ScrollableList from "Components/ScrollableList";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameTileExclusive } from "Components/GameTileExclusive";
import { MobileAndTablet, Desktop } from "Components/ResponsiveLayout";
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

const SPACER_CLASSES = createModifierClasses("u-margin-left", "default");

const itemRenderer = ({ columnIndex, style, games }: CellRendererParams) => {
  const game = games[columnIndex];
  const isNotFirstElement = columnIndex > 0;
  const elementClassNames = classNames(
    "u-height--full",
    isNotFirstElement && SPACER_CLASSES
  );

  return (
    <div style={style}>
      <div className={`${elementClassNames} c-exclusive-game`}>
        <GameTileExclusive item={game} />
      </div>
    </div>
  );
};

export const GameListHorizontalExclusive = ({ list }: Props) => {
  const { title, games } = list;

  return (
    <div className="u-margin-x--3xlg@desktop">
      <div className="o-wrapper">
        <MobileAndTablet>
          <ScrollableList
            itemClassName="c-exclusive-game"
            itemRenderer={i => <GameTileExclusive item={games[i]} />}
            items={games}
            title={title}
          />
        </MobileAndTablet>
        <Desktop>
          <ScrollableListPaginated
            listTitle={title}
            list={games}
            itemRenderer={props =>
              itemRenderer({
                ...props,
                games,
              })
            }
            itemControlClass="c-scrollable-list-paginated__button"
            tileHeight={300}
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
