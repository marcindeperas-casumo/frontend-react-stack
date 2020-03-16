// @flow
import React from "react";
import List from "@casumo/cmp-list";
import * as A from "Types/apollo";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import { EVENT_PROPS, EVENT_LOCATIONS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import { launchGame } from "Services/LaunchGameService";
import SectionTitle from "./SectionTitle";

export type GroupedLiveCasinoGame = {
  title: string,
  games: Array<A.GameRow_Game>,
};
export type GroupedLiveCasinoGames = Array<GroupedLiveCasinoGame>;

type Props = {
  groupedLiveCasinoGames: GroupedLiveCasinoGames,
};

export const LiveCasinoDetailPage = ({ groupedLiveCasinoGames }: Props) => {
  return (
    <div className="u-padding-x--md u-padding-bottom--md">
      <TrackProvider
        data={{ [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.LIVE_CASINO_DETAILS }}
      >
        {groupedLiveCasinoGames.map(({ title, games }) => (
          <React.Fragment key={title}>
            <SectionTitle title={title} />
            <List
              items={games}
              render={game => (
                <GameRow
                  game={game}
                  onLaunchGame={() => launchGame({ slug: game.slug })}
                  renderText={() => (
                    <GameRowText name={game.name} bets={game.lobby?.bets} />
                  )}
                />
              )}
            />
          </React.Fragment>
        ))}
      </TrackProvider>
    </div>
  );
};
