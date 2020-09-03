// @flow
import React from "react";
import List from "@casumo/cmp-list";
import * as A from "Types/apollo";
import { GameRow, GameRowText } from "Components/GameRow";

type Props = {
  jackpots: Array<A.MustDropJackpotGamesListQuery_gamesList_games>,
};

export const MustDropJackpotList = ({ jackpots }: Props) => (
  <div className="u-padding-x--md u-padding-bottom--md o-list-wrapper">
    <List
      items={jackpots}
      render={jackpot => (
        <GameRow
          game={jackpot}
          renderText={() => <GameRowText name={jackpot.name} />}
        />
      )}
    />
  </div>
);
