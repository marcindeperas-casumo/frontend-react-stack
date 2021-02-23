// @flow
import React from "react";
import List from "@casumo/cmp-list";
import { GameListSkeleton } from "Components/GameListSkeleton";
import { GameRow, GameRowText } from "Components/GameRow";
import * as A from "Types/apollo";

type Props = {
  /** The list of game objects. */
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
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
