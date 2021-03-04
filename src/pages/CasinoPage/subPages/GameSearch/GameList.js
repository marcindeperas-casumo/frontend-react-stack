// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { GameRowSkeleton } from "Components/GameRowSkeleton";

type TProps = {
  games: Array<any>,
  renderItem: (game: A.GameRow_Game) => React.Node,
};

export const GameList = ({ games, renderItem }: TProps) => {
  const isRowLoaded = (index: number) => Boolean(games[index]);

  return (
    <>
      {games.map((game, index) => {
        if (!isRowLoaded(index)) {
          return (
            <Flex
              className="t-border-bottom t-color-grey-0 t-border-current"
              key={index}
              index={index}
            >
              <GameRowSkeleton />
            </Flex>
          );
        }
        return (
          <Flex
            className="t-border-bottom t-color-grey-0 t-background-grey-0:hover t-border-current c-game-list-row"
            key={game.id}
            index={index}
            align="center"
          >
            {renderItem(game)}
          </Flex>
        );
      })}
    </>
  );
};
