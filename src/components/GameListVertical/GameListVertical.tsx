import List from "@casumo/cmp-list";
import React from "react";
import { GameListSkeleton } from "Components/GameListSkeleton";
import { GameRow, GameRowText } from "Components/GameRow";
import * as A from "Types/apollo";

type Props = {
  /** The list of game objects. */
  games: A.GameListVerticalQuery["gamesBySlugs"] | undefined;
  loading: boolean;
};

export const GameListVertical = ({ games, loading = false }: Props) => {
  if (loading) {
    return <GameListSkeleton className="o-list-wrapper" hasTitle={false} />;
  }

  if (!games) {
    return null;
  }

  return (
    <div className="o-list-wrapper">
      <List
        items={games}
        render={game => (
          <GameRow
            game={game}
            renderText={() => <GameRowText name={game.name} />}
          />
        )}
      />
    </div>
  );
};
