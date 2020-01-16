// @flow
import React from "react";
import { GameRow } from "Components/GameRow/GameRow";
import { launchGame } from "Services/LaunchGameService";
import type { Game } from "Src/types/game";

import "./JackpotsListTile.scss";

type Props = {
  games?: Array<Game>,
};

export const JackpotsListTile = ({ games = [] }: Props) => (
  <>
    {games.map(game => {
      return (
        <div key={game.id} className="u-padding-y--sm">
          <GameRow
            game={game}
            className="t-background-white t-border-r--md t-box-shadow"
            onLaunchGame={() => launchGame({ slug: game.slug })}
          />
        </div>
      );
    })}
  </>
);
