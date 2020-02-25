// @flow
import React from "react";
import List from "@casumo/cmp-list";
import { GameRow } from "Components/GameRow/GameRow";

type Props = {
  /** The list of game objects. */
  games: Array<any>,
};

export const GameListVertical = ({ games }: Props) => {
  return (
    <div className="o-list-wrapper">
      <List
        itemSpacing="none"
        items={games}
        render={game => <GameRow game={game} />}
      />
    </div>
  );
};
