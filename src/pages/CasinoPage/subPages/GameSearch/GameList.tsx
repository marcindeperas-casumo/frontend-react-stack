import * as React from "react";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { GameRowSkeleton } from "Components/GameRowSkeleton";

type TProps<T = A.GameRow_GameFragment> = {
  games: Array<T>;
  renderItem?: (game: T) => React.ReactNode;
};

export const GameList: React.FC<TProps> = ({ games, renderItem }) => {
  const isRowLoaded = (index: number) => Boolean(games[index]);

  return (
    <>
      {games.map((game, index) => {
        if (!isRowLoaded(index)) {
          return (
            <Flex
              className="t-border-bottom text-grey-0 border-current"
              key={index}
              index={index}
            >
              <GameRowSkeleton />
            </Flex>
          );
        }
        return (
          <Flex
            className="t-border-bottom text-grey-0 hover:bg-grey-0 border-current c-game-list-row"
            key={game.id}
            index={index}
            align="center"
          >
            {renderItem && renderItem(game)}
          </Flex>
        );
      })}
    </>
  );
};
