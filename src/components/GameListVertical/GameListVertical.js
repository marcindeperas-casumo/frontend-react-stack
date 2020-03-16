// @flow
import React from "react";
import List from "@casumo/cmp-list";
import { launchGame } from "Services/LaunchGameService";
import { GameListSkeleton } from "Components/GameListSkeleton";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import * as A from "Types/apollo";

type Props = {
  /** The list of game objects. */
  games: ?Array<A.GameListVerticalQuery_gamesBySlugs>,
  loading: boolean,
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
        itemSpacing="none"
        items={games}
        render={game => (
          <GameRow
            game={game}
            renderText={() => <GameRowText name={game.name} />}
            onLaunchGame={() => launchGame({ slug: game.slug })}
          />
        )}
      />
    </div>
  );
};
