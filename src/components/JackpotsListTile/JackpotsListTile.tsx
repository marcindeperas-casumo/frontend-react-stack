import * as React from "react";
import * as A from "Types/apollo";
import { GameRow, GameRowText } from "Components/GameRow";

import "./JackpotsListTile.scss";

type Props = {
  games?: Array<A.GameRow_GameFragment>;
};
// __FIX__ this should be the source of truth for the MustDrop and
// standard jackpot tiles.
export const JackpotsListTile = ({ games = [] }: Props) =>
  games.map<React.ReactNode>(game => (
    <div key={game.id} className="u-padding-bottom">
      <GameRow
        game={game}
        className="bg-white t-border-r--md t-elevation--10"
        renderText={() => (
          <GameRowText name={game.name} description={game.gameStudio} />
        )}
      />
    </div>
  ));
